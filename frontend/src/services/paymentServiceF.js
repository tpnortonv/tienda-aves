import apiF from './apiF';

export const createPaymentIntent = async (amount, email, name, paymentMethodId) => {
  const response = await apiF.post('/payments/create-payment-intent', {
    amount,
    email,
    name,
    paymentMethodId,
  });
  return response.data;
};

export const savePaymentDetails = async (userId, paymentIntentId, amount) => {
  const response = await apiF.post('/payments/save-payment-details', {
    userId,
    paymentIntentId,
    amount,
  });
  return response.data;
};
