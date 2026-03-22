const express = require('express');
const { exec } = require('child_process');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// المحرك العالمي لسحب الروابط المباشرة
app.get('/api/extract', (req, res) => {
    const targetUrl = req.query.url;
    if (!targetUrl) return res.status(400).json({ error: "الرابط مطلوب" });

    // أمر الاستخراج العميق:
    // -g: الحصول على الرابط المباشر
    // --get-title: الحصول على عنوان الفيديو
    // --get-thumbnail: الحصول على الصورة المصغرة
    const command = `npx yt-dlp-exec "${targetUrl}" -g --get-title --get-thumbnail -f "best"`;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${stderr}`);
            return res.status(500).json({ error: "فشل استخراج الفيديو. قد يكون الرابط خاصاً أو محمياً." });
        }

        const output = stdout.trim().split('\n');
        // ترتيب المخرجات بناءً على الأمر أعلاه
        const title = output[0];
        const thumbnail = output[1];
        const videoLink = output[2];

        res.json({
            success: true,
            title: title,
            thumbnail: thumbnail,
            url: videoLink,
            timestamp: new Date().toISOString()
        });
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 SHADOW ENGINE ONLINE | PORT ${PORT}`));
