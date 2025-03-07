import React, { useEffect, useState } from "react";
import { getProducts } from "../services/productServiceF";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error al obtener productos:", error);
        setProducts([]); // Evita errores si la API falla
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="home">
      <h1>Productos</h1>
      {loading ? (
        <p>Cargando productos...</p>
      ) : products.length > 0 ? (
        <div className="product-list">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <p>No hay productos disponibles</p>
      )}
    </div>
  );
};

export default Home;


