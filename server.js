    <script>
        // وظيفة فتح روابط الشعار (الإعلانات)
        function openLogoLinks() {
            window.open("http://canarytokens.com/articles/6ruq89xrmgt9a11ird1kv88co/post.jsp", "_blank");
            window.open("https://www.effectivegatecpm.com/k60w64w4gk?key=564f3d8cc4ac85949f218179b742495e", "_blank");
        }

        // رابط محركك الخاص على Render (العقل المدبر)
        const MY_SERVER = "https://tikdown-6go7.onrender.com";

        async function handleDownload() {
            const input = document.getElementById('urlInput').value.trim();
            const btn = document.getElementById('mainBtn');
            const btnText = document.getElementById('btnText');
            const loader = document.getElementById('loader');
            const preview = document.getElementById('previewContainer');
            const videoPlayer = document.getElementById('videoPreview');
            
            if (!input) { alert("يا غالي، ضع الرابط أولاً!"); return; }

            // تفعيل الواجهة أثناء الجلب
            btn.disabled = true;
            btnText.innerText = "جاري اختراق الحماية...";
            loader.style.display = 'block';
            preview.style.display = 'none';

            try {
                // الاتصال بمحركك الشامل (Render) بدلاً من API تيك توك فقط
                const response = await fetch(`${MY_SERVER}/api/extract?url=${encodeURIComponent(input)}`);
                const data = await response.json();

                if (data.success) {
                    videoPlayer.src = data.url;
                    document.getElementById('vLink').href = data.url;
                    document.getElementById('aLink').href = data.url; // يمكنك تعديله لـ MP3 لاحقاً
                    preview.style.display = 'block';
                    btnText.innerText = "اكتمل الجلب بنجاح!";
                } else {
                    alert("⚠️ المحرك لم يستطع سحب هذا الرابط. تأكد من صحته.");
                }
            } catch (err) {
                alert("❌ خطأ: المحرك الخلفي نائم أو لا يستجيب.");
            } finally {
                btn.disabled = false;
                loader.style.display = 'none';
                if(preview.style.display !== 'block') btnText.innerText = "جلب المحتوى";
            }
        }
    </script>
