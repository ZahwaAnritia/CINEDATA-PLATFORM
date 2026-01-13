// Isi file routes/apiKeyRoutes.js

const express = require('express');
const router = express.Router();
const apiKeyController = require('../controllers/apiKeyController');
const auth = require('../middleware/auth');

router.use(auth); // Semua rute di bawah ini butuh login

router.get('/', apiKeyController.getKeys);
router.post('/generate', apiKeyController.generateKey);
// routes/apiKeyRoutes.js
router.post('/generate', auth, apiKeyController.generateKey); 
// ^ Menggunakan router.post dan mengarah ke /generate
router.get('/my-stats', apiKeyController.getStats);

// --- TAMBAHKAN BARIS INI ---
router.delete('/:id', apiKeyController.deleteKey); 

module.exports = router;