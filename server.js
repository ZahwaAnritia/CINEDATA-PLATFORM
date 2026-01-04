require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// --- 1. MIDDLEWARE UTAMA ---
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// --- 2. PAGE ROUTING ---
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));
app.get('/login', (req, res) => res.sendFile(path.join(__dirname, 'public', 'login.html')));
app.get('/register', (req, res) => res.sendFile(path.join(__dirname, 'public', 'register.html')));
app.get('/admin-login', (req, res) => res.sendFile(path.join(__dirname, 'public', 'admin', 'login.html')));
app.get('/dashboard', (req, res) => res.sendFile(path.join(__dirname, 'public', 'developer', 'dev-dashboard.html')));
app.get('/admin-panel', (req, res) => res.sendFile(path.join(__dirname, 'public', 'admin', 'admin-dashboard.html')));
app.get('/docs', (req, res) => res.sendFile(path.join(__dirname, 'public', 'docs.html')));

// --- 3. API ROUTES ---
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/keys', require('./routes/apiKeyRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/v1', require('./routes/publicApiRoutes'));

// --- 4. ERROR HANDLERS ---
// Handler 404 API
app.use('/api', (req, res) => {
    res.status(404).json({ success: false, message: 'API Endpoint not found' });
});

// Handler 404 Halaman Web
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public', '404.html'), (err) => {
        if (err) res.status(404).send("<h1>404 - Not Found</h1>");
    });
});

// Global Error Handler (PENTING: Agar server tidak crash)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
});

// --- 5. START SERVER ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`
🚀 =================================================== 🚀
          CINEDATA API SYSTEM IS RUNNING
   ===================================================
   🏠 LANDING PAGE : http://localhost:${PORT}
   🔵 DEV LOGIN    : http://localhost:${PORT}/login
   🔴 ADMIN LOGIN  : http://localhost:${PORT}/admin-login
   ===================================================
    `);
});