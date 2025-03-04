const stripe = require("../config/stripeConfig");
const Product = require("../models/Product");

// 🔹 Crear un producto en MongoDB y en Stripe
const createProduct = async ({ name, description, price, imageUrl }) => {
    try {
        // 🔍 LOG PARA DEPURACIÓN
        console.log("🔹 Datos recibidos en createProduct:", { name, description, price, imageUrl });

        // Validar que los datos están llegando correctamente
        if (!name || !description || !price || !imageUrl) {
            throw new Error("Todos los campos (name, description, price, imageUrl) son obligatorios");
        }

        // Crear el producto en Stripe
        const stripeProduct = await stripe.products.create({
            name,
            images: [imageUrl], // 🔥 Eliminé description para evitar errores en Stripe
        });

        // Crear el precio en Stripe
        const stripePrice = await stripe.prices.create({
            unit_amount: price * 100, // Stripe maneja precios en centavos
            currency: "clp",
            product: stripeProduct.id,
        });

        // Guardar en MongoDB con los IDs de Stripe
        const newProduct = await Product.create({
            name,
            description,
            price,
            imageUrl,
            stripeProductId: stripeProduct.id,
            stripePriceId: stripePrice.id,
        });

        console.log("✅ Producto creado con éxito en MongoDB y Stripe:", newProduct);
        return newProduct;
    } catch (error) {
        console.error("❌ Error en createProduct:", error.message);
        throw new Error(`Error al crear el producto en Stripe: ${error.message}`);
    }
};

// 🔹 Obtener todos los productos desde MongoDB
const getAllProducts = async () => {
    return await Product.find();
};

// 🔹 Obtener un producto por su ID desde MongoDB
const getProductById = async (id) => {
    const product = await Product.findById(id);
    if (!product) throw new Error("Producto no encontrado");
    return product;
};

// 🔹 Actualizar un producto en MongoDB y Stripe (actualización parcial)
const updateProduct = async (id, updateData) => {
    const product = await Product.findById(id);
    if (!product) throw new Error("Producto no encontrado");

    if (!product.stripeProductId) {
        throw new Error("El producto no tiene un ID de Stripe asociado");
    }

    // 🔥 Actualizar en Stripe solo si hay cambios en nombre, imagen
    const updatedFields = {};
    if (updateData.name) updatedFields.name = updateData.name;
    if (updateData.imageUrl) updatedFields.images = [updateData.imageUrl];

    if (Object.keys(updatedFields).length > 0) {
        await stripe.products.update(product.stripeProductId, updatedFields);
    }

    // 🔥 Si el precio cambia, crear un nuevo precio en Stripe y desactivar el anterior
    if (updateData.price && updateData.price !== product.price) {
        const newPrice = await stripe.prices.create({
            unit_amount: updateData.price * 100,
            currency: "clp",
            product: product.stripeProductId,
        });

        if (product.stripePriceId) {
            await stripe.prices.update(product.stripePriceId, { active: false });
        }

        product.stripePriceId = newPrice.id;
        product.price = updateData.price;
    }

    // 🔥 Actualizar en MongoDB solo los campos enviados en la petición
    Object.assign(product, updateData);
    await product.save();

    return product;
};

// 🔹 Eliminar un producto en MongoDB y Stripe
const deleteProduct = async (id) => {
    const product = await Product.findById(id);
    if (!product) throw new Error("Producto no encontrado");

    if (!product.stripeProductId) {
        throw new Error("El producto no tiene un ID de Stripe asociado");
    }

    try {
        console.log(`🔍 Buscando precios para el producto en Stripe: ${product.stripeProductId}`);

        // Obtener y desactivar todos los precios en Stripe
        const prices = await stripe.prices.list({ product: product.stripeProductId });

        for (const price of prices.data) {
            await stripe.prices.update(price.id, { active: false });
            console.log(`✅ Precio ${price.id} desactivado en Stripe.`);
        }

        // ❌ No podemos eliminar el producto en Stripe, pero lo desactivamos
        await stripe.products.update(product.stripeProductId, { active: false });
        console.log(`✅ Producto desactivado en Stripe: ${product.stripeProductId}`);

    } catch (error) {
        console.error("❌ Error al desactivar producto en Stripe:", error);
        throw new Error("No se pudo desactivar el producto en Stripe");
    }

    // 🔥 Finalmente, eliminar el producto de MongoDB
    await Product.findByIdAndDelete(id);
    console.log(`✅ Producto eliminado en MongoDB: ${id}`);

    return { message: "Producto marcado como inactivo en Stripe y eliminado de MongoDB" };
};

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
};


