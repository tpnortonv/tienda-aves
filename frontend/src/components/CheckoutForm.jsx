import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPaymentIntent, savePaymentDetails } from "../services/paymentServiceF";

const CheckoutForm = ({ user, cart }) => {
  const [paymentMethodId, setPaymentMethodId] = useState("");
  const navigate = useNavigate();

  const handlePayment = async (e) => {
    e.preventDefault();
    try {
      const totalAmount = cart.reduce((sum, item) => sum + item.quantity * item.productId.price, 0);
      const { clientSecret, paymentIntentId } = await createPaymentIntent(totalAmount, user.email, user.name, paymentMethodId);
      
      await savePaymentDetails(user.id, paymentIntentId, totalAmount);
      alert("Pago realizado con éxito");
      navigate("/");
    } catch (error) {
      console.error("Error en el pago:", error);
    }
  };

  return (
    <form className="checkout-form" onSubmit={handlePayment}>
      <h2>Pago</h2>
      <input type="text" placeholder="ID de método de pago" value={paymentMethodId} onChange={(e) => setPaymentMethodId(e.target.value)} required />
      <button type="submit">Pagar</button>
    </form>
  );
};

export default CheckoutForm;




