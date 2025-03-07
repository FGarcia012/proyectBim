# API de Gestión de Ventas

Esta API está diseñada para gestionar un sistema de ventas. Incluye funcionalidades para la gestión de usuarios, productos, categorías, carritos, pedidos y facturas.

## Variables de Entorno

Crea un archivo `.env` en el directorio raíz y agrega las siguientes variables:

```
MONGO_URI=<tu_cadena_de_conexión_mongodb>
PORT=<tu_puerto_del_servidor>
JWT_SECRET=<tu_secreto_jwt>
```

### Ejemplo de archivo `.env`

```
MONGO_URI=mongodb://localhost:27017/proyectoBimestral-2023012
PORT=3006
JWT_SECRET=EYQ/MSm5.!8MaCc
```

## Pasos para Configurar y Ejecutar el Servidor

1. **Clonar el repositorio:**
   ```sh
   git clone <URL_DEL_REPOSITORIO>
   cd proyectBim
   ```

2. **Instalar las dependencias:**
   ```sh
   npm install
   ```

3. **Configurar las variables de entorno:**
   - Crea un archivo `.env` en el directorio raíz del proyecto.
   - Copia y pega las variables de entorno mencionadas anteriormente en el archivo `.env`.

4. **Iniciar el servidor:**
   ```sh
   npm start
   ```
   O para desarrollo:
   ```sh
   npm run dev
   ```

5. **Acceder a la documentación de la API:**
   - La documentación de la API estará disponible en `http://localhost:3006/api-docs` una vez que el servidor esté en funcionamiento.

## Endpoints de la API

### Autenticación

- **Registrar Usuario**

  - **URL:** `/salesManagement/v1/auth/register`
  - **Método:** `POST`
  - **Cuerpo:**
    ```json
    {
      "name": "string",
      "surname": "string",
      "username": "string",
      "email": "string",
      "password": "string",
      "profilePicture": "file",
      "phone": "string"
    }
    ```

- **Iniciar Sesión**

  - **URL:** `/salesManagement/v1/auth/login`
  - **Método:** `POST`
  - **Cuerpo:**
    ```json
    {
      "email": "string",
      "username": "string",
      "password": "string"
    }
    ```

### Usuarios

- **Obtener Usuario por ID**

  - **URL:** `/salesManagement/v1/user/:uid`
  - **Método:** `GET`

- **Eliminar Usuario**

  - **URL:** `/salesManagement/v1/user/deleteUser/:uid`
  - **Método:** `DELETE`

- **Actualizar Información del Usuario**

  - **URL:** `/salesManagement/v1/user/updateUser/:uid`
  - **Método:** `PUT`
  - **Cuerpo:**
    ```json
    {
      "name": "string",
      "surname": "string",
      "email": "string",
      "phone": "string"
    }
    ```

### Productos

- **Crear Producto**

  - **URL:** `/salesManagement/v1/product/createProduct`
  - **Método:** `POST`
  - **Cuerpo:**
    ```json
    {
      "name": "string",
      "description": "string",
      "price": "number",
      "inventory": "number",
      "image": "file"
    }
    ```

- **Obtener Producto por ID**

  - **URL:** `/salesManagement/v1/product/getProduct/:pid`
  - **Método:** `GET`

- **Eliminar Producto**

  - **URL:** `/salesManagement/v1/product/deleteProduct/:pid`
  - **Método:** `DELETE`

- **Listar Productos**

  - **URL:** `/salesManagement/v1/product/getProducts`
  - **Método:** `GET`

### Categorías

- **Agregar Categoría**

  - **URL:** `/salesManagement/v1/category/addCategory`
  - **Método:** `POST`
  - **Cuerpo:**
    ```json
    {
      "name": "string"
    }
    ```

- **Obtener Categorías**

  - **URL:** `/salesManagement/v1/category/getCategories`
  - **Método:** `GET`

### Carrito

- **Agregar Producto al Carrito**

  - **URL:** `/salesManagement/v1/cart/addToCart`
  - **Método:** `POST`
  - **Cuerpo:**
    ```json
    {
      "product": "string",
      "quantity": "number"
    }
    ```

- **Completar Proceso de Compra**

  - **URL:** `/salesManagement/v1/cart/purchasingProcess`
  - **Método:** `POST`

### Pedidos

- **Obtener Historial de Pedidos**

  - **URL:** `/salesManagement/v1/order/orderHistory/:uid`
  - **Método:** `GET`

### Facturas

- **Crear Factura**

  - **URL:** `/salesManagement/v1/invoice/createInvoice`
  - **Método:** `POST`
  - **Cuerpo:**
    ```json
    {
      "user": "string",
      "products": [
        {
          "product": "string",
          "quantity": "number"
        }
      ]
    }
    ```

## Funcionalidades Adicionales

Las siguientes funcionalidades han sido agregadas:

1. **Gestión de Usuarios**: Permite registrar, actualizar y eliminar usuarios.
2. **Gestión de Productos**: Permite crear, actualizar, eliminar y listar productos.
3. **Gestión de Categorías**: Permite agregar y obtener categorías.
4. **Carrito de Compras**: Permite agregar productos al carrito y completar compras.
5. **Historial de Pedidos**: Permite a los usuarios ver su historial de pedidos.
6. **Facturación**: Permite crear facturas basadas en los productos comprados.