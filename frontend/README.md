# Tienda Aves - Frontend

Este es el frontend de **Tienda Aves**, una aplicación para la gestión de reservas de avistamiento de aves, administración de carritos de compra y procesamiento de pagos. Está desarrollado con **React** y **Vite**, proporcionando una interfaz rápida y optimizada. La aplicación se comunica con un backend en **Node.js y Express**, utilizando **MongoDB** como base de datos y **Stripe** para el procesamiento de pagos.

## Instalación

Clona este repositorio:  
`git clone https://github.com/tpnortonv/tienda-aves.git`

Ve al directorio del frontend:  
`cd tienda-aves/frontend`

Instala las dependencias:  
`npm install`

## Dependencias

- **React** - Biblioteca principal para el desarrollo del frontend.
- **React Router DOM** - Manejo de rutas en la aplicación.
- **Vite** - Entorno de desarrollo rápido para React.
- **Axios** - Cliente HTTP para realizar peticiones a la API.
- **Stripe** - Integración de pagos.
- **Context API** - Gestión de estado global.

## Configuración de Variables de Entorno

Antes de ejecutar la aplicación, crea un archivo `.env` en la raíz del frontend y agrega las siguientes variables:
VITE_API_URL=http://localhost:5000/api 
VITE_STRIPE_PUBLIC_KEY=tu_clave_publica_de_stripe


## Ejecución

Para correr el frontend en desarrollo:  
`npm run dev`

Esto iniciará la aplicación en `http://localhost:5173/` o en el puerto que Vite asigne.

## Estructura de Rutas

- `/` - Página de inicio con información sobre avistamiento de aves y servicios.
- `/cart` - Vista del carrito de compras.
- `/checkout` - Proceso de pago con Stripe.
- `/login` - Iniciar sesión.
- `/signup` - Registro de usuario.

## Gestión del Estado

- **AuthContext**: Maneja el estado de autenticación del usuario.
- **CartContext**: Maneja el estado del carrito de compras y su interacción con la API.

## Integración con Stripe

El frontend está integrado con **Stripe Checkout** para procesar pagos de forma segura. Se envía la información del pago al backend, que genera un **Payment Intent** y redirige al usuario a la pasarela de pago.

## Despliegue Local

Para probar la aplicación en local:

1. Iniciar el backend ejecutando `npm run dev` en `tienda-aves/backend`.
2. Asegurarse de que la API esté corriendo en `http://localhost:5000/`.
3. Iniciar el frontend con `npm run dev` en `tienda-aves/frontend`.
4. Acceder a `http://localhost:5173/` en el navegador.

## Notas

- La aplicación requiere que el backend esté corriendo para acceder a los datos de productos, usuarios y pagos.
- En producción, las variables de entorno deben configurarse correctamente.
- Para probar la integración de pagos, usar claves de prueba de **Stripe**.

Este frontend complementa el backend de **Tienda Aves**, proporcionando una experiencia fluida para la reserva de servicios y gestión de pagos en línea.