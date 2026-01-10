// File: middleware/rateLimiter.js
const rateLimit = require('express-rate-limit');

const apiLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 menit 
    max: 60, // Limit 60 request 
    keyGenerator: (req) => {
        // Gunakan API Key sebagai ID, kalau gak ada pakai IP
        return req.headers['x-api-key'] || req.ip; 
    },
    message: {
        status: 429,
        error: "Too many requests",
        message: "Rate limit exceeded. Please wait 1 minute."
    },
    standardHeaders: true, // Mengirim header info limit (Pro feature)
    legacyHeaders: false,
});

module.exports = apiLimiter;