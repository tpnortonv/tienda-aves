const mongoose = require('mongoose');

// Definición del esquema para el modelo de usuario
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Para garantizar que no haya dos usuarios con el mismo correo electrónico
    match: [/^\S+@\S+\.\S+$/, 'Por favor ingresa un correo válido'], // Validación de correo electrónico
  },
  password: {
    type: String,
    required: true,
  },
  customerId: { // 🔹 Guardamos el ID del cliente en Stripe
    type: String,
    default: null
  }
}, {
  timestamps: true, // Para agregar los campos 'createdAt' y 'updatedAt'
});

// Crear el modelo a partir del esquema
const User = mongoose.model('User', userSchema);

module.exports = User;
