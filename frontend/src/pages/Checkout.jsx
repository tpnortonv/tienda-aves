import { useContext } from 'react';
import Cart from '../components/Cart';
import CheckoutForm from '../components/CheckoutForm';
import { CartContext } from '../context/CartContext';

const Checkout = () => {
  const { cart } = useContext(CartContext);

  return (
    <div className="checkout">
      <h2>Proceso de Compra</h2>
      {cart.length === 0 ? (
        <p>Tu carrito está vacío</p>
      ) : (
        <>
          <Cart />
          <CheckoutForm />
        </>
      )}
    </div>
  );
};

export default Checkout;
