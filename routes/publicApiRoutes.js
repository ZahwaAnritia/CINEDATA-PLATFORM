const express = require('express');
const router = express.Router(); // <--- BARIS INI WAJIB ADA
const publicController = require('../controllers/publicController');
const apiKeyAuth = require('../middleware/apiKeyAuth');
const rateLimiter = require('../middleware/rateLimiter');

router.use(apiKeyAuth);
router.use(rateLimiter);

router.get('/movies', publicController.getAllMovies);

// routes/publicApiRoutes.js
router.get('/movies', publicController.getAllMovies);
router.get('/movies/search', publicController.searchMovies); // Baru
router.get('/movies/top-rated', publicController.getTopRated); // Baru
router.get('/movies/:id', publicController.getMovieById);
// --- TAMBAHKAN BARIS INI ---
// Endpoint untuk satu film berdasarkan ID
router.get('/movies/:id', publicController.getMovieById);
module.exports = router;