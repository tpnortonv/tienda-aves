import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import CheckoutForm from "../components/CheckoutForm";

const Checkout = () => {
  const { cart } = useCart();
  const { user } = useAuth();

  if (!cart || cart.length === 0) {
    return <p>Tu carrito está vacío.</p>;
  }

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <ul>
        {cart.map((item) => (
          <li key={item.productId._id}>
            {item.productId.name} - ${item.productId.price} x {item.quantity}
          </li>
        ))}
      </ul>
      {user ? (
        <CheckoutForm />
      ) : (
        <p>Por favor, inicia sesión para completar la compra.</p>
      )}
    </div>
  );
};

export default Checkout;

