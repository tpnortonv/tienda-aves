const express = require('express');
const router = express.Router();
const { registerUser, loginUser, verifyToken } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

// Ruta para registrar un usuario
router.post('/register', registerUser);

// Ruta para iniciar sesión
router.post('/login', loginUser);

// Ruta para verificar el token JWT (con middleware de autenticación)
router.get('/verify', authMiddleware, verifyToken);

module.exports = router;