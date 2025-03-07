import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  if (!product) {
    return <p>Producto no disponible</p>;
  }

  return (
    <div className="product-card">
      <img src={product.imageUrl || "/placeholder.jpg"} alt={product.name || "Producto"} />
      <h3>{product.name || "Producto sin nombre"}</h3>
      <p>{product.description || "Sin descripción"}</p>
      <p className="price">${product.price !== undefined ? product.price : "N/A"}</p>
      <Link to={`/product/${product._id}`} className="btn">Ver más</Link>
    </div>
  );
};

export default ProductCard;






