import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import logo from "/src/assets/images/pajaro1.png"; // ✅ Importamos el logo como un recurso

const Header = () => {
  const { user, handleLogout } = useContext(AuthContext);

  return (
    <header className="header">
      <nav>
        <div className="left-menu">
          <Link to="/">
            <img src={logo} alt="Logo Tienda Aves" className="logo" /> {/* ✅ Usamos <img> en lugar de CSS */}
          </Link>
          <Link to="/" className="brand">Avista-aves</Link>
        </div>
        <div className="right-menu">
          <Link to="/">Inicio</Link>
          <Link to="/cart">Carrito</Link>
          {user ? (
            <>
              <span className="user-name">Hola, {user.name}</span>
              <button onClick={handleLogout} className="logout-btn">Cerrar sesión</button>
            </>
          ) : (
            <>
              <Link to="/login">Iniciar sesión</Link>
              <Link to="/signup">Registrarse</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;








