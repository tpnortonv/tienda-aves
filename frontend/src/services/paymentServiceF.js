import apiF from "./apiF";

export const createPaymentIntent = async (paymentData) => {
  try {
    const response = await apiF.post("/payments/create-payment-intent", paymentData);
    return response.data;
  } catch (error) {
    console.error("❌ Error al crear intento de pago:", error.response?.data || error.message);
    throw error;
  }
};

export const savePaymentDetails = async (paymentDetails) => {
  try {
    const response = await apiF.post("/payments/save-payment-details", paymentDetails);
    return response.data;
  } catch (error) {
    console.error("❌ Error al guardar detalles del pago:", error.response?.data || error.message);
    throw error;
  }
};


