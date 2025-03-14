import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart, addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  // 🔹 Formatear precios con punto para los miles
  const formatPrice = (price) => (price ? price.toLocaleString("es-CL") : "0");

  const handleQuantityChange = async (productId, change) => {
    const item = cart.find((p) => p.productId._id === productId);
    if (!item) return;
  
    const newQuantity = item.quantity + change;
    if (newQuantity < 1) return; // Evita cantidades inválidas
  
    console.log(`🔄 Intentando actualizar cantidad en carrito`);
    console.log(`📌 Producto ID: ${productId}`);
    console.log(`🔢 Cantidad actual en frontend: ${item.quantity}`);
    console.log(`📥 Nueva cantidad a enviar: ${newQuantity}`);
  
    try {
      await addToCart(productId, newQuantity);
    } catch (error) {
      console.error("❌ Error al actualizar la cantidad:", error);
    }
  };  

  // 🔹 Calcular subtotal
  const subtotal = cart.reduce(
    (acc, item) => acc + (item.productId?.price || 0) * item.quantity,
    0
  );

  return (
    <div className="cart">
      <h2>Carrito de Compras</h2>

      {cart.length === 0 ? (
        <p className="carrito-vacio">¡Está vacío 🥺! Encuentra la especie que buscas en Servicios</p>
      ) : (
        <>
          <ul>
            {cart.map((item) => (
              <li key={item.productId._id}>
                <img src={item.productId.imageUrl || "/src/assets/images/placeholder.png"} alt={item.productId.name || "Producto"} />
                <div>
                  <h3>{item.productId.name || "Producto sin nombre"}</h3>

                  {/* 🔹 Controles de cantidad */}
                  <div className="quantity-controls">
                    <button
                      onClick={() => handleQuantityChange(item.productId._id, -1)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span>{item.quantity} personas</span>
                    <button
                      onClick={() => handleQuantityChange(item.productId._id, 1)}
                    >
                      +
                    </button>
                  </div>

                  <p>Total: <strong>${formatPrice((item.productId.price || 0) * item.quantity)}</strong></p>

                  {/* 🔹 Botón para eliminar */}
                  <button className="remove-btn" onClick={() => removeFromCart(item.productId._id)}>
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>

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





















