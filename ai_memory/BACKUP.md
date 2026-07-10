# คู่มือการสำรองและกู้คืนข้อมูลระบบ (Database Backup & Restore Guide)

เอกสารนี้อธิบายวิธีกระบวนการสำรองข้อมูล (Backup) และกู้คืนข้อมูล (Restore) ของฐานข้อมูล PostgreSQL ในระบบ **LowcodeProject (Supabase Local Docker)** เพื่อความปลอดภัยและป้องกันข้อมูลสูญหาย

---

## 🗄️ 1. วิธีสำรองข้อมูลแบบทำเอง (Manual Backup)

พิมพ์คำสั่งเหล่านี้ผ่าน Terminal บนเครื่อง Server ที่รัน Docker อยู่:

### สั่งดัมพ์ข้อมูลทั้งหมด (โครงสร้างตาราง + ข้อมูลจริง + ล็อก)
```bash
# สำรองข้อมูลทุกฐานข้อมูลออกมาเป็นไฟล์ SQL
docker exec -t supabase_db pg_dumpall -U postgres > backup_full.sql
```

### สำรองเฉพาะข้อมูลไฟล์สแกนในระบบ Storage (กรณีต้องการย้ายไฟล์)
ตัวไฟล์สแกนที่บันทึกผ่านระบบ Supabase Storage จะถูกเก็บไว้ใน Docker Volume ที่เราตั้งชื่อไว้คือ `supabase_storage_data` คุณสามารถสั่งคัดลอกโฟลเดอร์นั้นเก็บไว้ได้โดยตรง

---

## ⏰ 2. การตั้งค่าระบบสำรองข้อมูลอัตโนมัติ (Automated Backup)

เราจัดทำสคริปต์สำเร็จรูปเพื่อให้ระบบตั้งเวลา (Cron Job) เข้ามารันทำงานเองทุกวัน

### สคริปต์สำหรับ Windows Server (`scripts/backup.ps1`)
```powershell
$BackupDir = "C:\backups\"
$Timestamp = Get-Date -Format "yyyy-MM-dd_HH-mm-ss"
$OutputFile = "$BackupDir\supabase_backup_$Timestamp.sql"

# สร้างโฟลเดอร์สำหรับเก็บไฟล์ Backup หากยังไม่มี
if (!(Test-Path $BackupDir)) {
    New-Item -ItemType Directory -Force -Path $BackupDir
}

# สั่ง Docker Dump ข้อมูล
docker exec -t supabase_db pg_dumpall -U postgres > $OutputFile

# (แนะนำเพิ่ม) ลบไฟล์แบคอัพที่เก่ากว่า 30 วันเพื่อประหยัดพื้นที่ดิสก์
Get-ChildItem $BackupDir -Filter "*.sql" | Where-Object { $_.LastWriteTime -lt (Get-Date).AddDays(-30) } | Remove-Item
```
*(คุณสามารถนำสคริปต์นี้ไปผูกกับ **Windows Task Scheduler** เพื่อตั้งให้รันทุกวันเวลา 00:00 น. ได้ทันทีครับ)*

---

## 🔄 3. วิธีการกู้คืนข้อมูล (Database Restore)

ในกรณีที่ระบบมีปัญหาและต้องการดึงข้อมูลแบคอัพกลับเข้ามาใช้งาน:

1. **เคลียร์คอนเทนเนอร์ตัวที่มีปัญหาออกก่อน** (หากต้องการล้างใหม่):
   ```bash
   docker compose down -v
   docker compose up -d
   ```
2. **สั่งรันนำไฟล์ Backup กู้ข้อมูลกลับเข้าเครื่อง**:
   ```bash
   # ส่งไฟล์ SQL กลับเข้าไปประมวลผลข้างในฐานข้อมูลตัวใหม่
   cat backup_full.sql | docker exec -i supabase_db psql -U postgres
   ```
