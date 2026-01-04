const express = require('express');
const router = express.Router(); // <--- BARIS INI WAJIB ADA
const authController = require('../controllers/authController');

router.post('/register', authController.register);
router.post('/login', authController.login);
const auth = require('../middleware/auth');
router.get('/profile', auth, authController.getProfile);
router.put('/profile', auth, authController.updateProfile);

module.exports = router;