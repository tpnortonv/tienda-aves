import api from "./apiF";

// Obtener el carrito del usuario
export const getCart = async (userId, token) => {
  try {
    const response = await api.get(`/cart/${userId}`, {
      headers: {
        "x-auth-token": token, // 🔹 Debe coincidir con el backend
      },
    });
    return response.data;
  } catch (error) {
    console.error("❌ Error en `getCart`:", error.response?.data || error.message);
    throw error;
  }
};

// Agregar o actualizar un producto en el carrito
export const createOrUpdateCart = async (userId, productId, quantity, token) => {
  try {
    const response = await api.post(
      "/cart",
      { userId, productId, quantity },
      {
        headers: {
          "x-auth-token": token, // 🔹 Enviando correctamente el token
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("❌ Error en `createOrUpdateCart`:", error.response?.data || error.message);
    throw error;
  }
};

// Eliminar un producto del carrito
export const removeProductFromCart = async (userId, productId, token) => {
  try {
    const response = await api.delete(`/cart/${userId}/${productId}`, {
      headers: {
        "x-auth-token": token, // 🔹 Header en minúsculas
      },
    });
    return response.data;
  } catch (error) {
    console.error("❌ Error en `removeProductFromCart`:", error.response?.data || error.message);
    throw error;
  }
};




























