import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const Cart = () => {
  const { cart, removeFromCart } = useContext(CartContext);

  return (
    <div className="cart">
      <h2>Carrito de Compras</h2>
      {cart.length === 0 ? (
        <p>Tu carrito está vacío</p>
      ) : (
        <ul>
          {cart.map((item) => (
            <li key={item.productId._id}>
              <img src={item.productId.imageUrl} alt={item.productId.name} />
              <div>
                <h4>{item.productId.name}</h4>
                <p>Cantidad: {item.quantity}</p>
                <p>Precio: ${item.productId.price * item.quantity}</p>
                <button onClick={() => removeFromCart(item.productId._id)}>Eliminar</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
