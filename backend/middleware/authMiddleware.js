const jwt = require('jsonwebtoken');

// Middleware para verificar el token
const authMiddleware = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({ message: 'Acceso denegado, no hay token' });
  }

  try {
    // Verificar el token JWT
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;  // Adjuntar la información del usuario al objeto request
    next();  // Continuar con la siguiente función en la cadena
  } catch (error) {
    res.status(400).json({ message: 'Token no válido', error });
  }
};

module.exports = authMiddleware;