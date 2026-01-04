const express = require('express');
const router = express.Router(); // <--- BARIS INI WAJIB ADA
const adminController = require('../controllers/adminController');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');

// Middleware untuk proteksi Admin
router.use(auth);
router.use(adminAuth);

// Pastikan controller sudah di-import di atas
router.get('/stats', adminController.getAdminStats);
router.get('/movies', adminController.getAllMovies);
router.get('/movies/:id', adminController.getMovieById);
router.post('/movies', adminController.addMovie);
router.put('/movies/:id', adminController.updateMovie);
router.delete('/movies/:id', adminController.deleteMovie);
router.get('/movies/:id', adminController.getMovieById);

router.get('/users', auth, adminAuth, adminController.getAllUsers);
router.get('/global-logs', auth, adminAuth, adminController.getGlobalLogs);
module.exports = router; // <--- JANGAN LUPA EXPORT