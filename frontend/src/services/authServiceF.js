import apiF from './apiF';

export const register = async (userData) => {
  const response = await apiF.post('/auth/register', userData);
  return response.data;
};

export const login = async (userData) => {
  const response = await apiF.post('/auth/login', userData);
  return response.data;
};

export const verifyToken = async (token) => {
  const response = await apiF.get('/auth/verify', {
    headers: { 'x-auth-token': token },
  });
  return response.data;
};
