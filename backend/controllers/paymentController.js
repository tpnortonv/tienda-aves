const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Payment = require("../models/Payment");

const createPaymentIntent = async (req, res) => {
  try {
    const { amount, userId } = req.body;

    // Validación de datos
    if (!amount || !userId) {
      return res.status(400).json({ error: "El monto y el userId son obligatorios." });
    }

    console.log("🎯 Backend recibió:", { amount, userId });

    // Crear PaymentIntent en Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "clp",
      payment_method_types: ["card"], // Asegurar que se procesen pagos con tarjeta
      metadata: { userId }, // Asociar userId para seguimiento
    });

    return res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("⚠️ Error en Stripe:", error);
    res.status(500).json({ error: error.message });
  }
};

const savePaymentDetails = async (req, res) => {
  try {
    const { userId, paymentIntentId, amount } = req.body;

    if (!userId || !paymentIntentId || !amount) {
      return res.status(400).json({ error: "Faltan datos obligatorios." });
    }

    const newPayment = new Payment({
      userId,
      paymentIntentId,
      amount,
      status: "pending",
    });

    await newPayment.save();
    res.json({ message: "Detalles de pago guardados exitosamente." });
  } catch (error) {
    console.error("⚠️ Error al guardar pago:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createPaymentIntent, savePaymentDetails };

