# AI Task List & Checklist

เอกสารนี้ใช้สำหรับติดตามงานและเป็น Checklist ในการพัฒนาโครงการ **LowcodeProject** เพื่อให้ AI Agent ตัวถัดไปทราบสถานะการดำเนินงาน

---

## 📋 สถานะภาพรวมโครงการ (Project Status)

- [x] **Phase 1: Project Setup & Identity Customize** (เสร็จสิ้น)
- [ ] **Phase 2: Database Schema & Local Supabase Setup** (กำลังดำเนินการ / รอดำเนินการ)
- [ ] **Phase 3: Gemini AI API Document Extraction Service** (รอดำเนินการ)
- [ ] **Phase 4: Frontend UI Development (Refine + Ant Design)** (รอดำเนินการ)

---

## 🔍 รายการงานละเอียด (Detailed Checklist)

### Phase 1: Project Setup & Identity Customize (เสร็จสิ้น)
* [x] เปลี่ยน Git Remote Link ไปที่ `https://github.com/Unknown-Dev-BUG/LOWCODEPROJECT.git`
* [x] แก้ไขผู้ถือลิขสิทธิ์ในไฟล์ `LICENSE` เป็น `Tichakorn Khunyai`
* [x] ออกแบบและเปลี่ยนภาพ `logo.png` เป็นโลโก้ของแบรนด์ `Unknown-Dev-BUG`
* [x] แก้ไขชื่อแพ็กเกจใน `package.json` เป็น `lowcode-project`
* [x] ลบโฟลเดอร์ที่ไม่จำเป็น (`examples`, `cypress`, `templates`, `hackathon`) เพื่อป้องกันปัญหาข้อมูลลับหลุด (GitHub Push Protection) และประหยัดเนื้อที่
* [x] ดึงโฟลเดอร์ `documentation` และ `templates` กลับมาแบบด่วนพิเศษเพื่อให้ใช้ศึกษาและเริ่มโปรเจกต์ได้
* [x] สร้างและอัปโหลดไฟล์กฎทอง `AI_RULES.md`
* [x] สร้างระบบบันทึกหน่วยความจำ AI ในโฟลเดอร์ `ai_memory/`

### Phase 2: Database Schema & Local Supabase Setup (รอดำเนินการ)
* [ ] ติดตั้งและเริ่มทำงาน Supabase CLI ในเครื่อง Local
* [ ] กำหนดตารางข้อมูลใน Supabase สำหรับบันทึกข้อมูลเอกสารที่อัปโหลด และข้อมูลที่ AI ถอดความได้
* [ ] ทดสอบการเชื่อมต่อ API ระหว่าง Refine และ Supabase Local

### Phase 3: Gemini AI API Document Extraction Service (รอดำเนินการ)
* [ ] สร้างโมดูลหรือฟังก์ชันในการเชื่อมต่อกับ Gemini API
* [ ] พัฒนาฟังก์ชันส่งเอกสาร (PDF/Image) ไปประมวลผลและอ่านข้อมูล
* [ ] เก็บข้อมูลผลลัพธ์การถอดความลงใน Supabase Database

### Phase 4: Frontend UI Development (รอดำเนินการ)
* [ ] สร้างหน้าจออัปโหลดเอกสาร (Upload Interface)
* [ ] สร้างหน้าตารางแสดงผลรายการเอกสารทั้งหมดและสถานะการถอดความ
* [ ] สร้างหน้าดูรายละเอียดข้อมูลที่ถอดความเสร็จแล้ว พร้อมปุ่มแก้ไขข้อมูล
