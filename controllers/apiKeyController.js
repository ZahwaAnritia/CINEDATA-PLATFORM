const db = require('../config/db');
const crypto = require('crypto');

exports.getKeys = async (req, res) => {
    try {
        const [keys] = await db.execute('SELECT * FROM api_keys WHERE user_id = ?', [req.user.id]);
        res.json(keys);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.generateKey = async (req, res) => {
    const newKey = 'wf_' + crypto.randomBytes(24).toString('hex');
    try {
        await db.execute(
            'INSERT INTO api_keys (user_id, api_key, key_name) VALUES (?, ?, ?)',
            [req.user.id, newKey, req.body.name || 'Default Key']
        );
        res.json({ message: "Key generated!", api_key: newKey });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// controllers/apiKeyController.js - Bagian getStats
exports.getStats = async (req, res) => {
    try {
        // Hitung total calls
        const [count] = await db.execute(`
            SELECT COUNT(*) as total 
            FROM api_usage u 
            JOIN api_keys k ON u.api_key_id = k.id 
            WHERE k.user_id = ?`, [req.user.id]);

        // Ambil log penggunaan
        const [usage] = await db.execute(`
            SELECT u.* 
            FROM api_usage u 
            JOIN api_keys k ON u.api_key_id = k.id 
            WHERE k.user_id = ? 
            ORDER BY u.created_at DESC LIMIT 10`, [req.user.id]);

        res.json({ 
            recent_usage: usage || [], 
            total_calls: count[0].total || 0 
        });
    } catch (err) {
        console.error("STATS ERROR:", err); // Lihat error di terminal terminal jika ada
        res.status(500).json({ error: err.message });
    }
};