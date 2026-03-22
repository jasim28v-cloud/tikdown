const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

// تفعيل CORS للسماح لملف index.html بالوصول للمحرك
app.use(cors());

app.get('/api/extract', async (req, res) => {
    const videoUrl = req.query.url;
    
    if (!videoUrl) {
        return res.status(400).json({ success: false, error: "الرجاء إدخال رابط" });
    }

    try {
        // الاتصال بمحرك سحب عالمي يدعم (تيك توك، يوتيوب، فيسبوك، إنستغرام)
        const response = await axios.get(`https://api.boxapi.xyz/api/v1/download?url=${encodeURIComponent(videoUrl)}`);
        
        // إرسال النتيجة للواجهة الأمامية
        if (response.data && response.data.success) {
            res.json(response.data);
        } else {
            res.status(500).json({ success: false, error: "فشل المحرك في استخراج الروابط" });
        }
    } catch (error) {
        console.error("Extraction Error:", error.message);
        res.status(500).json({ success: false, error: "السيرفر يواجه ضغطاً حالياً" });
    }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`SHADOW ENGINE ONLINE ON PORT ${PORT}`);
});
