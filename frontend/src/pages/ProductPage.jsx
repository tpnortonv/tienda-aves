import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../services/productServiceF";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch (error) {
        console.error("Error al obtener producto:", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <p>Cargando producto...</p>;
  if (user === undefined) return <p>Cargando usuario...</p>;

  const handleAddToCart = () => {
    if (!user || !user.id || !user.token) {
      alert("⚠️ Debes iniciar sesión para agregar productos al carrito.");
      return;
    }

    console.log(`🛒 Agregando producto al carrito: ${product._id} para el usuario ${user.id}`);
    addToCart(product._id, 1);
  };

  return (
    <div className="product-page">
      <img src={product.imageUrl || "/placeholder.jpg"} alt={product.name || "Producto"} />
      <h2>{product.name || "Producto sin nombre"}</h2>
      <p>{product.description || "Sin descripción"}</p>
      <p className="price">${product.price !== undefined ? product.price : "N/A"}</p>
      {user && user.id && user.token ? (
        <button onClick={handleAddToCart}>Agregar al carrito</button>
      ) : (
        <p>Inicia sesión para comprar</p>
      )}
    </div>
  );
};

export default ProductPage;












