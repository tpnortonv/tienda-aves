import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Header = () => {
  const { user, handleLogout } = useContext(AuthContext);

  return (
    <header className="header">
      <nav>
        <Link to="/" className="logo">Tienda Aves</Link>
        <ul>
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/cart">Carrito</Link></li>
          {user ? (
            <>
              <li><span>Hola, {user.email}</span></li>
              <li><button onClick={handleLogout}>Cerrar sesión</button></li>
            </>
          ) : (
            <>
              <li><Link to="/login">Iniciar sesión</Link></li>
              <li><Link to="/signup">Registrarse</Link></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;






