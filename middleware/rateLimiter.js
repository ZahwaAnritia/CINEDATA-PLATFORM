const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 Menit
    max: 60, // Batas 60 request per menit
    message: {
        success: false,
        error: "Too many requests",
        message: "Rate limit exceeded. Please try again in a minute."
    },
    standardHeaders: true, 
    legacyHeaders: false, 
    
    // --- TAMBAHKAN BARIS INI UNTUK MEMATIKAN VALIDASI IPV6 ---
    validate: { default: false }, 
    
    // Logika penentu siapa yang kena limit
    keyGenerator: (req) => {
        // Prioritaskan API Key, jika tidak ada baru gunakan IP
        return req.headers['x-api-key'] || req.ip;
    }
});

module.exports = limiter;