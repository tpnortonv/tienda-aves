import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

// Registro de usuario
export const register = async (name, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      name,
      email,
      password,
    });
    localStorage.setItem("token", response.data.token);
    return response.data;
  } catch (error) {
    console.error("❌ Error al registrar usuario:", error.response?.data || error.message);
    return null;
  }
};

// Inicio de sesión
export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email,
      password,
    });
    localStorage.setItem("token", response.data.token);
    return response.data;
  } catch (error) {
    console.error("❌ Error al iniciar sesión:", error.response?.data || error.message);
    return null;
  }
};

// Cierre de sesión
export const logout = () => {
  localStorage.removeItem("token");
};

// Obtener usuario autenticado desde token JWT
export const getCurrentUser = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return { _id: payload.userId, email: payload.email, name: payload.name };
  } catch (error) {
    console.error("❌ Error al decodificar token:", error);
    return null;
  }
};

// Obtener token almacenado
export const getToken = () => {
  return localStorage.getItem("token");
};



