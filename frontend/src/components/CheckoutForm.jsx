import { useState } from 'react';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { createPaymentIntent, savePaymentDetails } from '../services/paymentServiceF';

const CheckoutForm = () => {
  const { cart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const [paymentMethodId, setPaymentMethodId] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const totalAmount = cart.reduce((sum, item) => sum + item.productId.price * item.quantity, 0);

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const paymentIntent = await createPaymentIntent(totalAmount * 100, user.email, user.name, paymentMethodId);
      await savePaymentDetails(user.id, paymentIntent.paymentIntentId, totalAmount);

      setMessage('Pago realizado con éxito');
    } catch (error) {
      setMessage('Error al procesar el pago');
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <div className="checkout-form">
      <h2>Finalizar Compra</h2>
      <p>Total a pagar: ${totalAmount}</p>
      <form onSubmit={handlePayment}>
        <input
          type="text"
          placeholder="ID del método de pago"
          value={paymentMethodId}
          onChange={(e) => setPaymentMethodId(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Procesando...' : 'Pagar'}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default CheckoutForm;
