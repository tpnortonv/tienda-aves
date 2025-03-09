import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";

const ProductPage = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const [quantity, setQuantity] = useState(1);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); // 🔥 Estado para el mensaje

  if (!product) return <p>Producto no disponible</p>;
  if (user === undefined) return <p>Cargando usuario...</p>;

  const handleAddToCart = () => {
    if (!user || !user.id || !user.token) {
      alert("⚠️ Debes iniciar sesión para agregar productos al carrito.");
      return;
    }

    addToCart(product._id, quantity); // 🔥 Agrega la cantidad seleccionada

    // 🔥 Mostrar mensaje de éxito y ocultarlo después de 3 segundos
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  return (
<div className="product-page">
  <h2>{product.name || "Producto sin nombre"}</h2>
  <img src={product.imageUrl || "/placeholder.jpg"} alt={product.name || "Producto"} />
  <p>{product.description || "Sin descripción"}</p>
  <p className="price">${product.price?.toLocaleString("es-CL")} por persona</p> {/* 🔥 Se asegura que el precio exista */}

      {/* 🔥 Contenedor del botón y los botones de cantidad */}
      <div className="cart-controls">
        {/* 🔥 Mensaje de éxito sobre el botón */}
        {showSuccessMessage && <p className="success-message">✅ Agregado al carrito exitosamente</p>}

        <button className="quantity-btn" onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
        <button className="add-to-cart-btn" onClick={handleAddToCart}>
          Agregar {quantity} {quantity === 1 ? "persona" : "personas"} al carrito
        </button>
        <button className="quantity-btn" onClick={() => setQuantity(quantity + 1)}>+</button>
      </div>

      {!user && <p>Inicia sesión para comprar</p>}
    </div>
  );
};

export default ProductPage;
















