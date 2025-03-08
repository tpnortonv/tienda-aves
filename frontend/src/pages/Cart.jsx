import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart } = useContext(CartContext);  // Asegúrate de acceder correctamente a cart
  const { user } = useContext(AuthContext);

  // Verificar si `cart` es un array y no está vacío
  if (!Array.isArray(cart) || cart.length === 0) {
    return (
      <div className="cart">
        <h2>Carrito de Compras</h2>
        <p>Tu carrito está vacío</p>
      </div>
    );
  }

  return (
    <div className="cart">
      <h2>Carrito de Compras</h2>
      <ul>
        {cart.map((item) => (
          <li key={`${item.productId._id}-${item.quantity}`}>
            <img
              src={item.productId.imageUrl}
              alt={item.productId.name}
              style={{ width: "100px", height: "100px" }}  // Ajusta las imágenes según desees
            />
            <div>
              <h3>{item.productId.name}</h3>
              <p>${item.productId.price}</p>
              <p>Cantidad de personas: {item.quantity}</p>
              <button
                onClick={() => {
                  if (item.productId && item.productId._id) { // 🔥 Verificamos antes de eliminar
                    console.log(`🗑️ Eliminando producto: ${item.productId._id}`);
                    removeFromCart(item.productId._id);
                  } else {
                    console.error("❌ Error: `productId` es undefined, no se puede eliminar.");
                  }
                }}
              >
                Eliminar
              </button>

            </div>
          </li>
        ))}
      </ul>
      <div className="checkout">
        <Link to="/checkout" className="btn">
          Ir a pagar
        </Link>
      </div>
    </div>
  );
};

export default Cart;












