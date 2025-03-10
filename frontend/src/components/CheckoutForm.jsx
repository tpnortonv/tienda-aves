import React, { useState, useEffect } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom"; // 🚀 Importar useNavigate
import { createPaymentIntent, savePaymentDetails } from "../services/paymentServiceF";

const CheckoutForm = ({ user, totalAmount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate(); // 🔄 Hook para redirigir
  const [clientSecret, setClientSecret] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!user || totalAmount <= 0) {
      console.warn("⚠️ Usuario inválido o monto incorrecto:", { user, totalAmount });
      return;
    }

    const fetchPaymentIntent = async () => {
      try {
        console.log("🔎 Enviando a createPaymentIntent:", { amount: totalAmount, userId: user.id });
        const data = await createPaymentIntent(totalAmount, user.id);
        setClientSecret(data.clientSecret);
      } catch (error) {
        console.error("❌ Error al crear PaymentIntent:", error);
        setMessage("Error al procesar el pago.");
      }
    };

    fetchPaymentIntent();
  }, [user, totalAmount]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsProcessing(true);
    setMessage("");

    if (!stripe || !elements || !clientSecret) {
      console.error("⚠️ Stripe no está listo o falta el clientSecret.");
      setIsProcessing(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      console.error("⚠️ No se encontró el CardElement.");
      setIsProcessing(false);
      return;
    }

    console.log("💳 Confirmando pago en Stripe...");
    const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card: cardElement },
    });

    if (error) {
      console.error("❌ Error al confirmar el pago:", error.message);
      setMessage(error.message);
      setIsProcessing(false);
      return;
    }

    console.log("✅ Pago confirmado en Stripe:", paymentIntent);

    if (paymentIntent.status === "succeeded") {
      try {
        await savePaymentDetails(user.id, paymentIntent.id, totalAmount);
        console.log("✅ Pago guardado en la base de datos.");
        setMessage("Pago realizado con éxito 🎉");

        // 🔄 Redirigir al usuario a la página de éxito
        setTimeout(() => {
          navigate("/success");
        }, 2000); // Pequeño retraso para mostrar el mensaje antes de redirigir
      } catch (error) {
        console.error("❌ Error al guardar pago en la BD:", error);
        setMessage("Pago confirmado, pero hubo un error guardándolo.");
      }
    } else {
      setMessage("Hubo un problema con la confirmación del pago.");
    }

    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Introduce los datos de tu tarjeta</h3>
      <CardElement />
      <button type="submit" disabled={!stripe || !elements || isProcessing}>
        {isProcessing ? "Procesando..." : "Pagar"}
      </button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default CheckoutForm;













