export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user || !user.id || !user.token) {
      setCart([]);
      return;
    }

    const fetchCart = async () => {
      try {
        const cartData = await getCart(user.id, user.token);
        console.log("🛒 Carrito recibido desde la API:", cartData);

        if (cartData && cartData.products) {
          setCart(cartData.products);
          localStorage.setItem("cart", JSON.stringify(cartData.products));
        } else {
          setCart([]);
        }
      } catch (error) {
        console.error("❌ Error al obtener el carrito:", error);
        setCart([]);
      }
    };

    fetchCart();
  }, [user]);

  // 🔹 Actualización de cantidad en el carrito
  const addToCart = async (productId, newQuantity) => {
    if (!user || !user.id || !user.token) return;

    try {
      await createOrUpdateCart(user.id, productId, newQuantity, user.token);

      setCart((prevCart) =>
        prevCart.map((item) =>
          item.productId._id === productId ? { ...item, quantity: newQuantity } : item
        )
      );

      // 🔥 Asegurar que `localStorage` también se actualice
      const updatedCart = cart.map((item) =>
        item.productId._id === productId ? { ...item, quantity: newQuantity } : item
      );
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } catch (error) {
      console.error("❌ Error al actualizar el carrito:", error);
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};













































