const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await db.execute(
            'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)',
            [username, email, hashedPassword]
        );
        res.status(201).json({ message: "User registered successfully!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const [users] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
        if (users.length === 0) return res.status(404).json({ error: "User not found" });

        const user = users[0];
        const validPass = await bcrypt.compare(password, user.password_hash);
        if (!validPass) return res.status(401).json({ error: "Invalid password" });

        const token = jwt.sign(
            { id: user.id, role: user.role, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        // --- PERBAIKAN DISINI ---
        res.json({ 
            token, 
            user: { 
                id: user.id, 
                username: user.username, 
                email: user.email, // <--- TAMBAHKAN INI!
                role: user.role 
            } 
        });
        // ------------------------

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
// controllers/authController.js

// 1. Ambil Data Profil
exports.getProfile = async (req, res) => {
    try {
        const [users] = await db.execute(
            'SELECT id, username, email, role, created_at FROM users WHERE id = ?', 
            [req.user.id] // req.user didapat dari middleware auth.js
        );
        if (users.length === 0) return res.status(404).json({ error: "User not found" });
        res.json(users[0]);
    } catch (err) { res.status(500).json({ error: err.message }); }
};

// 2. Update Data Profil
exports.updateProfile = async (req, res) => {
    const { username, email } = req.body;
    try {
        await db.execute(
            'UPDATE users SET username = ?, email = ? WHERE id = ?',
            [username, email, req.user.id]
        );
        res.json({ message: "Profile updated successfully!" });
    } catch (err) { res.status(500).json({ error: err.message }); }
};