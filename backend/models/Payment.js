const mongoose = require('mongoose');

// Definir el esquema de pago
const paymentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AuthUser', // Referencia al modelo de usuario
    required: true,
  },
  paymentIntentId: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Crear el modelo de pago
const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;