import { createContext, useContext, useState, useEffect } from "react";
import { login, logout, register, getCurrentUser } from "../services/authServiceF";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  const handleLogin = async (email, password) => {
    const response = await login(email, password);
    if (response && response.user) {
      setUser(response.user);
      return response.user;
    } else {
      throw new Error("Error al iniciar sesión");
    }
  };

  const handleRegister = async (name, email, password) => {
    const response = await register(name, email, password);
    if (response && response.user) {
      setUser(response.user);
      return response.user;
    } else {
      throw new Error("Error al registrar usuario");
    }
  };

  const handleLogout = () => {
    logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, handleLogin, handleRegister, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
















