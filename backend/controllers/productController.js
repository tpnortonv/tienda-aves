const productService = require("../services/productService");

// 🔹 Crear un nuevo producto en MongoDB y Stripe
const createProduct = async (req, res) => {
    try {
        const newProduct = await productService.createProduct(req.body);
        res.status(201).json({ message: "Producto creado con éxito", product: newProduct });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 🔹 Obtener todos los productos
const getAllProducts = async (req, res) => {
    try {
        const products = await productService.getAllProducts();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 🔹 Obtener un producto por su ID
const getProductById = async (req, res) => {
    try {
        const product = await productService.getProductById(req.params.id);
        res.status(200).json(product);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// 🔹 Actualizar un producto en MongoDB y Stripe
const updateProduct = async (req, res) => {
    try {
        const updatedProduct = await productService.updateProduct(req.params.id, req.body);
        res.status(200).json({ message: "Producto actualizado con éxito", product: updatedProduct });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 🔹 Eliminar un producto en MongoDB y Stripe
const deleteProduct = async (req, res) => {
    try {
        const response = await productService.deleteProduct(req.params.id);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
};

