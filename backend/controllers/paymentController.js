const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // Usar la clave secreta de Stripe desde el .env
const Payment = require('../models/Payment'); // Importar el modelo de Payment

// Crear un pago (Payment Intent)
const createPaymentIntent = async (req, res) => {
  const { amount } = req.body; // El monto del pago debe ser enviado desde el frontend

  try {
    // Crear un paymentIntent con el monto especificado
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Stripe maneja los montos en centavos
      currency: 'clp', // Moneda CLP (pesos chilenos)
      metadata: { integration_check: 'accept_a_payment' }, // Metadata opcional
    });

    // Retornar el client secret para completar el pago en el frontend
    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al procesar el pago', error });
  }
};

// Guardar los detalles del pago en la base de datos
const savePaymentDetails = async (req, res) => {
  const { userId, paymentIntentId, amount } = req.body;

  try {
    // Crear un nuevo registro de pago en la base de datos
    const payment = new Payment({
      userId,
      paymentIntentId,
      amount,
      status: 'completed', // Estatus de pago completado
    });

    // Guardar el pago en la base de datos
    await payment.save();

    res.status(201).json({ message: 'Pago guardado exitosamente', payment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al guardar el pago', error });
  }
};

// Exportar las funciones
module.exports = {
  createPaymentIntent,
  savePaymentDetails,
};
