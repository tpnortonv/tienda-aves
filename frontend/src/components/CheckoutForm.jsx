import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { createPaymentIntent, savePaymentDetails } from "../services/paymentServiceF";

const CheckoutForm = ({ user, cart }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // Estado para manejar mensajes de error

  const handlePayment = async (e) => {
    e.preventDefault();
  
    if (!stripe || !elements) {
      return;
    }
  
    setLoading(true);
  
    const totalAmount = cart.reduce((sum, item) => sum + item.quantity * item.productId.price, 0);
    console.log("Total Amount:", totalAmount);
  
    try {
      // Crear un método de pago con Stripe
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement),
      });
  
      if (error) {
        console.log("Error al crear paymentMethod:", error);
        setErrorMessage(error.message);
        setLoading(false);
        return;
      }
  
      console.log("paymentMethod creado correctamente:", paymentMethod);
  
      // Crear PaymentIntent en el backend
      const { clientSecret, paymentIntentId } = await createPaymentIntent(
        totalAmount,
        user.email,
        user.name,
        paymentMethod.id
      );
  
      console.log("Client Secret recibido:", clientSecret);
      console.log("PaymentIntent ID recibido:", paymentIntentId);
  
      if (!clientSecret) {
        setErrorMessage("No se pudo obtener el clientSecret.");
        setLoading(false);
        return;
      }
  
      // Verificar que paymentIntentId no esté vacío
      if (!paymentIntentId) {
        setErrorMessage("El PaymentIntent ID no está definido.");
        setLoading(false);
        return;
      }
  
      // Verificar que stripe esté cargado
      if (!stripe) {
        setErrorMessage("Stripe no está cargado.");
        setLoading(false);
        return;
      }
  
      // Obtener el estado del PaymentIntent
      console.log('Recuperando PaymentIntent con ID:', paymentIntentId);
      const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
      console.log('Estado del PaymentIntent:', paymentIntent.status);
  
      // Si ya está confirmado, no intentamos confirmarlo de nuevo
      if (paymentIntent.status === 'succeeded') {
        alert("El pago ya ha sido procesado.");
        setLoading(false);
        return;
      }
  
      // Confirmar el pago con Stripe
      const { error: confirmError, paymentIntentConfirmed } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id,
      });
  
      if (confirmError) {
        console.log("Error en la confirmación del pago:", confirmError);
        setErrorMessage(confirmError.message);
        setLoading(false);
        return;
      }
  
      console.log("PaymentIntent confirmado:", paymentIntentConfirmed);
  
      if (paymentIntentConfirmed.status === "succeeded") {
        // Si el pago es exitoso, guarda los detalles
        await savePaymentDetails(user.id, paymentIntentId, totalAmount);
        alert("Pago realizado con éxito");
        navigate("/"); // Redirige al inicio
      }
  
    } catch (error) {
      setErrorMessage("Hubo un error al procesar el pago. Intenta nuevamente.");
      console.error("Error en el proceso de pago:", error);
      setLoading(false);
    }
  };
  
  return (
    <form className="checkout-form" onSubmit={handlePayment}>
      <h2>Pago</h2>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <CardElement />
      <button type="submit" disabled={loading || !stripe}>
        {loading ? "Procesando..." : "Pagar"}
      </button>
    </form>
  );
};

export default CheckoutForm;





