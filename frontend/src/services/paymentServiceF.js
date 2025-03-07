import api from "./apiF";

export const createPaymentIntent = async (amount, email, name, paymentMethodId) => {
  try {
    const response = await api.post("/payments/create-payment-intent", {
      amount,
      email,
      name,
      paymentMethodId, // Asegúrate de enviar el paymentMethodId aquí
    });
    return response.data;
  } catch (error) {
    console.error("Error al crear PaymentIntent:", error);
    throw error;
  }
};

export const savePaymentDetails = async (userId, paymentIntentId, amount) => {
  const response = await api.post("/payments/save-payment-details", {
    userId,
    paymentIntentId,
    amount,
  });
  return response.data;
};




