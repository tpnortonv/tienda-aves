import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { handleAddToCart } = useCart();

  return (
    <div>
      <h3>{product.name}</h3>
      <p>Precio: ${product.price}</p>
      <Link to={`/product/${product._id}`}>Ver más</Link>
      <button onClick={() => handleAddToCart(product._id)}>
        Agregar al carrito
      </button>
    </div>
  );
};

export default ProductCard;


