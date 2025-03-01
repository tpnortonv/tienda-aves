const { registerUser, loginUser } = require('./api'); // Cambiar import por require

// Registro de usuario
const register = async (userData) => {
  try {
    const data = await registerUser(userData);
    // Aquí podrías guardar el token en el localStorage o en el contexto
    localStorage.setItem('authToken', data.token); // Guarda el token
    return data;
  } catch (error) {
    throw new Error('Error al registrar usuario: ' + error.response.data.message);
  }
};

// Iniciar sesión de usuario
const login = async (userData) => {
  try {
    const data = await loginUser(userData);
    // Aquí también puedes guardar el token en el localStorage o en el contexto
    localStorage.setItem('authToken', data.token); // Guarda el token
    return data;
  } catch (error) {
    throw new Error('Error al iniciar sesión: ' + error.response.data.message);
  }
};

// Obtener el token de autenticación desde el localStorage
const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

// Cerrar sesión (eliminar token)
const logout = () => {
  localStorage.removeItem('authToken');
};

module.exports = { register, login, getAuthToken, logout }; // Cambiar export por module.exports