const db = require('../config/db');

// 1. Ambil Statistik Global untuk Dashboard Admin
// controllers/adminController.js

exports.getAdminStats = async (req, res) => {
    try {
        const [movies] = await db.execute('SELECT COUNT(*) as count FROM movies');
        const [users] = await db.execute('SELECT COUNT(*) as count FROM users WHERE role = "developer"');
        const [usage] = await db.execute('SELECT COUNT(*) as count FROM api_usage');
        
        res.json({ 
            total_movies: movies[0].count, 
            total_users: users[0].count, // Tambahkan ini
            total_api_hits: usage[0].count 
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 2. Ambil Semua Film (Untuk tabel Admin)
exports.getAllMovies = async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM movies ORDER BY created_at DESC');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 3. Ambil Satu Film Berdasarkan ID (Untuk Modal Edit)
exports.getMovieById = async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM movies WHERE id = ?', [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ error: "Movie not found" });
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 4. Tambah Film Baru
exports.addMovie = async (req, res) => {
    const { title, release_year, genres, description, director, cast, rating, duration_minutes, cover_url } = req.body;
    try {
        await db.execute(
            `INSERT INTO movies (title, release_year, genres, description, director, cast, rating, duration_minutes, cover_url) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [title, release_year, genres, description, director, cast, rating, duration_minutes, cover_url]
        );
        res.status(201).json({ message: "Movie added successfully!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// 6. Hapus Film
exports.deleteMovie = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await db.execute('DELETE FROM movies WHERE id = ?', [id]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Movie not found" });
        }

        res.json({ message: "Movie deleted successfully!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getMovieById = async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM movies WHERE id = ?', [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ error: "Movie not found" });
        res.json(rows[0]); // Harus mengembalikan object movie tunggal
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// controllers/adminController.js

// TAMBAH FILM
exports.addMovie = async (req, res) => {
    // Gunakan || null untuk semua field agar tidak undefined
    const title = req.body.title || null;
    const release_year = req.body.release_year || null;
    const genres = req.body.genres || null;
    const description = req.body.description || null;
    const director = req.body.director || null;
    const cast = req.body.cast || null;
    const rating = req.body.rating || null;
    const duration_minutes = req.body.duration_minutes || null;
    const cover_url = req.body.cover_url || null;

    try {
        await db.execute(
            `INSERT INTO movies (title, release_year, genres, description, director, cast, rating, duration_minutes, cover_url) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [title, release_year, genres, description, director, cast, rating, duration_minutes, cover_url]
        );
        res.status(201).json({ message: "Movie added successfully!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

// UPDATE FILM
exports.updateMovie = async (req, res) => {
    const { id } = req.params;
    
    // Pastikan semua variabel ini ada atau NULL, jangan biarkan undefined
    const title = req.body.title || null;
    const release_year = req.body.release_year || null;
    const genres = req.body.genres || null;
    const description = req.body.description || null;
    const director = req.body.director || null;
    const cast = req.body.cast || null;
    const rating = req.body.rating || null;
    const duration_minutes = req.body.duration_minutes || null;
    const cover_url = req.body.cover_url || null;

    try {
        const [result] = await db.execute(
            `UPDATE movies SET 
                title = ?, release_year = ?, genres = ?, description = ?, 
                director = ?, cast = ?, rating = ?, duration_minutes = ?, cover_url = ? 
             WHERE id = ?`,
            [title, release_year, genres, description, director, cast, rating, duration_minutes, cover_url, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Movie not found" });
        }

        res.json({ message: "Movie updated successfully!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

// controllers/adminController.js

// 1. Ambil semua User (Developer)
exports.getAllUsers = async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT id, username, email, created_at FROM users WHERE role = "developer"');
        res.json(rows);
    } catch (err) { res.status(500).json({ error: err.message }); }
};

// 2. Ambil Log Trafik Global (Seluruh Sistem)
exports.getGlobalLogs = async (req, res) => {
    try {
        const [rows] = await db.execute(`
            SELECT u.*, k.api_key, usr.username 
            FROM api_usage u 
            JOIN api_keys k ON u.api_key_id = k.id 
            JOIN users usr ON k.user_id = usr.id 
            ORDER BY u.created_at DESC LIMIT 50
        `);
        res.json(rows);
    } catch (err) { res.status(500).json({ error: err.message }); }
};