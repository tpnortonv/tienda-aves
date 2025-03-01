/*import { getAuthToken } from './authService';
import { api } from './api';

// Obtener los productos del carrito del backend
const getCart = async () => {
  const token = getAuthToken();
  try {
    const response = await api.get('/cart', {
      headers: {
        'x-auth-token': token, // Enviar el token en las cabeceras
      },
    });
    return response.data; // Retorna los datos del carrito
  } catch (error) {
    throw new Error('Error al obtener el carrito: ' + error.response?.data?.message || error.message);
  }
};

// Agregar un producto al carrito
const addToCart = async (productId, quantity) => {
  const token = getAuthToken();
  try {
    const response = await api.post(
      '/cart',
      { productId, quantity },
      {
        headers: {
          'x-auth-token': token, // Enviar el token en las cabeceras
        },
      }
    );
    return response.data; // Retorna la respuesta después de agregar el producto
  } catch (error) {
    throw new Error('Error al agregar al carrito: ' + error.response?.data?.message || error.message);
  }
};

// Eliminar un producto del carrito
const removeFromCart = async (productId) => {
  const token = getAuthToken();
  try {
    const response = await api.delete(`/cart/${productId}`, {
      headers: {
        'x-auth-token': token, // Enviar el token en las cabeceras
      },
    });
    return response.data; // Retorna la respuesta después de eliminar el producto
  } catch (error) {
    throw new Error('Error al eliminar del carrito: ' + error.response?.data?.message || error.message);
  }
};

// Actualizar la cantidad de un producto en el carrito
const updateQuantity = async (productId, quantity) => {
  const token = getAuthToken();
  try {
    const response = await api.put(
      `/cart/${productId}`,
      { quantity },
      {
        headers: {
          'x-auth-token': token, // Enviar el token en las cabeceras
        },
      }
    );
    return response.data; // Retorna la respuesta después de actualizar la cantidad
  } catch (error) {
    throw new Error('Error al actualizar la cantidad en el carrito: ' + error.response?.data?.message || error.message);
  }
};

export { getCart, addToCart, removeFromCart, updateQuantity };
import { getAuthToken } from './authService';
import { api } from './api';

// Obtener los productos del carrito del backend
const getCart = async () => {
  const token = getAuthToken();
  try {
    const response = await api.get('/cart', {
      headers: {
        'x-auth-token': token, // Enviar el token en las cabeceras
      },
    });
    return response.data; // Retorna los datos del carrito
  } catch (error) {
    throw new Error('Error al obtener el carrito: ' + error.response?.data?.message || error.message);
  }
};

// Agregar un producto al carrito
const addToCart = async (productId, quantity) => {
  const token = getAuthToken();
  try {
    const response = await api.post(
      '/cart',
      { productId, quantity },
      {
        headers: {
          'x-auth-token': token, // Enviar el token en las cabeceras
        },
      }
    );
    return response.data; // Retorna la respuesta después de agregar el producto
  } catch (error) {
    throw new Error('Error al agregar al carrito: ' + error.response?.data?.message || error.message);
  }
};

// Eliminar un producto del carrito
const removeFromCart = async (productId) => {
  const token = getAuthToken();
  try {
    const response = await api.delete(`/cart/${productId}`, {
      headers: {
        'x-auth-token': token, // Enviar el token en las cabeceras
      },
    });
    return response.data; // Retorna la respuesta después de eliminar el producto
  } catch (error) {
    throw new Error('Error al eliminar del carrito: ' + error.response?.data?.message || error.message);
  }
};

// Actualizar la cantidad de un producto en el carrito
const updateQuantity = async (productId, quantity) => {
  const token = getAuthToken();
  try {
    const response = await api.put(
      `/cart/${productId}`,
      { quantity },
      {
        headers: {
          'x-auth-token': token, // Enviar el token en las cabeceras
        },
      }
    );
    return response.data; // Retorna la respuesta después de actualizar la cantidad
  } catch (error) {
    throw new Error('Error al actualizar la cantidad en el carrito: ' + error.response?.data?.message || error.message);
  }
};

export { getCart, addToCart, removeFromCart, updateQuantity };*/
