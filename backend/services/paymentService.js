const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Payment = require('../models/Payment'); // Modelo de pago
const User = require('../models/AuthUser'); // Modelo de usuario

// 🔹 Crear un PaymentIntent en Stripe
const createPaymentIntent = async (amount, userId) => {
  try {
    // Validar datos de entrada
    if (!amount || !userId) {
      throw new Error("El monto y el userId son obligatorios.");
    }

    // Buscar al usuario en la base de datos
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("Usuario no encontrado.");
    }

    console.log("✅ Creando PaymentIntent para usuario:", userId, "Monto:", amount);

    // Crear el PaymentIntent en Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount, // Monto en centavos (Ej: 10000 CLP = $100)
      currency: 'clp',
      payment_method_types: ['card'], // Especificamos el tipo de pago
      metadata: { userId: user._id.toString() },
    });

    console.log("✅ PaymentIntent creado:", paymentIntent.id);

    return paymentIntent;
  } catch (error) {
    console.error("❌ Error en createPaymentIntent:", error.message);
    throw new Error("Error al crear el PaymentIntent: " + error.message);
  }
};

// 🔹 Guardar detalles del pago en la BD
const savePaymentDetails = async (userId, paymentIntentId, amount) => {
  try {
    // Validar datos de entrada
    if (!userId || !paymentIntentId || !amount) {
      throw new Error("Faltan datos obligatorios (userId, paymentIntentId, amount).");
    }

    console.log("✅ Guardando pago:", { userId, paymentIntentId, amount });

    // Guardar en la base de datos
    const payment = new Payment({
      userId,
      paymentIntentId,
      amount,
      status: "pending",
    });

    await payment.save();
    console.log("✅ Pago guardado correctamente en la BD.");
    
    return payment;
  } catch (error) {
    console.error("❌ Error en savePaymentDetails:", error.message);
    throw new Error("Error al guardar detalles del pago: " + error.message);
  }
};

module.exports = {
  createPaymentIntent,
  savePaymentDetails,
};
