import React from "react";
import pinIcon from "/src/assets/images/pin.png"; // 📍 Icono de ubicación (PNG)
import emailIcon from "/src/assets/images/email.png"; // 📧 Icono de correo (PNG)

const Footer = () => {
  return (
    <footer className="footer">
      <p>Avista-Chile</p>
      <div className="footer-info">
        <p>
          <img src={pinIcon} alt="Ubicación" className="icon" />{" "}
          <a
            href="https://maps.app.goo.gl/9LbPA7d9JeTMfxqcA"
            target="_blank"
            rel="noopener noreferrer"
            className="Link-ubi"
            style={{ color: "white" }}
          > Puerto Prat, Natales, Magallanes y Antártica Chilena
          </a>
        </p>
        <p>
          <img src={emailIcon} alt="Correo" className="icon" /> contacto@avista-chile.cl
        </p>
      </div>
    </footer>
  );
};

export default Footer;


