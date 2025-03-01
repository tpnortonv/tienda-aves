const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const createPaymentIntent = async (amount) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'clp', // Cambia la moneda a CLP
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return paymentIntent;
  } catch (error) {
    throw new Error('Error al crear el PaymentIntent: ' + error.message);
  }
};

module.exports = {
  createPaymentIntent,
};