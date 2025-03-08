import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";  // Importar el contexto de autenticación
import { CartProvider } from "./context/CartContext";  // Importar el contexto del carrito
import { Elements } from "@stripe/react-stripe-js";  // Importar Elements de Stripe
import { loadStripe } from "@stripe/stripe-js";  // Importar loadStripe de Stripe

// Importación de los componentes
import Header from "./components/Header";  // Componente Header
import Footer from "./components/Footer";  // Componente Footer

// Importación de las páginas
import Home from "./pages/Home";  // Página Home
import Login from "./pages/Login";  // Página Login
import SignUp from "./pages/SignUp";  // Página SignUp
import ProductPage from "./pages/ProductPage";  // Página ProductPage
import Cart from "./pages/Cart";  // Página Cart
import Checkout from "./pages/Checkout";  // Página Checkout

// Estilos globales
import "./assets/global.css";  // Estilos globales

// Cargar la clave pública de Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);  // Usando import.meta.env para acceder a la variable de entorno

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Header />
          <main className="container">
            {/* Envuelve la parte de tu app que usa Stripe en el componente <Elements> */}
            <Elements stripe={stripePromise}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/product/:id" element={<ProductPage />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
              </Routes>
            </Elements>
          </main>
          <Footer />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;





























