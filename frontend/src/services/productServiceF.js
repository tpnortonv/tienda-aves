import apiF from './apiF';

export const getAllProducts = async () => {
  const response = await apiF.get('/products');
  return response.data;
};

export const getProductById = async (productId) => {
  const response = await apiF.get(`/products/${productId}`);
  return response.data;
};
