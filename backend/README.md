# Tienda Aves - Backend

Este es el backend de **Tienda Aves**, una aplicación para la gestión de reservas de avistamiento de aves, administración de carritos de compra y procesamiento de pagos.  

Está desarrollado con **Node.js** y utiliza **Express** para la gestión de rutas y lógica del servidor. La base de datos está implementada en **MongoDB** para almacenar información de usuarios, productos, carritos y transacciones.  

La autenticación de usuarios se maneja con **JWT**, permitiendo un acceso seguro. Además, la integración con **Stripe** facilita el procesamiento de pagos de manera confiable.  

Este backend proporciona las API necesarias para la interacción con el frontend y la gestión eficiente de la aplicación.

## Instalación

1. Clona este repositorio: `https://github.com/tpnortonv/tienda-aves.git`

2. Ve al directorio del backend: `cd tienda-aves/backend`

3. Instala las dependencias: `npm install`

## Dependencias

- **Express** - Framework para Node.js.
- **Mongoose** - ODM para MongoDB.
- **jsonwebtoken** - Autenticación con JWT.
- **bcryptjs** - Encriptación de contraseñas.
- **dotenv** - Gestión de variables de entorno.
- **cors** - Permitir solicitudes desde otros orígenes.
- **stripe** - Procesamiento de pagos.
- **nodemon** (desarrollo) - Reinicio automático del servidor.


4. Crea un archivo `.env` en el directorio raíz del backend y agrega las siguientes variables de entorno:
PORT=5000 MONGO_URI=tu_conexion_a_mongodb 
JWT_SECRET=tu_clave_secreta_jwt 
STRIPE_SECRET_KEY=tu_clave_secreta_de_stripe

5. Inicia el servidor en modo desarrollo: `npm run dev`

## Rutas de la API

### Autenticación (`/api/auth`)

- `POST /register` - Registra un nuevo usuario.
- `POST /login` - Inicia sesión y devuelve un token.
- `GET /verify` - Verifica el token de autenticación (requiere token en `x-auth-token`).

### Carrito de Compras (`/api/cart`)

- `POST /` - Agrega un producto al carrito o actualiza su cantidad (requiere autenticación).
- `GET /:userId` - Obtiene el carrito de un usuario (requiere autenticación).
- `DELETE /:userId/:productId` - Elimina un producto del carrito (requiere autenticación).
- `DELETE /:userId` - Vacía completamente el carrito después del pago (requiere autenticación).

### Productos (`/api/products`)

- `POST /add` - Agrega un nuevo producto (requiere autenticación).
- `GET /` - Obtiene todos los productos disponibles.
- `GET /:id` - Obtiene un producto por su ID.
- `PUT /:id` - Actualiza un producto (requiere autenticación).
- `DELETE /:id` - Elimina un producto (requiere autenticación).

### Pagos (`/api/payments`)

- `POST /create-payment-intent` - Crea un intento de pago con Stripe.
- `POST /save-payment-details` - Guarda los detalles del pago después de la confirmación.

## Modelos de la Base de Datos

### Usuario (`User`)

- `name`: Nombre del usuario.
- `email`: Correo electrónico único.
- `password`: Contraseña hasheada.
- `customerId`: ID del cliente en Stripe.

### Carrito (`Cart`)

- `userId`: ID del usuario.
- `products`: Lista de productos en el carrito, cada uno con `productId` y `quantity`.

### Producto (`Product`)

- `name`: Nombre del producto.
- `description`: Descripción.
- `price`: Precio del producto.
- `imageUrl`: URL de la imagen.
- `stripeProductId`: ID del producto en Stripe.
- `stripePriceId`: ID del precio en Stripe.

### Pago (`Payment`)

- `userId`: ID del usuario que realizó el pago.
- `paymentIntentId`: ID del intento de pago en Stripe.
- `amount`: Monto pagado.
- `status`: Estado del pago (`pending`, `completed`, `failed`).
- `createdAt`: Fecha de creación.

## Middleware de Autenticación

Para acceder a rutas protegidas, se debe incluir el token en los headers: 
x-auth-token: tu_token_aqui


El middleware `authMiddleware` verifica la validez del token antes de permitir el acceso.

## Notas

- La API requiere autenticación para modificar productos y carritos.
- Se recomienda utilizar Postman o Thunder Client para probar las rutas.
- La base de datos debe estar en MongoDB Atlas o una instancia local.






