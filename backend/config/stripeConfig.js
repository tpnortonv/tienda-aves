const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);  // Usando la clave secreta de tu archivo .env
module.exports = stripe;


