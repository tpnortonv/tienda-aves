import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import CheckoutForm from "../components/CheckoutForm";

import { Box, Typography, Card, CardContent, List, ListItem, ListItemText, Divider, Grid } from "@mui/material";

const Checkout = () => {
  const { user } = useContext(AuthContext);
  const { cart } = useContext(CartContext);

  console.log("🛒 Estado del carrito en Checkout.jsx:", cart);

  const totalAmount = cart.reduce((sum, item) => {
    if (!item.productId || typeof item.productId.price !== "number") {
      console.warn("⚠️ Producto inválido en el carrito:", item);
      return sum;
    }
    return sum + item.quantity * item.productId.price;
  }, 0);

  console.log("💰 Total calculado:", totalAmount);

  return (
    <Box className="checkout-container">
      <Typography variant="h4" className="checkout-title">
        Finalizar compra
      </Typography>

      {user && cart.length > 0 ? (
        <Grid container spacing={3} className="checkout-content">
          {/* 🛍 Resumen del pedido */}
          <Grid item xs={12} md={6}>
            <Card className="checkout-card">
              <CardContent>
                <Typography variant="h6" className="checkout-subtitle">
                  Resumen de tu pedido
                </Typography>
                <List className="checkout-summary">
                  {cart.map((item) => (
                    <React.Fragment key={item.productId._id}>
                      <ListItem className="checkout-item">
                        <ListItemText
                          primary={`${item.quantity} x ${item.productId.name}`}
                          secondary={`Precio unitario: $${item.productId?.price.toLocaleString("es-CL")}`}
                        />
                        <Typography className="checkout-price">
                          ${ (item.quantity * (item.productId?.price || 0)).toLocaleString("es-CL") }
                        </Typography>
                      </ListItem>
                      <Divider />
                    </React.Fragment>
                  ))}
                </List>

                <Box className="checkout-total">
                  <Typography variant="h6">
                    Total: ${totalAmount.toLocaleString("es-CL")}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* 💳 Formulario de pago */}
          <Grid item xs={12} md={6}>
            <CheckoutForm user={user} cart={cart} totalAmount={totalAmount} />
          </Grid>
        </Grid>
      ) : (
        <Typography className="checkout-empty">
          Tu carrito está vacío o no has iniciado sesión.
        </Typography>
      )}
    </Box>
  );
};

export default Checkout;







