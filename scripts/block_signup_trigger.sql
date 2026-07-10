-- =========================================================================
-- ฟังก์ชันบล็อกการสมัครสมาชิกแบบสาธารณะ (หลังจากมีคนแรกที่เป็น Admin แล้ว)
-- =========================================================================
CREATE OR REPLACE FUNCTION public.block_public_signup()
RETURNS TRIGGER AS $$
BEGIN
  -- 1. เช็คว่ามีผู้ใช้งานในระบบอย่างน้อย 1 คนแล้วหรือไม่
  -- 2. เช็คสิทธิ์การยิงคำขอ: ถ้าไม่ได้ยิงผ่านสิทธิ์ระดับสูง (service_role) ให้บล็อก
  IF (SELECT COUNT(*) FROM public.profiles) > 0 AND auth.role() <> 'service_role' THEN
    RAISE EXCEPTION 'ระบบปิดการสมัครสมาชิกสาธารณะแล้ว กรุณาติดต่อผู้ดูแลระบบ (Admin) เพื่อสร้างบัญชีใหม่ให้ครับ';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- สร้าง Trigger ดักก่อนที่จะเกิดการสมัครในตาราง auth.users (BEFORE INSERT)
DROP TRIGGER IF EXISTS on_before_user_signup ON auth.users;
CREATE TRIGGER on_before_user_signup
  BEFORE INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.block_public_signup();
