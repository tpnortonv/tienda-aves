import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart, addToCart } = useContext(CartContext);
  const [localCart, setLocalCart] = useState(cart);
  const navigate = useNavigate();

  // 🔹 Formatear precios con punto para los miles
  const formatPrice = (price) => {
    return price ? price.toLocaleString("es-CL") : "0";
  };

  // 🔹 Control de cantidad con actualización local
  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) return; // Evitar cantidades menores a 1

    // 🔥 Actualizamos localmente para evitar parpadeos
    const updatedCart = localCart.map((item) =>
      item.productId._id === productId ? { ...item, quantity: newQuantity } : item
    );
    setLocalCart(updatedCart);

    // 🔄 Enviamos la actualización al backend
    addToCart(productId, newQuantity);
  };

  // 🔹 Eliminar producto con actualización inmediata
  const handleRemoveFromCart = (productId) => {
    // 🔥 Eliminamos localmente para evitar parpadeos
    const updatedCart = localCart.filter((item) => item.productId._id !== productId);
    setLocalCart(updatedCart);

    // 🔄 Luego, enviamos la petición al backend
    removeFromCart(productId);
  };

  // 🔹 Calcular subtotal del carrito
  const subtotal = localCart.reduce(
    (acc, item) => acc + (item.productId?.price || 0) * item.quantity,
    0
  );

  return (
    <div className="cart">
      <h2>Carrito de Compras</h2>

      {localCart.length === 0 ? (
        <p class="carrito-vacio">¡Esta vacío 🥺! Encuentra la especie que buscas en Servicios</p>
      ) : (
        <>
          <ul>
            {localCart.map((item) => {
              const { productId } = item;
              if (!productId) return null;

              return (
                <li key={productId._id}>
                  <img
                    src={productId.imageUrl || "/src/assets/images/placeholder.png"}
                    alt={productId.name || "Producto"}
                    onError={(e) => (e.target.src = "/src/assets/images/placeholder.png")}
                  />
                  <div>
                    <h3>{productId.name || "Producto sin nombre"}</h3>

                    {/* 🔹 Controles de cantidad */}
                    <div className="quantity-controls">
                      <button
                        onClick={() => handleQuantityChange(productId._id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span>{item.quantity} personas</span>
                      <button onClick={() => handleQuantityChange(productId._id, item.quantity + 1)}>
                        +
                      </button>
                    </div>

                    <p>Total: <strong>${formatPrice((productId.price || 0) * item.quantity)}</strong></p>

                    {/* 🔹 Botón para eliminar */}
                    <button className="remove-btn" onClick={() => handleRemoveFromCart(productId._id)}>
                      Eliminar
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>

          {/* 🔹 Mostrar subtotal y checkout SOLO si hay productos en el carrito */}
          {subtotal > 0 && (
            <>
              <div className="subtotal">
                <span>Subtotal: ${formatPrice(subtotal)}</span>
              </div>
              <div className="checkout">
                <button className="btn" onClick={() => navigate("/checkout")}>
                  Ir a pagar
                </button>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Cart;

















