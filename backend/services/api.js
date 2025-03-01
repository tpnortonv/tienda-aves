const axios = require('axios'); // Cambiar import por require

// Configuración base para las solicitudes
const API_URL = 'http://localhost:5000/api'; // Aquí debes poner la URL de tu servidor

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Funciones para interactuar con el backend

// Autenticación
const registerUser = async (userData) => {
  const response = await api.post('/auth/register', userData);
  return response.data;
};

const loginUser = async (userData) => {
  const response = await api.post('/auth/login', userData);
  return response.data;
};

// Productos
const getProducts = async () => {
  const response = await api.get('/products');
  return response.data;
};

const getProductById = async (productId) => {
  const response = await api.get(`/products/${productId}`);
  return response.data;
};

// Pagos
const createPaymentIntent = async (amount) => {
  const response = await api.post('/payments/create-payment-intent', { amount });
  return response.data;
};

// Carrito

// Crear o actualizar el carrito
const createOrUpdateCart = async (userId, productId, quantity) => {
  const response = await api.post('/cart', { userId, productId, quantity });
  return response.data;
};

// Obtener el carrito de un usuario
const getCart = async (userId) => {
  const response = await api.get(`/cart/${userId}`);
  return response.data;
};

// Eliminar un producto del carrito
const removeProductFromCart = async (userId, productId) => {
  const response = await api.delete(`/cart/${userId}/${productId}`);
  return response.data;
};

// Exportar funciones
module.exports = {
  registerUser, 
  loginUser, 
  getProducts, 
  getProductById, 
  createPaymentIntent, 
  createOrUpdateCart,
  getCart,
  removeProductFromCart
}; // Cambiar export por module.exports

