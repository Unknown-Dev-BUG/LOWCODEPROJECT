# AI Work History & Changelog

บันทึกประวัติการทำงานของ AI Agent ในโครงการ **LowcodeProject** เพื่อบอกเล่าการเปลี่ยนแปลงแต่ละขั้นตอนอย่างเป็นลำดับเหตุการณ์

---

## 📅 บันทึกประวัติ (Changelog)

### [2026-07-10] - Initial Setup & Cleaning (โดย AI Antigravity)
* **การตั้งค่า Git & Branching Strategy**:
  * ล้างประวัติ Commit เก่าของ Refine (ลบโฟลเดอร์ `.git` และ `git init` ใหม่) เพื่อประหยัดพื้นที่ในการจัดเก็บบน GitHub
  * เปลี่ยน Remote URL ไปชี้ที่ `https://github.com/Unknown-Dev-BUG/LOWCODEPROJECT.git` และพุชขึ้น `main` สำเร็จ
  * แตกกิ่งพัฒนาหลักย่อย **`develop`** ออกมาจาก `main` และพุชขึ้นรีโมตพร้อมตั้งเป็นกิ่งพัฒนาเริ่มต้นในเครื่องของผู้ใช้
  * บันทึกกติกา **"ห้าม Commit/Push เข้าสู่กิ่ง `main` ตรงๆ"** สำหรับ AI ลงใน `AI_RULES.md` เพื่อรักษาความปลอดภัยระบบ
* **การปรับแต่งแบรนด์โครงการ (Branding Update)**:
  * แก้ไขสิทธิ์ความเป็นเจ้าของในไฟล์ `LICENSE` เป็นของคุณ `Tichakorn Khunyai` (ปี 2026)
  * แก้ไขชื่อตัวโปรเจกต์ในไฟล์ `package.json` เป็น `"lowcode-project"`
  * วาดโลโก้ใหม่สำหรับแบรนด์ `Unknown-Dev-BUG` และเปลี่ยนไฟล์ `logo.png`
  * ออกแบบลายเซ็น ASCII Art คำว่า `Unknown-Dev-BUG` สไตล์ Cyberpunk และเขียนสคริปต์ [add-signature.js](file:///scripts/add-signature.js) ให้รองรับการนำไปรันแอดเข้าทุกหัวไฟล์โค้ดอัตโนมัติ
* **การเพิ่มมาตรฐานและปิดกั้นความเสี่ยงทางเทคนิค**:
  * อัปเดต `biome.json` เปลี่ยนกฎ `"noExplicitAny"` เป็น `"error"` เพื่อบล็อกการพิมพ์ชนิดตัวแปรเป็น `any`
  * จัดสร้างไฟล์ตรวจสอบคุณภาพโค้ดด่วนแบบอัตโนมัติเมื่อพุชงาน [.github/workflows/ci.yml](file:///.github/workflows/ci.yml)
  * ตั้งค่า `.env.example` เป็นแม่แบบการป้อนความลับ (Gemini API Key, Supabase URL) ป้องกันข้อมูลส่วนบุคคลรั่วไหล
  * ตั้งค่าบอท GitHub Dependabot สำหรับสแกนช่องโหว่ความปลอดภัยของไลบรารีรายสัปดาห์
  * แก้ไขบั๊กการแสดงผลคำเตือน TypeScript 7.0 (ข้ามการเตือน `moduleResolution` และ `baseUrl` ด้วยค่า `"5.0"`) ทั้งใน root `tsconfig.json` และ `tsconfig.build.json`
* **การออกแบบระบบฐานข้อมูล Docker & สำรองข้อมูล**:
  * รันติดตั้งชุดจำลองฐานข้อมูลในเครื่องด้วย `npx supabase init` เพื่อให้ได้ไฟล์ปรับแต่ง `supabase/config.toml`
  * สร้าง [docker/Dockerfile](file:///docker/Dockerfile) และ [docker/docker-compose.yml](file:///docker/docker-compose.yml) ในการรันคอนเทนเนอร์ร่วมกันทั้งฝั่งหน้าบ้าน Refine และระบบหลังบ้าน Supabase ย่อยแบบแมนนวล (OpenAPI Kong, Database, Storage, Auth, Studio)
  * จัดทำแผนผังฐานข้อมูลและสิทธิ์ปกป้องข้อมูลแยกตามแผนก (Row Level Security) ลงใน [DATABASE_SCHEMA.md](file:///ai_memory/DATABASE_SCHEMA.md)
  * เขียนสคริปต์อัตโนมัติสำหรับทำแบคอัพฐานข้อมูลเก็บไฟล์ SQL รายวัน [scripts/backup.ps1](file:///scripts/backup.ps1) และแนะแนวทางการกู้คืนไฟล์ลงใน [BACKUP.md](file:///ai_memory/BACKUP.md)
