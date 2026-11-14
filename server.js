const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

// เพิ่ม Limit ขนาด Payload รองรับไฟล์ภาพ Base64
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(express.static(__dirname));
app.use('/picture', express.static(path.join(__dirname, 'picture')));

// รองรับ Route หน้าแรกสำหรับ Localhost และ Vercel
app.get('/', (req, res) => {
    const indexPath = path.join(__dirname, 'index.html');
    if (!fs.existsSync(indexPath)) {
        return res.status(404).send(`
            <h2>ไม่พบไฟล์ index.html ในโฟลเดอร์นี้</h2>
            <p>กรุณาสร้างไฟล์ชื่อ <b>index.html</b> ไว้ในโฟลเดอร์เดียวกับ <b>server.js</b> (${__dirname}) แล้วรีเฟรชหน้านี้ใหม่</p>
        `);
    }
    res.sendFile(indexPath);
});

// ==========================================
// MOCK DATA สินค้า (เฉพาะโซน มศว ประสานมิตร)
// ==========================================
let mockProducts = [
    {
        id: 1,
        title: "กระจก ยาวเต็มตัว 180 cm x 70 cm สภาพดี",
        price: 350,
        category: "เครื่องแต่งตัว",
        dorm_location: "ideo mobi Asoke (มศว ประสานมิตร)",
        payment_method: "QR พร้อมเพย์ / Mobile Banking",
        payment_detail: "พร้อมเพย์ 081-234-5678 (ธัญญลักษณ์)",
        payment_qr: "",
        description: "กระจกยาวเต็มตัว ขนาด 180 cm x 70 cm สภาพดีมาก เหมาะสำหรับแต่งตัวหรือใช้ในห้องนอน",
        seller_name: "Thanyaluk kanthadong (ปี 1)",
        seller_avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80",
        image_url: "/picture/S_31670329_0.jpg",
        is_sold: false
    },
    {
        id: 2,
        title: "ชีทสรุปเตรียมสอบ Gen Ed สภาพ 100%",
        price: 80,
        category: "หนังสือเรียน",
        dorm_location: "มศว ประสานมิตร (ตึกไข่ดาว)",
        payment_method: "QR พร้อมเพย์",
        payment_detail: "พร้อมเพย์ 089-000-1122 (แอน)",
        payment_qr: "",
        description: "สรุปเนื้อหาอ่านง่าย มีแนวข้อสอบเก่าพร้อมเฉลยละเอียด ปล่อยต่อราคาเบาๆ ครับ",
        seller_name: "แอน (ปี 2)",
        seller_avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&q=80",
        image_url: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=500&q=80",
        is_sold: true
    },
    {
        id: 3,
        title: "พัดลมตั้งโต๊ะ Hatari 16 นิ้ว",
        price: 350,
        category: "เครื่องใช้ไฟฟ้า",
        dorm_location: "คอนโด Life Asoke (มศว ประสานมิตร)",
        payment_method: "QR พร้อมเพย์ / เก็บเงินปลายทาง",
        payment_detail: "กสิกรไทย 098-7-65432-1 (เต้)",
        payment_qr: "",
        description: "พัดลมเปิดแรง ลมเย็นปกติ นัดรับหน้า มศว ประสานมิตร หรือ Life Asoke ได้เลยครับ",
        seller_name: "เต้ (ปี 2)",
        seller_avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
        image_url: "https://images.unsplash.com/photo-1618941716939-553df3c6c278?w=500&q=80",
        is_sold: false
    },
    {
        id: 4,
        title: "เก้าอี้ทำงาน/อ่านหนังสือ สภาพ 95%",
        price: 450,
        category: "เฟอร์นิเจอร์",
        dorm_location: "คอนโด Supalai ประสานมิตร",
        payment_method: "QR พร้อมเพย์ / Mobile Banking",
        payment_detail: "ไทยพาณิชย์ 111-2-33445-6 (มายด์)",
        payment_qr: "",
        description: "เก้าอี้เบาะนุ่ม นั่งสบาย เหมาะกับการนั่งอ่านหนังสือสอบ นัดรับที่คอนโด Supalai ประสานมิตรค่ะ",
        seller_name: "มายด์ (ปี 4)",
        seller_avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80",
        image_url: "https://images.unsplash.com/photo-1580481072645-022f9a6d1270?w=500&q=80",
        is_sold: false
    }
];

