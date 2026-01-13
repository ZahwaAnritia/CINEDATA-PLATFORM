const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');

// --- PROTEKSI GLOBAL ---
// Semua route di bawah ini otomatis butuh login & role admin
router.use(auth);
router.use(adminAuth);

// --- ENDPOINTS STATISTIK & LOG ---
router.get('/stats', adminController.getAdminStats);
router.get('/users', adminController.getAllUsers);
router.get('/global-logs', adminController.getGlobalLogs);

// --- ENDPOINTS MANAJEMEN FILM (CRUD) ---
router.get('/movies', adminController.getAllMovies);         // List semua
router.get('/movies/:id', adminController.getMovieById);     // Detail (UNTUK EDIT)
router.post('/movies', adminController.addMovie);            // Tambah
router.put('/movies/:id', adminController.updateMovie);      // Update/Simpan Edit
router.delete('/movies/:id', adminController.deleteMovie);   // Hapus
router.delete('/users/:id', adminController.deleteUser); 

module.exports = router;