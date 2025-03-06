import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { user, handleLogout } = useAuth();

  return (
    <header>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/cart">Carrito</Link>
        {user ? (
          <>
            <span>Bienvenido, {user.name}</span>
            <button onClick={handleLogout}>Cerrar sesión</button>
          </>
        ) : (
          <>
            <Link to="/login">Iniciar Sesión</Link>
            <Link to="/signup">Registrarse</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;



