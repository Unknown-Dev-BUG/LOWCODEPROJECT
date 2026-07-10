# AI Task List & Checklist

เอกสารนี้ใช้สำหรับติดตามงานและเป็น Checklist ในการพัฒนาโครงการ **LowcodeProject** เพื่อให้ AI Agent ตัวถัดไปทราบสถานะการดำเนินงาน

---

## 📋 สถานะภาพรวมโครงการ (Project Status)

- [x] **Phase 1: Project Setup & Identity Customize** (เสร็จสิ้น)
- [x] **Phase 2: Database Schema & Local Supabase Setup** (เสร็จสิ้นการตั้งค่าคอนฟิกและโครงสร้าง / รอดีพลอยเริ่มรัน)
- [ ] **Phase 3: Gemini AI API Document Extraction Service** (รอดำเนินการ)
- [ ] **Phase 4: Frontend UI Development (Refine + Ant Design)** (รอดำเนินการ)

---

## 🔍 รายการงานละเอียด (Detailed Checklist)

### Phase 1: Project Setup & Identity Customize (เสร็จสิ้น)

- [x] เปลี่ยน Git Remote Link ไปที่ `https://github.com/Unknown-Dev-BUG/LOWCODEPROJECT.git`
- [x] แก้ไขผู้ถือลิขสิทธิ์ในไฟล์ `LICENSE` เป็น `Tichakorn Khunyai`
- [x] ออกแบบและเปลี่ยนภาพ `logo.png` เป็นโลโก้ของแบรนด์ `Unknown-Dev-BUG`
- [x] แก้ไขชื่อแพ็กเกจใน `package.json` เป็น `lowcode-project`
- [x] ลบโฟลเดอร์ที่ไม่จำเป็น (`examples`, `cypress`, `templates`, `hackathon`) เพื่อป้องกันปัญหาข้อมูลลับหลุด (GitHub Push Protection) และประหยัดเนื้อที่
- [x] ดึงโฟลเดอร์ `documentation` และ `templates` กลับมาแบบด่วนพิเศษเพื่อให้ใช้ศึกษาและเริ่มโปรเจกต์ได้
- [x] สร้างและอัปโหลดไฟล์กฎทอง `AI_RULES.md` พร้อมกำหนดลายเซ็น ASCII Art สไตล์แฮกเกอร์
- [x] สร้างระบบบันทึกหน่วยความจำ AI ในโฟลเดอร์ `ai_memory/` (มีสารบัญแพ็กเกจ คู่มือเวอร์ชัน และแนวปฏิบัติ Git Branching)
- [x] ตั้งค่าความปลอดภัยลินเตอร์ห้ามเขียน `any` ลงใน `biome.json` และมี `ci.yml` ช่วยตรวจอัตโนมัติ

### Phase 2: Database Schema & Local Supabase Setup (เสร็จสิ้นการวางระบบโครงสร้าง)

- [x] ตรวจสอบและตั้งค่าปิดกั้นไฟล์ระบบและคีย์ความลับของ Supabase ลงใน `.gitignore`
- [x] เริ่มทำงานของ Supabase ในแบบ Docker ด้วยการรันคำสั่ง `npx supabase init`
- [x] ออกแบบและสร้างโครงสร้างฐานข้อมูล [DATABASE_SCHEMA.md](file:///ai_memory/DATABASE_SCHEMA.md) (Profiles, Documents, Audit Logs) พร้อมนโยบายสิทธิ์ความปลอดภัยแยกรายแผนก (RLS)
- [x] จัดเตรียมระบบแรปเปอร์ครอบคอนเทนเนอร์หน้าบ้านและหลังบ้านด้วย [docker-compose.yml](file:///docker/docker-compose.yml) และ Kong Gateway routing
- [x] เขียนสคริปต์สำรองข้อมูลอัตโนมัติ [backup.ps1](file:///scripts/backup.ps1) และคู่มือแบคอัพ [BACKUP.md](file:///ai_memory/BACKUP.md)
- [x] สั่งรันเริ่มคอนเทนเนอร์บน Docker Desktop และสร้างตารางจริงในเครื่องฐานข้อมูล

### Phase 3: Gemini AI API Document Extraction Service (รอดำเนินการ)

- [ ] สร้างโมดูลหรือฟังก์ชันในการเชื่อมต่อกับ Gemini API
- [ ] พัฒนาฟังก์ชันส่งเอกสาร (PDF/Image) ไปประมวลผลและอ่านข้อมูล
- [ ] เก็บข้อมูลผลลัพธ์การถอดความลงใน Supabase Database

### Phase 4: Frontend UI Development (รอดำเนินการ)

- [ ] สร้างหน้าจออัปโหลดเอกสาร (Upload Interface)
- [ ] สร้างหน้าตารางแสดงผลรายการเอกสารทั้งหมดและสถานะการถอดความ
- [ ] สร้างหน้าดูรายละเอียดข้อมูลที่ถอดความเสร็จแล้ว พร้อมปุ่มแก้ไขข้อมูล
