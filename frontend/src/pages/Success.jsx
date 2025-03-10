import React from "react";
import { Link } from "react-router-dom";

const Success = () => {
  return (
    <div className="success-page">
      <h2>¡Pago exitoso! 🎉</h2>
      <p>Tu compra ha sido confirmada.</p>
      <Link to="/">Volver al inicio</Link>
    </div>
  );
};

export default Success;
