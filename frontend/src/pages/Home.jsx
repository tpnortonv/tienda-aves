import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getProducts } from "../services/productServiceF";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const location = useLocation();

  // Inicializar estados de bienvenida y productos
  const [showWelcome, setShowWelcome] = useState(location.state?.showWelcome ?? true);
  const [showProducts, setShowProducts] = useState(location.state?.showProducts ?? false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (location.state?.showWelcome === false) {
      setShowWelcome(false);
      setShowProducts(true); // 🔥 Muestra productos directamente si viene desde "Servicios"
    } else if (location.state?.showWelcome) {
      setShowWelcome(true);
      setShowProducts(false);
    }
  }, [location]);

  useEffect(() => {
    if (showProducts) {
      const fetchProducts = async () => {
        try {
          const data = await getProducts();
          setProducts(Array.isArray(data) ? data : []);
        } catch (error) {
          console.error("Error al obtener productos:", error);
          setProducts([]);
        } finally {
          setLoading(false);
        }
      };
      fetchProducts();
    }
  }, [showProducts]);

  return (
    <div className="home">
      {showWelcome ? (
        <div className="welcome-section">
          <h1>Bienvenidos a Tienda Aves</h1>
          <p>
            Somos apasionados por la naturaleza y queremos ofrecerte los mejores productos para observar y cuidar aves.
          </p>
          <button 
            className="explore-button" 
            onClick={() => { 
              setShowProducts(true);
              setShowWelcome(false); 
            }}
          >
            Ver Productos
          </button>
        </div>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

export default Home;







