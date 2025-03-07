import React, { createContext, useState, useEffect } from "react";
import { register, login, logout } from "../services/authServiceF";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(undefined); // Evita errores iniciales

  useEffect(() => {
    const token = localStorage.getItem("authToken") || null;
    const userId = localStorage.getItem("userId") || null;
    const userEmail = localStorage.getItem("userEmail") || null;

    console.log("🔍 Verificando sesión en localStorage:", { token, userId, userEmail });

    if (token && userId && userEmail) {
      setUser({ id: userId, email: userEmail, token });
    } else {
      setUser(null);
    }
  }, []);

  const handleRegister = async (userData) => {
    try {
      const data = await register(userData);
      if (data && data.token) {
        console.log("✅ Usuario registrado y guardado:", data);
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("userId", data.user.id);
        localStorage.setItem("userEmail", data.user.email);
        setUser({ id: data.user.id, email: data.user.email, token: data.token });
      } else {
        console.warn("⚠️ No se recibió un token en el registro");
      }
    } catch (error) {
      console.error("❌ Error en el registro:", error);
    }
  };

  const handleLogin = async (userData) => {
    try {
      const data = await login(userData);
      if (data && data.token) {
        console.log("✅ Usuario autenticado y guardado:", data);
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("userId", data.user.id);
        localStorage.setItem("userEmail", data.user.email);
        setUser({ id: data.user.id, email: data.user.email, token: data.token });
      } else {
        console.warn("⚠️ No se recibió un token en el login");
      }
    } catch (error) {
      console.error("❌ Error en el login:", error);
    }
  };

  const handleLogout = () => {
    console.log("🚀 Cerrando sesión...");
    logout();
    localStorage.removeItem("authToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("userEmail");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, handleRegister, handleLogin, handleLogout }}>
      {user === undefined ? <p>Cargando usuario...</p> : children}
    </AuthContext.Provider>
  );
};





































