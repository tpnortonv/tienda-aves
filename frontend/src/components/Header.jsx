import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';

const Header = () => {
  const { user, handleLogout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);

  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo">
          🦜 Tienda de Aves
        </Link>
        <nav>
          <Link to="/">Inicio</Link>
          {user ? (
            <>
              <span>Hola, {user.name}</span>
              <Link to="/checkout">Carrito ({cart.length})</Link>
              <button onClick={handleLogout}>Cerrar sesión</button>
            </>
          ) : (
            <>
              <Link to="/login">Iniciar sesión</Link>
              <Link to="/signup">Registrarse</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
