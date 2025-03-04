const mongoose = require('mongoose');

// Definir el esquema para el producto
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  stripeProductId: { // 🔥 Agregado: ID del producto en Stripe
    type: String,
    required: false, // No es obligatorio, pero se debería llenar
  },
  stripePriceId: { // 🔥 Agregado: ID del precio en Stripe
    type: String,
    required: false,
  },
}, { timestamps: true });

// Crear el modelo de Producto
const Product = mongoose.model('Product', productSchema);

module.exports = Product;

