const express = require('express');
const router = express.Router(); // <--- BARIS INI WAJIB ADA
const apiKeyController = require('../controllers/apiKeyController');
const auth = require('../middleware/auth');

router.use(auth);

router.get('/', apiKeyController.getKeys);
router.post('/generate', apiKeyController.generateKey);
router.get('/my-stats', apiKeyController.getStats);

module.exports = router;