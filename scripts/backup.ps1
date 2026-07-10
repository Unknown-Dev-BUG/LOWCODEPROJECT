# =========================================================================
# 👤 AUTHOR        : Tichakorn Khunyai (Unknown-Dev-BUG)
# 🏢 PROJECT       : LowcodeProject
# 📄 FILE          : backup.ps1
# ✍️ DESCRIPTION    : สคริปต์อัตโนมัติสำหรับสำรองฐานข้อมูล Supabase PostgreSQL (Local Docker)
#                     รันผ่าน Windows PowerShell หรือผูกกับ Windows Task Scheduler
# =========================================================================

# --- 1. การกำหนดโฟลเดอร์ปลายทาง ---
$BackupDir = "C:\backups\"
$Timestamp = Get-Date -Format "yyyy-MM-dd_HH-mm-ss"
$OutputFile = "$BackupDir\supabase_backup_$Timestamp.sql"

# --- 2. สร้างโฟลเดอร์สำหรับเก็บไฟล์ Backup หากยังไม่มีในเครื่อง ---
if (!(Test-Path $BackupDir)) {
    New-Item -ItemType Directory -Force -Path $BackupDir | Out-Null
    Write-Host "สร้างโฟลเดอร์แบคอัพที่: $BackupDir" -ForegroundColor Green
}

# --- 3. รันคำสั่ง Docker Dump ข้อมูลออกมา ---
Write-Host "กำลังเริ่มสำรองข้อมูลจากคอนเทนเนอร์ supabase_db..." -ForegroundColor Cyan
try {
    # สั่งดึงข้อมูล SQL ทั้งหมดใน Docker
    docker exec -t supabase_db pg_dumpall -U postgres > $OutputFile
    
    if (Test-Path $OutputFile) {
        $FileSize = (Get-Item $OutputFile).Length / 1KB
        Write-Host "สำรองข้อมูลสำเร็จ! ไฟล์: $OutputFile (ขนาด: {0:N2} KB)" -f $FileSize -ForegroundColor Green
    } else {
        throw "ไม่พบไฟล์ผลลัพธ์การแบคอัพ"
    }
} catch {
    Write-Error "เกิดข้อผิดพลาดในการแบคอัพข้อมูล: $_"
}

# --- 4. การจัดการหมุนเวียนไฟล์ (ลบไฟล์เก่าที่เกิน 30 วันเพื่อประหยัดพื้นที่ดิสก์) ---
Write-Host "กำลังตรวจสอบและทำความสะอาดไฟล์แบคอัพเก่า..." -ForegroundColor Cyan
Get-ChildItem $BackupDir -Filter "*.sql" | Where-Object { $_.LastWriteTime -lt (Get-Date).AddDays(-30) } | ForEach-Object {
    Remove-Item $_.FullName -Force
    Write-Host "ลบไฟล์แบคอัพเก่าเสร็จสิ้น: $_.Name" -ForegroundColor Yellow
}
Write-Host "ระบบจัดการแบคอัพทำงานเสร็จสิ้นสมบูรณ์!" -ForegroundColor Green
