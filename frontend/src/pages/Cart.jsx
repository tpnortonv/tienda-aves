import { useCart } from "../context/CartContext";

const Cart = () => {
  const { cart, handleRemoveFromCart } = useCart();

  if (!cart || cart.length === 0) {
    return <p>Tu carrito está vacío.</p>;
  }

  return (
    <div>
      <h2>Carrito de Compras</h2>
      {cart.map((item) => (
        <div key={item.productId._id}>
          <p>{item.productId.name}</p>
          <p>Precio: ${item.productId.price}</p>
          <p>Cantidad: {item.quantity}</p>
          <button onClick={() => handleRemoveFromCart(item.productId._id)}>
            Eliminar
          </button>
        </div>
      ))}
    </div>
  );
};

export default Cart;



