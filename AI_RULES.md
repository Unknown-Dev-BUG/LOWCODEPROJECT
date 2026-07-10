# AI Rules & Project Guidelines (`AI_RULES.md`)

ยินดีต้อนรับ AI Agent ทุกตัวที่เข้ามารับช่วงพัฒนาต่อในโปรเจกต์นี้ โปรดอ่านและปฏิบัติตามกฎและแนวทางการทำงานอย่างเคร่งครัด เพื่อรักษาความต่อเนื่องและความเสถียรของโค้ดเบส

---

## 🚀 1. Technology Stack & Architecture

โปรเจกต์นี้คือ **LowcodeProject** ซึ่งใช้โครงสร้างแบบ Monorepo (Refine):
* **Core Framework**: React + Refine
* **UI Integration**: [Ant Design (`@refinedev/antd`)](file:///packages/antd) (ใช้สำหรับการพัฒนาหน้าบ้าน คอนเทนเนอร์ และ CRUD components ทั้งหมด)
* **Routing**: [React Router v6 (`@refinedev/react-router`)](file:///packages/react-router)
* **Backend Database & Auth**: **Local Supabase (Docker)**
  * **API URL**: `http://localhost:54300` (หรือพอร์ตที่เครื่อง Local รันอยู่)
  * **Studio URL**: `http://localhost:54321` (เข้าสำหรับจัดการ Schema ตารางข้อมูล)
* **AI Engine**: **Gemini AI API** (Google Generative AI)
  * วัตถุประสงค์: ใช้สำหรับการอ่านและถอดความข้อมูลจากไฟล์เอกสาร (Document Data Extraction)

---

## ⚙️ 2. กฎทองสำหรับ AI Agent (AI GOLDEN RULES)

### 📌 กฎข้อที่ 1: การพัฒนาต้องทำในเครื่องแบบ Local
* ฐานข้อมูล Supabase จะต้องรันผ่าน Docker ในเครื่องเสมอ ห้ามต่อฐานข้อมูลทดสอบนอกเครือข่าย ยกเว้นการเรียกใช้งาน **Gemini API** ที่ต้องขอสิทธิ์ออกอินเทอร์เน็ตเฉพาะการส่งข้อมูลประมวลผลเท่านั้น

### 📌 กฎข้อที่ 2: ใช้คอมโพเนนต์สำเร็จรูปของ Refine + Ant Design เสมอ
* หลีกเลี่ยงการสร้าง UI หรือสไตล์ขึ้นมาใหม่ตั้งแต่ศูนย์ ให้ใช้คอมโพเนนต์จาก `@refinedev/antd` เป็นหลัก เช่น:
  * `<List>`, `<Create>`, `<Edit>`, `<Show>` สำหรับหน้าเพจ CRUD
  * `<Table>` ของ Ant Design ร่วมกับ `useTable` ของ Refine สำหรับแสดงตารางข้อมูล
  * `<Form>` ของ Ant Design ร่วมกับ `useForm` สำหรับกรอกข้อมูล

### 📌 กฎข้อที่ 3: ใช้ Inferencer ในการสร้างโค้ดเริ่มต้น
* เมื่อต้องการสร้างหน้าจอ CRUD ใหม่ ให้ใช้ระบบ **Auto Code Generation** จาก `@refinedev/inferencer` เสมอ เพื่อจำลองหน้าจอและดูรูปแบบก่อน จากนั้นจึงคัดลอกโค้ดมาปรับปรุงตามความต้องการของ User

### 📌 กฎข้อที่ 4: การจัดการโครงสร้างข้อมูลแบบปลอดภัย (Data Safety)
* ข้อมูลไฟล์และเอกสารของ User ให้เก็บไว้ที่ **Supabase Storage (Local)** เท่านั้น ห้ามส่งไฟล์ทั้งหมดไปเก็บข้างนอก
* ในการใช้งาน Gemini ให้ส่งเฉพาะเนื้อหาไฟล์หรือข้อมูลดิบผ่าน REST API เฉพาะจุดที่ต้องประมวลผลเท่านั้น

---

## 📂 3. การจัดเก็บข้อมูลของ AI Agent
* **การวางแผนงาน**: หากมีงานหรือฟังก์ชันใหญ่ที่ต้องการเขียนแผนงาน ให้สร้างแผนไว้ที่โฟลเดอร์ของระบบสนทนาหรือเขียนบันทึกในเอกสารนี้เพิ่มเติม
* **การบันทึกสถานะ**: อัปเดตสถานะของโครงสร้างฐานข้อมูล (Database Schema) ไว้ในไฟล์ `.md` ภายในโปรเจกต์หากมีการเปลี่ยนแปลง

---

## 🛠️ 4. วิธีการเริ่มระบบพัฒนา (Development Setup)

1. **รัน Supabase Local (Docker)**:
   ```bash
   supabase start
   ```
2. **ติดตั้ง Dependencies และรันโปรเจกต์ Refine**:
   ```bash
   pnpm install
   pnpm dev
   ```
