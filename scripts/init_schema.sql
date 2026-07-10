-- =========================================================================
-- LowcodeProject - Database Schema Migration
-- สร้างตาราง profiles, documents, audit_logs พร้อม RLS policies
-- รันบน Supabase PostgreSQL Local Docker
-- =========================================================================

-- 1. ตารางข้อมูลโปรไฟล์ผู้ใช้งาน (Profiles)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT NOT NULL,
    full_name TEXT,
    role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('admin', 'user')),
    department TEXT NOT NULL DEFAULT 'general',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- 2. ตารางเก็บเอกสารและการประมวลผลของ AI (Documents)
CREATE TABLE IF NOT EXISTS public.documents (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    file_name TEXT NOT NULL,
    file_path TEXT NOT NULL,
    department TEXT NOT NULL,
    extracted_data JSONB,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
    uploaded_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 3. ตารางเก็บประวัติความปลอดภัยและการเข้าถึงไฟล์ (Audit Logs)
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    action TEXT NOT NULL,
    department TEXT NOT NULL,
    document_id UUID REFERENCES public.documents(id) ON DELETE SET NULL,
    details JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- =========================================================================
-- เปิดใช้งานระบบ Row Level Security (RLS)
-- =========================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- =========================================================================
-- RLS Policies: Documents
-- =========================================================================
CREATE POLICY "Users can access documents from their department" ON public.documents
FOR ALL USING (
    (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
    OR department = (SELECT department FROM public.profiles WHERE id = auth.uid())
);

-- =========================================================================
-- RLS Policies: Audit Logs
-- =========================================================================
-- อนุญาตให้เพิ่มประวัติล็อกได้เท่านั้น ห้ามแก้/ห้ามลบ
CREATE POLICY "Anyone logged-in can insert logs" ON public.audit_logs
FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- เฉพาะแอดมินเท่านั้นที่จะมีสิทธิ์เข้ามาสืบค้นล็อกประวัติ
CREATE POLICY "Admins can view all audit logs" ON public.audit_logs
FOR SELECT USING (
    (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
);

-- =========================================================================
-- RLS Policies: Profiles
-- =========================================================================
-- ผู้ใช้มองเห็นได้เฉพาะโปรไฟล์ตัวเอง แอดมินเห็นทั้งหมด
CREATE POLICY "Users can view own profile" ON public.profiles
FOR SELECT USING (
    auth.uid() = id
    OR (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
);

-- ผู้ใช้อัปเดตได้เฉพาะโปรไฟล์ตัวเอง
CREATE POLICY "Users can update own profile" ON public.profiles
FOR UPDATE USING (auth.uid() = id);

-- =========================================================================
-- สำเร็จ! ✅
-- =========================================================================