let mockChats = {};

// 1. API ดึงรายการสินค้าทั้งหมด
app.get('/api/products', (req, res) => {
    res.json(mockProducts);
});

// 2. API โพสต์ขายสินค้าใหม่
app.post('/api/chats/start', (req, res) => {
    const { productId } = req.body;
    const product = mockProducts.find(p => p.id === Number(productId));
    if (!product) {
        return res.status(404).json({ error: 'ไม่พบสินค้า' });
    }

    const threadId = `chat_prod_${product.id}`;
    if (!mockChats[threadId]) {
        const now = new Date();
        const timeStr = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
        mockChats[threadId] = {
            threadId,
            productId: product.id,
            productTitle: product.title,
            productPrice: product.price,
            productImg: product.image_url,
            sellerName: product.seller_name,
            sellerAvatar: product.seller_avatar,
            messages: [
                {
                    sender: 'seller',
                    text: `สวัสดีครับ/ค่ะ สนใจ "${product.title}" สอบถามรายละเอียดหรือนัดรับแถว มศว ประสานมิตร ได้เลยนะ`,
                    time: timeStr
                }
            ]
        };
    }

    res.json({ thread: mockChats[threadId] });
});
// 3. API จำลองล็อกอินด้วยอีเมล มศว
app.post('/api/login', (req, res) => {
    const { email } = req.body;
    if (email && (email.endsWith('@g.swu.ac.th') || email.endsWith('@swu.ac.th'))) {
        const studentId = email.split('@')[0];
        return res.json({
            success: true,
            email,
            name: studentId,
            avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80"
        });
    }
    return res.status(403).json({ error: 'อนุญาตเฉพาะอีเมล มศว เท่านั้น (@g.swu.ac.th)' });
});

// 4. API ระบบแชทในเว็บ
app.get('/api/chats', (req, res) => {
    res.json(mockChats);
});

app.post('/api/chats/start', (req, res) => {
    const { productId, buyerEmail } = req.body;
    const product = mockProducts.find(p => p.id === Number(productId));
    if (!product) {
        return res.status(404).json({ error: 'ไม่พบสินค้า' });
    }

    const threadId = `chat_${product.id}_${buyerEmail || 'guest'}`;
    if (!mockChats[threadId]) {
        const now = new Date();
        const timeStr = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
        mockChats[threadId] = {
            threadId,
            productId: product.id,
            productTitle: product.title,
            productPrice: product.price,
            productImg: product.image_url,
            sellerName: product.seller_name,
            sellerAvatar: product.seller_avatar,
            messages: [
                {
                    sender: 'seller',
                    text: `สวัสดีครับ/ค่ะ สนใจ "${product.title}" สอบถามรายละเอียดหรือนัดรับแถว มศว ประสานมิตร ได้เลยนะ`,
                    time: timeStr
                }
            ]
        };
    }

    res.json({ thread: mockChats[threadId] });
});

app.post('/api/chats/message', (req, res) => {
    const { threadId, text, time } = req.body;
    if (!threadId || !text) {
        return res.status(400).json({ error: 'ข้อมูลไม่ครบถ้วน' });
    }

    if (mockChats[threadId]) {
        mockChats[threadId].messages.push({ sender: 'buyer', text, time });
    }
    res.json({ success: true, thread: mockChats[threadId] });
});

app.listen(3000, () => {
    console.log('SWU Prasarnmit Marketplace Server running on http://localhost:3000');
});

module.exports = app;