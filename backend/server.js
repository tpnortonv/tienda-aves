// Cargar las variables de entorno al inicio del archivo
const dotenv = require('dotenv');
dotenv.config(); // Esto debe estar antes de cualquier otro código

// Importar dependencias
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const cartRoutes = require('./routes/cartRoutes');

// Crear la aplicación Express
const app = express();

// Middlewares
app.use(cors()); // Habilitar CORS
app.use(express.json()); // Para poder parsear los datos JSON en las peticiones

// Rutas
app.use('/api/auth', authRoutes); // Ruta para autenticación
app.use('/api/products', productRoutes); // Ruta para productos
app.use('/api/payments', paymentRoutes); // Ruta para pagos
app.use('/api/cart', cartRoutes); 

// Conectar a MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Conectado a MongoDB');
  })
  .catch((error) => {
    console.error('Error al conectar con MongoDB', error);
  });

// Verificar si la clave secreta de Stripe está cargada correctamente
if (!process.env.STRIPE_SECRET_KEY) {
  console.error('La clave secreta de Stripe no está configurada correctamente');
  process.exit(1); // Terminar la aplicación si la clave de Stripe no está disponible
}

// Iniciar el servidor en el puerto configurado o en el puerto 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});