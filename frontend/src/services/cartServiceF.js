import axios from "axios";

const API_URL = "http://localhost:5000/api/cart";

export const getCart = async (userId) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No hay token disponible");

    const response = await axios.get(`${API_URL}/${userId}`, {
      headers: { "x-auth-token": token }, // 🔥 Cambiado aquí
    });

    return response.data;
  } catch (error) {
    console.error("❌ Error al obtener el carrito:", error.response?.data || error.message);
    throw error;
  }
};

export const addToCart = async (userId, productId, quantity = 1) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No hay token disponible");

    const response = await axios.post(
      `${API_URL}`,
      { userId, productId, quantity },
      { headers: { "x-auth-token": token } } // 🔥 Cambiado aquí
    );

    return response.data;
  } catch (error) {
    console.error("❌ Error al agregar producto al carrito:", error.response?.data || error.message);
    throw error;
  }
};

export const removeFromCart = async (userId, productId) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No hay token disponible");

    const response = await axios.delete(`${API_URL}/${userId}/${productId}`, {
      headers: { "x-auth-token": token }, // 🔥 Cambiado aquí
    });

    return response.data;
  } catch (error) {
    console.error("❌ Error al eliminar producto del carrito:", error.response?.data || error.message);
    throw error;
  }
};







