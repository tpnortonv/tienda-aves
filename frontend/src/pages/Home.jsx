import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getProducts } from "../services/productServiceF";
import ProductCard from "../components/ProductCard";
import ProductPage from "./ProductPage"; // 🔥 Importamos el modal
import aboutImage from "/src/assets/images/us.png"; // 🔥 Imagen en el modal

const Home = () => {
  const location = useLocation();

  // Estados para controlar la vista de bienvenida y productos
  const [showWelcome, setShowWelcome] = useState(location.state?.showWelcome ?? true);
  const [showProducts, setShowProducts] = useState(location.state?.showProducts ?? false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loadingModal, setLoadingModal] = useState(false); // 🔥 Nuevo estado para la carga en el modal

  // Estado para el modal de "Sobre Servicios"
  const [showAbout, setShowAbout] = useState(false);

  useEffect(() => {
    if (location.state?.showWelcome === false) {
      setShowWelcome(false);
      setShowProducts(true);
    } else if (location.state?.showWelcome) {
      setShowWelcome(true);
      setShowProducts(false);
    }
  }, [location]);

  useEffect(() => {
    if (showProducts) {
      const fetchProducts = async () => {
        try {
          setLoading(true);
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

  // 📌 Función para abrir la modal con carga
  const handleOpenProductModal = async (product) => {
    setLoadingModal(true); // 🔥 Activa el loading en la modal
    setSelectedProduct(null);

    // Simulamos un pequeño delay para que el loader sea visible
    setTimeout(() => {
      setSelectedProduct(product);
      setLoadingModal(false); // 🔥 Desactiva el loading cuando el producto está listo
    }, 500);
  };

  return (
    <div className="home">
      {showWelcome ? (
        <div className="welcome-section">
          <h1>Bienvenidos a Avista-Chile</h1>
          <button className="about-button" onClick={() => setShowAbout(true)}>Quienes somos</button>
          <button
            className="explore-button"
            onClick={() => {
              setShowProducts(true);
              setShowWelcome(false);
            }}
          >
            Ver servicios
          </button>
        </div>
      ) : (
        <>
          <h1 className="services-title">Servicios</h1>
          {loading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
            </div>
          ) : products.length > 0 ? (
            <div className="product-list">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} onClick={() => handleOpenProductModal(product)} />
              ))}
            </div>
          ) : (
            <p>No hay servicios disponibles</p>
          )}
        </>
      )}

      {/* 🔥 MODAL SOBRE SERVICIOS */}
      {showAbout && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-modal" onClick={() => setShowAbout(false)}>✖</button>
            <h2>Nuestros Servicios</h2>
            <img src={aboutImage} alt="Sobre Nosotros" className="modal-image" />
            <p>
              Somos Avista Chile, un proyecto nacido entre pajareos, surf y amor por la naturaleza. <br /><br />
              <strong>¡No más!</strong> Ahora les toca venir a Chile a pajarear. <br /><br />
              Soy <strong>Thomas Norton</strong>, y con mi pareja <strong>Jacinta Montalva</strong> creamos un servicio de avistamiento de aves guiado. <br /><br />
              <strong>¡Nosotros guiamos, tú disfrutas! 🌿🦜</strong>
            </p>
          </div>
        </div>
      )}

      {/* 🔥 MODAL PARA PRODUCTOS */}
      {selectedProduct !== null || loadingModal ? (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-modal" onClick={() => setSelectedProduct(null)}>✖</button>
            
            {/* 🔄 Loader en la modal mientras carga el producto */}
            {loadingModal ? (
              <div className="loading-container-modal">
                <div className="loading-spinner"></div>
              </div>
            ) : (
              <ProductPage product={selectedProduct} />
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Home;










