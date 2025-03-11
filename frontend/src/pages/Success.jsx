import React, { useEffect, useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const { clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    clearCart(); // 🔄 Limpiar el carrito SOLO DESPUÉS de llegar a la página de éxito
  }, []);

  return (
    <div className="success">
      <h2>🎉 ¡Pago exitoso!</h2>
      <p>Gracias por tu compra. Te enviaremos un correo con los detalles.</p>
      <button onClick={() => navigate("/")}>Volver al inicio</button>
    </div>
  );
};

export default Success;
