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
// MOCK DATA สินค้า (รองรับช่องทางการชำระเงิน + แชทในเว็บ)
// ==========================================
let mockProducts = [
    {
        id: 1,
        title: "กระจก ยาวเต็มตัว 180 cm x 70 cm สภาพดี",
        price: 350,
        category: "เครื่องแต่งตัว",
        dorm_location: "ideo mobi Asoke",
        payment_method: "QR พร้อมเพย์ / โอนผ่านธนาคาร",
        payment_detail: "พร้อมเพย์ 081-234-5678 (ธัญญลักษณ์)",
        payment_qr: "",
        description: "กระจกยาวเต็มตัว ขนาด 180 cm x 70 cm สภาพดีมาก เหมาะสำหรับแต่งตัวหรือใช้ในห้องนอน",
        seller_name: "Thanyaluk kanthadong (ปี 1)",
        seller_avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80",
        image_url: "/picture/S_31670329_0.jpg",
        is_sold: false,
        auto_replies: [
            "สวัสดีค่า กระจกยังอยู่เลยค่ะ สภาพใหม่มากไม่มีรอยร้าว",
            "ได้รับยอดเรียบร้อยค่า นัดรับที่คอนโด ideo mobi Asoke หรือหน้า มศว ประสานมิตร ได้เลยนะคะ"
        ]
    },
    {
        id: 2,
        title: "ชีทสรุปเตรียมสอบ Gen Ed สภาพ 100%",
        price: 80,
        category: "หนังสือเรียน",
        dorm_location: "มศว ประสานมิตร",
        payment_method: "QR พร้อมเพย์",
        payment_detail: "พร้อมเพย์ 089-000-1122 (แอน)",
        payment_qr: "",
        description: "สรุปเนื้อหาอ่านง่าย มีแนวข้อสอบเก่าพร้อมเฉลยละเอียด ปล่อยต่อราคาเบาๆ ครับ",
        seller_name: "แอน (ปี 2)",
        seller_avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&q=80",
        image_url: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=500&q=80",
        is_sold: true,
        auto_replies: [
            "เล่มนี้มีคนรับไปแล้วค่า ขอบคุณที่สนใจนะคะ"
        ]
    },
    {
        id: 3,
        title: "พัดลมตั้งโต๊ะ Hatari 16 นิ้ว",
        price: 350,
        category: "เครื่องใช้ไฟฟ้า",
        dorm_location: "หอพักฝั่งองครักษ์",
        payment_method: "โอนธนาคาร / เก็บเงินปลายทาง",
        payment_detail: "กสิกรไทย 098-7-65432-1 (เต้)",
        payment_qr: "",
        description: "พัดลมเปิดแรง ลมเย็นปกติ นัดรับใต้หอพักฝั่งองครักษ์ได้เลยครับ",
        seller_name: "เต้ (ปี 2)",
        seller_avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
        image_url: "https://images.unsplash.com/photo-1618941716939-553df3c6c278?w=500&q=80",
        is_sold: false,
        auto_replies: [
            "สวัสดีครับ พัดลมยังอยู่ครับ ใช้งานได้ปกติทุกเบอร์",
            "โอเคครับ นัดรับใต้หอพักนิสิตฝั่งองครักษ์ช่วงเย็นได้เลยครับ"
        ]
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
        description: "เก้าอี้เบาะนุ่ม นั่งสบาย เหมาะกับการนั่งอ่านหนังสือสอบ",
        seller_name: "มายด์ (ปี 4)",
        seller_avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80",
        image_url: "https://images.unsplash.com/photo-1580481072645-022f9a6d1270?w=500&q=80",
        is_sold: false,
        auto_replies: [
            "สวัสดีค่ะ เก้าอี้ยังว่างอยู่ค่ะ เบาะยังแน่นเหมือนใหม่เลย",
            "มารับเองที่ Supalai ประสานมิตร ลดเหลือ 400 บาทถ้วนได้เลยค่ะ"
        ]
    }
];

let mockChats = {};

// 1. API ดึงรายการสินค้าทั้งหมด
app.get('/api/products', (req, res) => {
    res.json(mockProducts);
});

// 2. API โพสต์ขายสินค้าใหม่
app.post('/api/products', (req, res) => {
    const {
        title, price, category, dorm_location,
        payment_method, payment_detail, payment_qr,
        description, image_url, seller_name, seller_avatar
    } = req.body;

    if (!title || !price) {
        return res.status(400).json({ error: 'กรุณากรอกข้อมูลให้ครบถ้วน' });
    }

    const newProduct = {
        id: Date.now(),
        title,
        price: Number(price),
        category: category || "ทั่วไป",
        dorm_location: dorm_location || "ไม่ระบุ",
        payment_method: payment_method || "QR พร้อมเพย์ / โอนผ่านธนาคาร",
        payment_detail: payment_detail || "พร้อมเพย์ 081-234-5678",
        payment_qr: payment_qr || "",
        description: description || "ไม่มีรายละเอียดเพิ่มเติม",
        seller_name: seller_name || "Thanyalak Kanthadong",
        seller_avatar: seller_avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80",
        image_url: image_url || "https://via.placeholder.com/400x300?text=No+Image",
        is_sold: false,
        auto_replies: [
            "สวัสดีครับ/ค่ะ สินค้ายังอยู่ สามารถชำระเงินตามช่องทางที่เลือกแล้วนัดรับได้เลยนะ"
        ]
    };

    mockProducts.unshift(newProduct);
    res.json({ message: 'ลงขายสินค้าสำเร็จ', product: newProduct });
});

// 3. API จำลองล็อกอินด้วยอีเมล มศว
app.post('/api/login', (req, res) => {
    const { email } = req.body;
    if (email && (email.endsWith('@g.swu.ac.th') || email.endsWith('@swu.ac.th'))) {
        return res.json({
            success: true,
            email,
            name: "Thanyalak Kanthadong",
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
                    text: `สวัสดีครับ/ค่ะ สนใจ "${product.title}" สอบถามรายละเอียดหรือแจ้งชำระเงินได้เลยนะ`,
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
    console.log('SWU Dorm Marketplace Server running on http://localhost:3000');
});

// Export app สำหรับ Vercel Serverless
module.exports = app;