/**
 * =======================================================
 * 👤 Author: Tichakorn Khunyai (Unknown-Dev-BUG)
 * 🏢 Project: LowcodeProject
 * 📄 File: add-signature.js
 * ✍️ Description: สคริปต์อัตโนมัติสำหรับแอดกล่องลายเซ็นลงบรรทัดแรกสุดของไฟล์โค้ดในโปรเจกต์
 * =======================================================
 */

const fs = require('fs');
const path = require('path');

// โฟลเดอร์เป้าหมายที่จะทำการแอดลายเซ็น
const TARGET_DIR = path.join(__dirname, '../packages'); // รันเฉพาะในโฟลเดอร์แพ็กเกจหลัก

// ไฟล์ที่ต้องการค้นหาและใส่ลายเซ็น (.ts, .tsx, .js, .jsx, .css)
const FILE_EXTENSIONS = ['.ts', '.tsx', '.js', '.jsx', '.css'];

// โฟลเดอร์ที่ต้องการข้าม
const EXCLUDE_DIRS = ['node_modules', 'dist', '.turbo', 'build', 'coverage'];

function addSignatureToFile(filePath) {
    const fileName = path.basename(filePath);
    const content = fs.readFileSync(filePath, 'utf8');

    // ตรวจสอบว่าไฟล์นี้มีคอมเมนต์ลายเซ็นของ Tichakorn Khunyai อยู่แล้วหรือยัง
    if (content.includes('👤 Author: Tichakorn Khunyai')) {
        return; // ข้ามถ้ามีอยู่แล้ว
    }

    const today = new Date().toISOString().split('T')[0];

    // สร้างกล่องคอมเมนต์ลายเซ็นสุดเท่สไตล์ Cyberpunk/ASCII
    const signature = `/**
 *    __  __      __                                    ____             ____  __  __ ______ 
 *   / / / /___  / /______  ____ _      ______         / __ \\___  _   __/ __ )/ / / / / ____/ 
 *  / / / / __ \\/ //_/ __ \\/ __ \\ | /| / / __ \\______ / / / / _ \\| | / / __  / / / / / / __   
 * / /_/ / / / / ,< / /_/ / /_/ / |/ |/ / / / /_____// /_/ /  __/| |/ / /_/ / /_/ / / /_/ /   
 * \\____/_/ /_/_/|_|\\____/\\____/|__/|__/_/ /_/      /_____/\\___/ |___/_____/\\____/\\____/    
 *
 * =========================================================================================
 * 👤 AUTHOR        : Tichakorn Khunyai
 * 🏢 PROJECT       : LowcodeProject
 * 📄 FILE          : ${fileName}
 * ✍️ DESCRIPTION    : [กรุณาใส่คำอธิบายหน้าที่การทำงานของไฟล์นี้]
 * 📅 LAST MODIFIED  : ${today}
 * =========================================================================================
 */

`;

    fs.writeFileSync(filePath, signature + content, 'utf8');
    console.log(`✅ Added signature to: ${filePath}`);
}

function traverseDirectory(dir) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            if (!EXCLUDE_DIRS.includes(file)) {
                traverseDirectory(fullPath);
            }
        } else {
            const ext = path.extname(file);
            if (FILE_EXTENSIONS.includes(ext)) {
                addSignatureToFile(fullPath);
            }
        }
    }
}

console.log('🚀 Starting to add signatures to files...');
traverseDirectory(TARGET_DIR);
console.log('🎉 Completed signature injection!');
