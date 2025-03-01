const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');  // Importamos las funciones del controlador

const router = express.Router();

// Crear un nuevo producto
router.post('/add', authMiddleware, createProduct);

// Obtener todos los productos
router.get('/', getAllProducts);

// Obtener un producto por su ID
router.get('/:id', getProductById);

// Actualizar un producto por su ID
router.put('/:id', authMiddleware, updateProduct);

// Eliminar un producto por su ID
router.delete('/:id', authMiddleware, deleteProduct);

module.exports = router;
