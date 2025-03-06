import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { createPaymentIntent, savePaymentDetails } from "../services/paymentServiceF";

const CheckoutForm = () => {
  const { user } = useAuth();
  const { cart, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCheckout = async () => {
    if (!user) {
      setError("Debes iniciar sesión para realizar una compra.");
      return;
    }

    if (!cart.length) {
      setError("El carrito está vacío.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const amount = cart.reduce((acc, item) => acc + item.productId.price * item.quantity, 0);

      const paymentIntent = await createPaymentIntent({
        amount,
        email: user.email,
        name: user.name,
      });

      if (paymentIntent.clientSecret) {
        alert("Pago procesado exitosamente. ¡Gracias por tu compra!");
        
        await savePaymentDetails({
          userId: user.id,
          paymentIntentId: paymentIntent.paymentIntentId,
          amount: paymentIntent.amount,
        });

        clearCart();
      } else {
        setError("Hubo un problema al procesar el pago.");
      }
    } catch (error) {
      console.error(error);
      setError("Error al procesar el pago.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button onClick={handleCheckout} disabled={loading}>
        {loading ? "Procesando..." : "Pagar"}
      </button>
    </div>
  );
};

export default CheckoutForm;


