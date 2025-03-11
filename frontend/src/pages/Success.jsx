import React, { useEffect, useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

import { Box, Typography, Button, Card, CardContent, Stack } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const Success = () => {
  const { clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    clearCart();
  }, []);

  return (
    <Box className="success-container">
      <Card className="success-card">
        <CardContent>
          <Stack className="success-content">
            <CheckCircleOutlineIcon className="success-icon" />
            <Typography className="success-message-payment">🎉 ¡Pago exitoso!</Typography>
            <Typography>Gracias por tu compra. Te enviaremos un correo con los detalles.</Typography>
            <Button className="success-button" onClick={() => navigate("/")}>Volver al inicio</Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Success;

