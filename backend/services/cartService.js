const Cart = require('../models/Cart');

// Función para crear o actualizar un carrito
const createOrUpdateCart = async (userId, productId, quantity) => {
  try {
    let cart = await Cart.findOne({ userId });

    if (cart) {
      const productIndex = cart.products.findIndex(
        (item) => item.productId.toString() === productId
      );

      if (productIndex !== -1) {
        cart.products[productIndex].quantity += quantity; // Sumar cantidad
      } else {
        cart.products.push({ productId, quantity }); // Agregar producto
      }
    } else {
      cart = new Cart({
        userId,
        products: [{ productId, quantity }],
      });
    }

    await cart.save();
    return cart;
  } catch (error) {
    throw new Error('Error al crear o actualizar el carrito');
  }
};

// Función para obtener el carrito de un usuario
const getCart = async (userId) => {
  try {
    const cart = await Cart.findOne({ userId }).populate('products.productId');
    if (!cart) {
      throw new Error('Carrito no encontrado');
    }
    return cart;
  } catch (error) {
    throw new Error('Error al obtener el carrito');
  }
};

// Función para eliminar un producto del carrito
const removeProductFromCart = async (userId, productId) => {
  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      throw new Error('Carrito no encontrado');
    }

    cart.products = cart.products.filter(
      (item) => item.productId.toString() !== productId
    );

    await cart.save();
    return cart;
  } catch (error) {
    throw new Error('Error al eliminar el producto del carrito');
  }
};

module.exports = { createOrUpdateCart, getCart, removeProductFromCart };

