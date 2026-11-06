const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// دمج كل الردود في مكان واحد
app.get('/*', (req, res) => {
    console.log(`Game Request: ${req.url}`);

    // 1. إذا كانت اللعبة تطلب بيانات المستخدم أو الإعدادات (عشان متوديكش لإنشاء حساب)
    if (req.url.includes('user') || req.url.includes('config') || req.url.includes('profile')) {
        return res.json({
            "status": "success",
            "pc_logo": true,
            "account_verified": true,
            "user_id": "verified",
            "version": "1.0.0",
            "message": "User profile synchronized"
        });
    }

    // 2. الرد اللي كان في كودك الأصلي (الرد الأساسي لعلامة البي سي)
    if (req.url === '/' || req.url.includes('logo')) {
        return res.json({
            "status": "success",
            "pc_logo": true,
            "version": "1.0.0",
            "message": "PC Logo Enabled"
        });
    }

    // 3. رد احتياطي لأي طلب آخر عشان اللعبة متطلعش "خطأ في الاتصال"
    res.json({
        "status": "success",
        "pc_logo": true,
        "result": "ok",
        "data": {
            "is_pc": true,
            "logo_visible": true,
            "connection": "stable"
        }
    });
});

app.listen(PORT, () => {
    console.log(`Combined Server is running on port ${PORT}`);
});
                        
