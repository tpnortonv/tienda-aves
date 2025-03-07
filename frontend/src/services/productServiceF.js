import api from "./apiF";

// Obtener todos los productos
export const getProducts = async () => {
  const response = await api.get("/products");
  return response.data;
};

// Obtener producto por ID
export const getProductById = async (productId) => {
  const response = await api.get(`/products/${productId}`);
  return response.data;
};

// Crear un nuevo producto (requiere autenticación)
export const createProduct = async (productData, token) => {
  const response = await api.post("/products/add", productData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Actualizar un producto (requiere autenticación)
export const updateProduct = async (productId, productData, token) => {
  const response = await api.put(`/products/${productId}`, productData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Eliminar un producto (requiere autenticación)
export const deleteProduct = async (productId, token) => {
  const response = await api.delete(`/products/${productId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};


