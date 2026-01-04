const rateLimit = {};

module.exports = (req, res, next) => {
    const apiKey = req.headers['x-api-key'] || req.ip;
    const now = Date.now();
    const WINDOW_MS = 60 * 1000; // 1 Menit
    const MAX_REQUESTS = 60; // Max 60 request per menit

    if (!rateLimit[apiKey]) {
        rateLimit[apiKey] = { count: 1, startTime: now };
    } else {
        if (now - rateLimit[apiKey].startTime < WINDOW_MS) {
            rateLimit[apiKey].count++;
        } else {
            rateLimit[apiKey] = { count: 1, startTime: now };
        }
    }

    if (rateLimit[apiKey].count > MAX_REQUESTS) {
        return res.status(429).json({ 
            error: "Too many requests", 
            message: "Rate limit exceeded. Please try again in a minute." 
        });
    }
    next();
};