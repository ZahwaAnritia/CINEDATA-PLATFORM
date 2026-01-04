const db = require('../config/db');

module.exports = async (req, res, next) => {
    const startTime = Date.now();
    const apiKey = req.headers['x-api-key'] || req.query.apikey;

    if (!apiKey) return res.status(401).json({ error: "API Key missing" });

    try {
        const [keys] = await db.execute('SELECT * FROM api_keys WHERE api_key = ? AND is_active = 1', [apiKey]);
        if (keys.length === 0) return res.status(403).json({ error: "Invalid API Key" });

        const keyData = keys[0];
        req.apiUser = keyData;

        // Logging Usage setelah response selesai dikirim
        res.on('finish', async () => {
            const duration = Date.now() - startTime;
            await db.execute(
                'INSERT INTO api_usage (api_key_id, endpoint, method, status_code, response_time_ms, ip_address) VALUES (?,?,?,?,?,?)',
                [keyData.id, req.originalUrl, req.method, res.statusCode, duration, req.ip]
            );
            await db.execute('UPDATE api_keys SET last_used = NOW() WHERE id = ?', [keyData.id]);
        });

        next();
    } catch (err) {
        res.status(500).json({ error: "Internal Auth Error" });
    }
};