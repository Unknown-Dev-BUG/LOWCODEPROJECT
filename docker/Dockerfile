# =========================================================================
# 👤 AUTHOR        : Tichakorn Khunyai (Unknown-Dev-BUG)
# 🏢 PROJECT       : LowcodeProject
# 📄 FILE          : Dockerfile (Frontend Production Build)
# ✍️ DESCRIPTION    : ไฟล์สำหรับบิลด์และสร้าง Container ของหน้าบ้าน Refine (Frontend)
#                     เพื่อใช้สำหรับดีพลอยรันจริงด้วย Nginx Web Server
# =========================================================================

# --- 1. BUILD STAGE ---
FROM node:18-alpine AS builder

# ตั้งค่า Working Directory
WORKDIR /app

# ติดตั้ง pnpm สำหรับการจัดการ Dependency ใน Monorepo
RUN npm install -g pnpm

# คัดลอกเฉพาะไฟล์คอนฟิกหลักเพื่อทำการดาวน์โหลดแพ็กเกจ (ช่วยเรื่อง Cache)
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml tsconfig.json tsconfig.build.json biome.json ./
COPY packages/ ./packages/

# ติดตั้งไลบรารีทั้งหมดในแบบ Monorepo
RUN pnpm install --frozen-lockfile

# สั่งบิลด์ตัวโปรเจกต์หลัก (สมมติว่าคุณสร้างแอปหลักไว้ใน packages/app)
# (สามารถเปลี่ยน path หลังการเขียนแอปหลักของฝั่งหน้าบ้านเสร็จเรียบร้อยแล้ว)
RUN pnpm build

# --- 2. PRODUCTION STAGE ---
FROM nginx:1.25-alpine

# คัดลอกผลลัพธ์การบิลด์หน้าบ้าน (HTML/JS/CSS) ไปวางที่โฟลเดอร์ของ Nginx
# แก้ไขตำแหน่งต้นทางของ dist ตามหน้าบ้านจริงที่คุณใช้พัฒนาในภายหลัง
COPY --from=builder /app/packages/core/dist /usr/share/nginx/html

# คัดลอกคอนฟิก Nginx ไปเพื่อรองรับระบบ SPA Routing
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# เปิดพอร์ตมาตรฐานหน้าบ้าน
EXPOSE 80

# คำสั่งในการรัน Nginx
CMD ["nginx", "-g", "daemon off;"]
