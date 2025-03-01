// backend/controllers/cartController.js
const Cart = require('../models/Cart'); // Usamos require en vez de import

// Crear o actualizar un carrito
const createOrUpdateCart = async (req, res) => {
  const { userId } = req.body; // User ID que estará en el body de la solicitud
  const { productId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ userId });

    if (cart) {
      // Si el carrito ya existe, actualiza el producto en el carrito
      const productIndex = cart.products.findIndex(
        (item) => item.productId.toString() === productId
      );

      if (productIndex !== -1) {
        cart.products[productIndex].quantity += quantity; // Sumar la cantidad
      } else {
        cart.products.push({ productId, quantity }); // Agregar producto al carrito
      }
    } else {
      // Si no existe el carrito, lo crea
      cart = new Cart({
        userId,
        products: [{ productId, quantity }],
      });
    }

    await cart.save();
    res.status(200).json({
      message: 'Producto agregado exitosamente al carrito',
      cart,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear o actualizar el carrito', error });
  }
};

// Obtener el carrito de un usuario
const getCart = async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await Cart.findOne({ userId }).populate('products.productId');
    if (!cart) {
      return res.status(404).json({ message: 'Carrito no encontrado' });
    }
    res.status(200).json({
      message: 'Carrito encontrado',
      cart,
    });
    
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el carrito', error });
  }
};

// Eliminar un producto del carrito
const removeProductFromCart = async (req, res) => {
  const { userId, productId } = req.params;

  try {
    // Buscar el carrito del usuario
    const cart = await Cart.findOne({ userId });

    // Si el carrito no existe
    if (!cart) {
      return res.status(404).json({ message: 'Carrito no encontrado' });
    }

    // Buscar el índice del producto en el carrito
    const productIndex = cart.products.findIndex(
      (item) => item.productId.toString() === productId
    );

    // Si el producto no está en el carrito
    if (productIndex === -1) {
      return res.status(404).json({ message: 'Producto no encontrado en el carrito' });
    }

    // Eliminar el producto del carrito
    cart.products.splice(productIndex, 1);

    // Guardar el carrito actualizado
    await cart.save();

    // Responder con el carrito actualizado
    res.status(200).json({
      message: 'Producto eliminado exitosamente del carrito',
      cart, // Carrito actualizado
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el producto del carrito', error });
  }
};

module.exports = { createOrUpdateCart, getCart, removeProductFromCart }; // Usamos module.exports
