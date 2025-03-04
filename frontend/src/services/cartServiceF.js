import apiF from './apiF';

export const getCart = async (userId) => {
  const response = await apiF.get(`/cart/${userId}`);
  return response.data;
};

export const createOrUpdateCart = async (userId, productId, quantity) => {
  const response = await apiF.post('/cart', { userId, productId, quantity });
  return response.data;
};

export const removeProductFromCart = async (userId, productId) => {
  const response = await apiF.delete(`/cart/${userId}/${productId}`);
  return response.data;
};
