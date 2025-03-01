// backend/routes/cartRoutes.js
const express = require('express');
const router = express.Router();
const { createOrUpdateCart, getCart, removeProductFromCart } = require('../controllers/cartController');
const authMiddleware = require('../middleware/authMiddleware');

// Rutas del carrito
router.post('/', authMiddleware, createOrUpdateCart); // Crear o actualizar el carrito
router.get('/:userId', authMiddleware, getCart); // Obtener el carrito
router.delete('/:userId/:productId', authMiddleware, removeProductFromCart); // Eliminar un producto del carrito

module.exports = router;
