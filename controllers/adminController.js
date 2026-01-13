const db = require('../config/db');

// 1. Ambil Statistik Global
exports.getAdminStats = async (req, res) => {
    try {
        const [movies] = await db.execute('SELECT COUNT(*) as count FROM movies');
        const [users] = await db.execute('SELECT COUNT(*) as count FROM users WHERE role = "developer"');
        const [usage] = await db.execute('SELECT COUNT(*) as count FROM api_usage');
        
        res.json({ 
            total_movies: movies[0].count, 
            total_users: users[0].count, 
            total_api_hits: usage[0].count 
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 2. Ambil Semua Film
exports.getAllMovies = async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM movies ORDER BY id DESC');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 3. Ambil Satu Film Berdasarkan ID
exports.getMovieById = async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM movies WHERE id = ?', [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ error: "Movie not found" });
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 4. Tambah Film Baru (Safe Version)
exports.addMovie = async (req, res) => {
    const { title, release_year, genres, description, director, cast, rating, duration_minutes, cover_url } = req.body;
    
    // Proteksi undefined dengan || null agar MySQL tidak error
    const params = [
        title || null, release_year || null, genres || null, 
        description || null, director || null, cast || null, 
        rating || null, duration_minutes || null, cover_url || null
    ];

    try {
        await db.execute(
            `INSERT INTO movies (title, release_year, genres, description, director, cast, rating, duration_minutes, cover_url) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            params
        );
        res.status(201).json({ message: "Movie added successfully!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 5. Update Film (Safe Version)
exports.updateMovie = async (req, res) => {
    const { id } = req.params;
    const { title, release_year, genres, description, director, cast, rating, duration_minutes, cover_url } = req.body;

    const params = [
        title || null, release_year || null, genres || null, 
        description || null, director || null, cast || null, 
        rating || null, duration_minutes || null, cover_url || null, id
    ];

    try {
        const [result] = await db.execute(
            `UPDATE movies SET 
                title = ?, release_year = ?, genres = ?, description = ?, 
                director = ?, cast = ?, rating = ?, duration_minutes = ?, cover_url = ? 
             WHERE id = ?`,
            params
        );
        if (result.affectedRows === 0) return res.status(404).json({ error: "Movie not found" });
        res.json({ message: "Movie updated successfully!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 6. Hapus Film
exports.deleteMovie = async (req, res) => {
    try {
        const [result] = await db.execute('DELETE FROM movies WHERE id = ?', [req.params.id]);
        if (result.affectedRows === 0) return res.status(404).json({ error: "Movie not found" });
        res.json({ message: "Movie deleted successfully!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 7. Ambil Semua Developer
exports.getAllUsers = async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT id, username, email, created_at FROM users WHERE role = "developer"');
        res.json(rows);
    } catch (err) { res.status(500).json({ error: err.message }); }
};

// 8. Ambil Log Trafik Global
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

// controllers/adminController.js

// Fungsi untuk menghapus Akun Developer (Banned)
exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        // Kita hanya izinkan menghapus yang rolenya 'developer' 
        // supaya admin tidak sengaja menghapus admin lain lewat sini
        const [result] = await db.execute(
            'DELETE FROM users WHERE id = ? AND role = "developer"',
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ 
                success: false, 
                message: "User tidak ditemukan atau Anda tidak punya izin menghapus akun ini" 
            });
        }

        res.json({ success: true, message: "Akun Developer berhasil dihapus dari sistem." });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};