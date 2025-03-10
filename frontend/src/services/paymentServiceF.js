import api from "./apiF";

export const createPaymentIntent = async (amount, userId) => {
  try {
    console.log("🔎 Enviando a createPaymentIntent:", { amount, userId });

    const response = await api.post("/payments/create-payment-intent", {
      amount,
      userId,
    });

    console.log("✅ PaymentIntent creado:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error al crear PaymentIntent:", error.response?.data || error);
    throw error;
  }
};

export const savePaymentDetails = async (userId, paymentIntentId, amount) => {
  try {
    const response = await api.post("/payments/save-payment-details", {
      userId,
      paymentIntentId,
      amount,
    });

    console.log("✅ Pago guardado en la base de datos.");
    return response.data;
  } catch (error) {
    console.error("❌ Error al guardar pago:", error.response?.data || error);
    throw error;
  }
};





