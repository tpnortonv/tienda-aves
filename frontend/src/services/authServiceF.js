import api from "./apiF";

export const register = async (userData) => {
  try {
    const response = await api.post("/auth/register", userData);
    console.log("✅ Usuario registrado:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error al registrar usuario:", error.response?.data || error);
    throw error;
  }
};

export const login = async (userData) => {
  try {
    const response = await api.post("/auth/login", userData);
    console.log("✅ Usuario autenticado:", response.data);

    if (!response.data.token) {
      console.error("❌ Error: No se recibió un token en la respuesta del login");
      return null;
    }

    return response.data;
  } catch (error) {
    console.error("❌ Error al iniciar sesión:", error.response?.data || error);
    throw error;
  }
};

// 🔥 Corregido: Se agrega la función `logout`
export const logout = () => {
  console.log("🗑️ Eliminando datos de sesión...");
  localStorage.removeItem("authToken");
  localStorage.removeItem("userId");
  localStorage.removeItem("userEmail");
};




























