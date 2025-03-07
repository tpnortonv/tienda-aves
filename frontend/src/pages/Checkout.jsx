import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import CheckoutForm from "../components/CheckoutForm";

const Checkout = () => {
  const { user } = useContext(AuthContext);
  const { cart } = useContext(CartContext);

  return (
    <div className="checkout">
      <h2>Finalizar compra</h2>
      {user && cart.length > 0 ? (
        <CheckoutForm user={user} cart={cart} />
      ) : (
        <p>Tu carrito está vacío o no has iniciado sesión.</p>
      )}
    </div>
  );
};

export default Checkout;



