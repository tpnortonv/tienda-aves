import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";  
import { CartProvider } from "./context/CartContext";  
import { Elements } from "@stripe/react-stripe-js";  
import { loadStripe } from "@stripe/stripe-js";  

// Importación de los componentes
import Header from "./components/Header";  
import Footer from "./components/Footer";  

// Importación de las páginas
import Home from "./pages/Home";  
import Login from "./pages/Login";  
import SignUp from "./pages/SignUp";  
import ProductPage from "./pages/ProductPage";  
import Cart from "./pages/Cart";  
import Checkout from "./pages/Checkout";  
import Success from "./pages/Success";  // Agregar la página de éxito

// Estilos globales
import "./assets/global.css";  

// Cargar la clave pública de Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Header />
          <main className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/cart" element={<Cart />} />
              
              {/* 🔥 Envolver solo Checkout con Elements */}
              <Route 
                path="/checkout" 
                element={
                  <Elements stripe={stripePromise}>
                    <Checkout />
                  </Elements>
                } 
              />
              
              {/* Agregar la página de éxito */}
              <Route path="/success" element={<Success />} />
            </Routes>
          </main>
          <Footer />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;






























