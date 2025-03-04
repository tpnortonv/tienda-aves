const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Payment = require('../models/Payment'); // Importar el modelo de Payment
const User = require('../models/AuthUser'); // Importar el modelo de usuario

// Crear un pago (Payment Intent) y asociar usuario con Stripe
const createPaymentIntent = async (req, res) => {
  const { amount, email, name, paymentMethodId } = req.body; // 🔹 Agregamos `name`

  try {
    // Buscar si el usuario ya existe en MongoDB
    let user = await User.findOne({ email });

    let customerId = user?.customerId; // Obtener el customerId si existe

    // Si el usuario no tiene un customerId, lo creamos en Stripe con `name`
    if (!customerId) {
      const customer = await stripe.customers.create({
        name, // 🔹 Ahora se guarda el nombre en Stripe
        email,
        payment_method: paymentMethodId,
        invoice_settings: { default_payment_method: paymentMethodId },
      });

      customerId = customer.id; // Guardamos el ID del cliente en Stripe

      // Si el usuario ya existe en MongoDB, actualizamos su customerId
      if (user) {
        user.customerId = customerId;
        await user.save();
      }
    }

    // Crear un paymentIntent con el monto especificado y asociarlo al customerId en Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount, // Stripe maneja los montos en centavos
      currency: 'clp', // Moneda CLP (pesos chilenos)
      customer: customerId, // 🔹 Asociamos el pago al cliente en Stripe
      payment_method: paymentMethodId,
      confirm: true,
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: "never"
      }
    });

    // Retornar el client secret para completar el pago en el frontend
    res.status(200).json({
      message: 'Intento de pago creado exitosamente',
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      customerId: customerId,
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

