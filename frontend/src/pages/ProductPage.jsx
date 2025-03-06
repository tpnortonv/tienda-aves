import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { getProductById } from "../services/productServiceF";

const ProductPage = () => {
  const { id } = useParams();
  const { handleAddToCart } = useCart();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await getProductById(id);
        setProduct(productData);
      } catch (error) {
        console.error("❌ Error al obtener el producto:", error.message);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <p>Cargando producto...</p>;

  return (
    <div>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>Precio: ${product.price}</p>
      <button onClick={() => handleAddToCart(product._id)}>
        Agregar al carrito
      </button>
    </div>
  );
};

export default ProductPage;


