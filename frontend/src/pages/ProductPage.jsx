import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";

const ProductPage = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const [quantity, setQuantity] = useState(1);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleAddToCart = () => {
    if (!user || !user.id || !user.token) return;

    addToCart(product._id, quantity);

    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  return (
    <div className="product-page">
      <h2>{product.name || "Producto sin nombre"}</h2>
      <img src={product.imageUrl || "/placeholder.jpg"} alt={product.name || "Producto"} />
      <p>{product.description || "Sin descripción"}</p>
      <p className="price">${product.price?.toLocaleString("es-CL")} por persona</p>

      <div className="cart-controls">
        {showSuccessMessage && <p className="success-message">✅ Agregado al carrito exitosamente</p>}

        {/* 🔥 Ocultar los botones + y - si no hay sesión */}
        {user && (
          <>
            <button 
              className="quantity-btn" 
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
            >
              -
            </button>
          </>
        )}

        <button 
          className="add-to-cart-btn" 
          onClick={handleAddToCart}
          disabled={!user}
        >
          {user ? `Comprar para ${quantity} ${quantity === 1 ? "persona" : "personas"}` : "Inicia sesión para comprar"}
        </button>

        {user && (
          <>
            <button 
              className="quantity-btn" 
              onClick={() => setQuantity(quantity + 1)}
            >
              +
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductPage;



















