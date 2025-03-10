import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import CheckoutForm from "../components/CheckoutForm";

const Checkout = () => {
  const { user } = useContext(AuthContext);
  const { cart } = useContext(CartContext);

  console.log("🛒 Estado del carrito en Checkout.jsx:", cart);

  const totalAmount = cart.reduce((sum, item) => {
    if (!item.productId || typeof item.productId.price !== "number") {
      console.warn("⚠️ Producto inválido en el carrito:", item);
      return sum;
    }
    return sum + item.quantity * item.productId.price;
  }, 0);

  console.log("💰 Total calculado:", totalAmount);

  return (
    <div className="checkout">
      <h2>Finalizar compra</h2>

      {user && cart.length > 0 ? (
        <>
          <div className="order-summary">
            <h3>Resumen de tu pedido</h3>
            <ul>
              {cart.map((item) => (
                <li key={item.productId._id}>
                  <span>{item.quantity} x {item.productId.name}</span>
                  <strong>${(item.quantity * (item.productId?.price || 0)).toLocaleString("es-CL")}</strong>
                </li>
              ))}
            </ul>
            <div className="total">
              <h3>Total: ${totalAmount.toLocaleString("es-CL")}</h3>
            </div>
          </div>

          <CheckoutForm user={user} cart={cart} totalAmount={totalAmount} />
        </>
      ) : (
        <p>Tu carrito está vacío o no has iniciado sesión.</p>
      )}
    </div>
  );
};

export default Checkout;




