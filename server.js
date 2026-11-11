const express = require('express');
const path = require('path');
const app = express();

// เพิ่ม Limit ขนาด Payload รองรับไฟล์ภาพ Base64
app.use(express.json({ limit: '10mb' }));
app.use(express.static(__dirname));

// อนุญาตให้เข้าถึงรูปภาพในโฟลเดอร์ picture โดยตรง
app.use('/picture', express.static(path.join(__dirname, 'picture')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});
// ==========================================
// MOCK DATA พร้อมรูปภาพและสถานะ SOLD OUT
// ==========================================
let mockProducts = [
    {
        id: 1,
        title: "กระจก ยาวเต็มตัว 180 cm x 70 cm สภาพดี",
        price: 350,
        category: "เครื่องแต่งตัว",
        dorm_location: "ideo mobi Asoke",
        contact_line: "Khimmy_123",
        contact_phone: "081-234-5678",
        description: "กระจกยาวเต็มตัว ขนาด 180 cm x 70 cm สภาพดีมาก เหมาะสำหรับแต่งตัวหรือใช้ในห้องนอน",
        seller_name: "Thanyaluk kanthadong (ปี 1)",
        seller_avatar: "https://scontent.fbkk29-4.fna.fbcdn.net/v/t39.30808-1/348423820_637435481582972_1664154637165572559_n.jpg?stp=cp6_dst-jpg_tt6&cstp=mx2047x2048&ctp=s480x480&_nc_cat=107&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=e99d92&_nc_ohc=cwlAH4e_M_EQ7kNvwFTX7dR&_nc_oc=AdpnGXSo0HSTuAFVVEoI5yovyqSQ4q9ShP2CloCu9UjHImgg7EP_uEGdw5tT7QzoZfRUc3O1sn1qkSWYsbHq6D3V&_nc_zt=24&_nc_ht=scontent.fbkk29-4.fna&_nc_gid=J2pvh0Q4c8iKo3ieHBFiZQ&_nc_ss=782a8&oh=00_AQQEOyWsJzujwJksCweaOwbDt8x1t0I_NXTt-4vO06t_Lg&oe=6AFA1773",
        image_url: "/picture/S__31670329_0.jpg",
        is_sold: false
    },
    {
        id: 2,
        title: "ไมโครเวฟ SAMSUNG 20 ลิตร สภาพดี",
        price: 800,
        category: "เครื่องใช้ไฟฟ้า",
        dorm_location: "life asoke",
        contact_line: "toonny11",
        contact_phone: "089-000-1122",
        description: "Microwave SAMSUNG 20 ลิตร สภาพดี ใช้งานได้ปกติ มีรอยขีดข่วนเล็กน้อย แต่ไม่กระทบต่อการใช้งาน",
        seller_name: "Pitchayapa yimsuan (ปี 2)",
        seller_avatar: "/picture/S__31678469_0.jpg",
        image_url: "/picture/S__31670331_0.jpg",
        is_sold: false
    },
    {
        id: 3,
        title: "หม้อหุงข้าวไฟฟ้า seagull 1.8 ลิตร",
        price: 900,
        category: "เครื่องใช้ไฟฟ้า",
        dorm_location: "หอพักจิราพรรณ",
        contact_line: "Panchewa_P",
        contact_phone: "089-876-5432",
        description: "หม้อหุงข้าวไฟฟ้า seagull 1.8 ลิตร สภาพดี ใหม่มาก พึ่งซื้อ มีฟีเจอร์การใช้งานเยอะ ใช้งานได้ปกติ",
        seller_name: "Panchewa Pannakanjanawong (ปี 2)",
        seller_avatar: "/picture/S__30269447.jpg",
        image_url: "/picture/S__42336282_0.jpg",
        is_sold: false
    },
    {
        id: 4,
        title: "เก้าอี้ทำงาน/อ่านหนังสือ/ทานอาหาร สภาพ 95%",
        price: 2000,
        category: "เฟอร์นิเจอร์",
        dorm_location: "Supalai Premier asoke",
        contact_line: "jeenjeen",
        contact_phone: "082-111-2233",
        description: "เก้าอี้เบาะหุ้มผ้า นั่งสบาย ใหม่มาก ใช้งานได้ปกติ เหมาะสำหรับทำงาน อ่านหนังสือ หรือทานอาหาร",
        seller_name: "Waratchaya Laemchalat (ปี 4)",
        seller_avatar: "/picture/S__135430222.jpg",
        image_url: "/picture/S__42336283_0.jpg",
        is_sold: true
    }
];

app.get('/api/products', (req, res) => {
    res.json(mockProducts);
});

app.post('/api/products', (req, res) => {
    const { title, price, category, dorm_location, contact_line, contact_phone, description, image_url, seller_name, seller_avatar } = req.body;

    if (!title || !price) {
        return res.status(400).json({ error: 'กรุณากรอกข้อมูลให้ครบถ้วน' });
    }

    const newProduct = {
        id: mockProducts.length + 1,
        title,
        price: Number(price),
        category: category || "ทั่วไป",
        dorm_location: dorm_location || "ไม่ระบุ",
        contact_line: contact_line || "-",
        contact_phone: contact_phone || "-",
        description: description || "ไม่มีรายละเอียดเพิ่มเติม",
        seller_name: seller_name || "Thanyalak Kanthadong (ปี 1)",
        seller_avatar: seller_avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80",
        image_url: image_url || "https://via.placeholder.com/400x300?text=No+Image",
        is_sold: false
    };

    mockProducts.unshift(newProduct);
    res.json({ message: 'ลงขายสินค้าสำเร็จ', product: newProduct });
});

app.post('/api/login', (req, res) => {
    const { email } = req.body;
    if (email && (email.endsWith('@g.swu.ac.th') || email.endsWith('@swu.ac.th'))) {
        const username = email.split('@')[0];
        return res.json({ 
            success: true, 
            email, 
            name: username,
            avatar: "https://scontent.fbkk29-4.fna.fbcdn.net/v/t39.30808-1/348423820_637435481582972_1664154637165572559_n.jpg?stp=cp6_dst-jpg_tt6&cstp=mx2047x2048&ctp=s480x480&_nc_cat=107&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=e99d92&_nc_ohc=YsO4VAL8P-AQ7kNvwEnd-EN&_nc_oc=Adqm4Wzoj3zh2J0PqzWgGjCLENlx_QHjGIv7GfhiHoB1Eb2BjN5UvedG6Kzpc1LZ8WWXI51B0DNXFd4iJ__LZ1u8&_nc_zt=24&_nc_ht=scontent.fbkk29-4.fna&_nc_gid=UIqpUAN163MWyVEL6FPS6g&_nc_ss=782a8&oh=00_AQQK8l8RByA_Ut0pKGx9KnwYrYM9ZmDaHwljica2k1QoaA&oe=6AF0DCF3"
        });
    }
    return res.status(403).json({ error: 'อนุญาตเฉพาะอีเมล มศว เท่านั้น (@g.swu.ac.th)' });
});

app.listen(3000, () => console.log('Mockup Server with Sold Out status running on http://localhost:3000'));

// ... โค้ดด้านบนเหมือนเดิม ...

app.post('/api/login', (req, res) => {
    // ...
});

// บรรทัด app.listen เดิมปล่อยไว้ได้ครับ
app.listen(3000, () => console.log('Mockup Server with Sold Out status running on http://localhost:3000'));

// === เพิ่มบรรทัดนี้ล่างสุดของไฟล์ server.js ===
module.exports = app;