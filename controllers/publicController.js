const db = require('../config/db');

// controllers/publicController.js

exports.getAllMovies = async (req, res) => {
    try {
        // Ambil semua data tanpa peduli scope kunci
        const [rows] = await db.execute('SELECT * FROM movies ORDER BY id DESC');
        
        res.json({ 
            status: "success", 
            results: rows.length,
            data: rows 
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getMovieById = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.execute('SELECT * FROM movies WHERE id = ?', [id]);
        
        if (rows.length === 0) {
            return res.status(404).json({ 
                status: "error", 
                message: "Movie not found with that ID" 
            });
        }

        res.json({ status: "success", data: rows[0] });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// controllers/publicController.js

// 1. Search Movies (Mencari berdasarkan Judul)
exports.searchMovies = async (req, res) => {
    const { q } = req.query; // Ambil kata kunci dari URL ?q=batman
    try {
        const [rows] = await db.execute(
            'SELECT * FROM movies WHERE title LIKE ?', 
            [`%${q}%`]
        );
        res.json({ success: true, count: rows.length, data: rows });
    } catch (err) { res.status(500).json({ error: err.message }); }
};

// 2. Get Top Rated (Urutkan dari rating tertinggi)
exports.getTopRated = async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM movies ORDER BY rating DESC LIMIT 10');
        res.json({ success: true, data: rows });
    } catch (err) { res.status(500).json({ error: err.message }); }
};