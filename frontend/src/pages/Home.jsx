import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getProducts } from "../services/productServiceF";
import ProductCard from "../components/ProductCard";
import aboutImage from "/src/assets/images/us.png"; // 🔥 Imagen en el modal

const Home = () => {
  const location = useLocation();

  // Estados para controlar la vista de bienvenida y productos
  const [showWelcome, setShowWelcome] = useState(location.state?.showWelcome ?? true);
  const [showProducts, setShowProducts] = useState(location.state?.showProducts ?? false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Estado para el modal de "Sobre Servicios"
  const [showAbout, setShowAbout] = useState(false);

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
          <h1>Bienvenidos a Avista-Chile</h1>

          {/* Botón para abrir modal "Sobre Servicios" */}
          <button className="about-button" onClick={() => setShowAbout(true)}>Quienes somos</button>

          {/* Botón para ver productos */}
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
          <h1>Servicios</h1>
          {loading ? (
            <p>Cargando servicios...</p>
          ) : products.length > 0 ? (
            <div className="product-list">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
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
            <h2>Nuestros Servicios</h2>
            <img src={aboutImage} alt="Sobre Nosotros" className="modal-image" />
            <p>
              Somos Avista Chile, un proyecto nacido entre pajareos, surf y amor por la naturaleza. En Chile hay más de 530 especies de aves, pero los Big Year siempre los hacen los gringos. <br /><br />
              <strong>¡No más!</strong> Ahora les toca venir a Chile a pajarear. <br /><br />

              Soy <strong>Thomas Norton</strong>, y con mi pareja <strong>Jacinta Montqalva</strong> creamos un servicio de avistamiento de aves guiado. <strong>Te aseguramos ver la especie que buscas o te devolvemos la plata.</strong> <br /><br />

              Así que deja de mirar pajaritos en los billetes y ven a verlos de verdad. <strong>¡Nosotros guiamos, tú disfrutas! 🌿🦜</strong>
            </p>

            <button className="close-modal" onClick={() => setShowAbout(false)}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;









