import React, { useState, useEffect, useContext } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import { createPaymentIntent, savePaymentDetails } from "../services/paymentServiceF";
import { CartContext } from "../context/CartContext";

import { Box, Button, Typography, Card, CardContent, CircularProgress, Stack } from "@mui/material";

const CheckoutForm = ({ user, totalAmount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const { clearCart } = useContext(CartContext);
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
      setIsProcessing(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setIsProcessing(false);
      return;
    }

    console.log("💳 Confirmando pago en Stripe...");
    const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card: cardElement },
    });

    if (error) {
      setMessage(error.message);
      setIsProcessing(false);
      return;
    }

    console.log("✅ Pago confirmado:", paymentIntent);

    if (paymentIntent.status === "succeeded") {
      try {
        await savePaymentDetails(user.id, paymentIntent.id, totalAmount);
        setMessage("Pago realizado con éxito 🎉");
        setTimeout(() => navigate("/success"), 2000);
      } catch (error) {
        setMessage("Pago confirmado, pero hubo un error guardándolo.");
      }
    } else {
      setMessage("Hubo un problema con la confirmación del pago.");
    }

    setIsProcessing(false);
  };

  return (
    <Card className="payment-card">
      <CardContent>
        <Typography className="payment-title">
          Introduce los datos de tu tarjeta
        </Typography>

        <Box component="form" className="payment-form" onSubmit={handleSubmit}>
          <Box className="card-input-container">
            <CardElement />
          </Box>

          <Stack className="payment-actions">
            <Button
              type="submit"
              className="payment-button"
              disabled={!stripe || !elements || isProcessing}
            >
              {isProcessing ? <CircularProgress size={24} className="payment-spinner" /> : "Pagar"}
            </Button>

            {message && <Typography className="payment-error">{message}</Typography>}
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CheckoutForm;















