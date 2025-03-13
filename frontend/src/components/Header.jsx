import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import logo from "/src/assets/images/pajaro1.png";
import cartIcon from "/src/assets/images/cart.png";

const Header = () => {
  const { user, handleLogout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("/", { state: { showWelcome: true } }); // 🔥 Fuerza la vista de "Bienvenidos"
  };

  const handleServicesClick = () => {
    navigate("/", { state: { showWelcome: false, showProducts: true } }); // 🔥 Va directo a los productos
  };

  return (
    <header className="header">
      <nav>
        <div className="left-menu">
          <button onClick={handleHomeClick} className="logo-btn">
            <img src={logo} alt="Logo Tienda Aves" className="logo" />
          </button>
        </div>
        <div className="right-menu">
          {!user ? (
            <>
              <button className="login-btn" onClick={() => navigate("/login")}>Iniciar sesión</button>
              <button className="signup-btn" onClick={() => navigate("/signup")}>Registrarse</button>
            </>
          ) : (
            <>
              <span className="user-name">¡Hola {user.name}!</span>
              <button onClick={handleLogout} className="logout-btn">Cerrar sesión</button>
            </>
          )}
          <button onClick={handleServicesClick} className="home-btn">Servicios</button>
          <button className="cart-btn" onClick={() => navigate("/cart")}>
            <img src={cartIcon} alt="Carrito" className="cart-icon" />
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
















