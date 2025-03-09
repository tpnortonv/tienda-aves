import React from "react";

const ProductCard = ({ product, onClick }) => {
  if (!product) {
    return <p>Producto no disponible</p>;
  }

  const formatPrice = (price) => {
    return price.toLocaleString("es-CL");
  };

  return (
    <div className="product-card">
      <h3>{product.name || "Producto sin nombre"}</h3>
      <img src={product.imageUrl || "/placeholder.jpg"} alt={product.name || "Producto"} />
      <button className="view-more-btn" onClick={onClick}>¡Quiero verlo!</button>
    </div>
  );
};

export default ProductCard;






