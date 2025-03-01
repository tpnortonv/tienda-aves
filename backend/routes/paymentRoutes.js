const express = require('express');
const router = express.Router();

// Importar las funciones del controlador de pagos
const { createPaymentIntent, savePaymentDetails } = require('../controllers/paymentController');

// Definir las rutas correctamente
router.post('/create-payment-intent', createPaymentIntent); // Ruta para crear el intent de pago
router.post('/save-payment-details', savePaymentDetails); // Ruta para guardar los detalles del pago

module.exports = router;

