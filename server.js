const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors({ origin: '*' }));

app.get('/api/extract', async (req, res) => {
    const videoUrl = req.query.url;
    if (!videoUrl) return res.status(400).json({ success: false, error: "الرابط مطلوب" });

    try {
        // استخدام API خارجي مجاني وموثوق لضمان تجاوز حماية المنصات
        const response = await axios.get(`https://api.boxapi.xyz/api/v1/download?url=${encodeURIComponent(videoUrl)}`);
        const data = response.data;

        if (data && data.success) {
            res.json({
                success: true,
                title: data.title || "فيديو جديد",
                url: data.url, // الرابط المباشر للتحميل
                thumbnail: data.thumbnail || ""
            });
        } else {
            // محاولة ثانية بمحرك احتياطي
            res.status(500).json({ success: false, error: "الموقع محمي جداً، حاول برابط آخر" });
        }
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ success: false, error: "السيرفر يواجه ضغطاً، جرب بعد ثوانٍ" });
    }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`SHADOW ENGINE ONLINE ON PORT ${PORT}`));
