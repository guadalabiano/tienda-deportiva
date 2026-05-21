# 🏪 Backend API - Tienda Deportiva

## Descripción

Backend de la tienda deportiva desarrollado con Node.js, Express y SQLite. Proporciona una API REST completa para:

- ✅ Autenticación de usuarios (Login/Registro)
- ✅ Gestión de productos
- ✅ Gestión de órdenes
- ✅ Control de stock

## 🚀 Instalación

### 1. Instalar dependencias

```bash
cd backend
npm install
```

### 2. Variables de entorno

El archivo `.env` ya está configurado con:
```
PORT=3000
JWT_SECRET=tu_clave_secreta_super_segura_2024
NODE_ENV=development
```

### 3. Iniciar el servidor

```bash
# Desarrollo con auto-reload
npm run dev

# Producción
npm start
```

El servidor estará disponible en: `http://localhost:3000`

## 📚 Endpoints de la API

### Autenticación

#### Registro
```
POST /api/auth/registro
Content-Type: application/json

{
  "nombre": "Juan Pérez",
  "email": "juan@example.com",
  "password": "123456"
}

Response: { token, user }
```

#### Login
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@tienda.com",
  "password": "123456"
}

Response: { token, user }
```

#### Perfil de usuario
```
GET /api/auth/profile
Authorization: Bearer {token}

Response: { id, nombre, email, rol }
```

### Productos

#### Obtener todos los productos
```
GET /api/productos

Response: [ { id, nombre, descripcion, precio, categoria, stock, imagen } ]
```

#### Obtener producto por ID
```
GET /api/productos/:id

Response: { id, nombre, descripcion, precio, categoria, stock, imagen }
```

#### Obtener productos por categoría
```
GET /api/productos/categoria/:categoria

Response: [ { id, nombre, descripcion, precio, categoria, stock, imagen } ]
```

#### Crear producto (Admin)
```
POST /api/productos
Authorization: Bearer {token}
Content-Type: application/json

{
  "nombre": "Zapatillas",
  "descripcion": "Descripción...",
  "precio": 12999,
  "categoria": "zapatillas",
  "stock": 10,
  "imagen": "url..."
}
```

#### Actualizar producto (Admin)
```
PUT /api/productos/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "nombre": "Nuevo nombre",
  "precio": 15999,
  "stock": 20
}
```

#### Eliminar producto (Admin)
```
DELETE /api/productos/:id
Authorization: Bearer {token}
```

### Órdenes

#### Crear orden
```
POST /api/ordenes
Authorization: Bearer {token}
Content-Type: application/json

{
  "items": [
    { "id": 1, "cantidad": 2 },
    { "id": 3, "cantidad": 1 }
  ]
}

Response: { id, usuarioId, total, estado, createdAt }
```

#### Obtener órdenes del usuario
```
GET /api/ordenes
Authorization: Bearer {token}

Response: [ { id, usuarioId, total, estado, createdAt, items } ]
```

#### Obtener orden por ID
```
GET /api/ordenes/:id
Authorization: Bearer {token}

Response: { id, usuarioId, total, estado, createdAt }
```

#### Actualizar estado de orden
```
PUT /api/ordenes/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "estado": "enviado"
}

Estados disponibles: "pendiente", "enviado", "entregado", "cancelado"
```

## 👤 Usuarios Demo

### Admin
```
Email: admin@tienda.com
Contraseña: 123456
Rol: admin
```

### Usuario
```
Email: usuario@demo.com
Contraseña: 123456
Rol: user
```

## 📦 Estructura de carpetas

```
backend/
├── config/
│   ├── database.js      # Configuración de SQLite
│   └── jwt.js           # Configuración de JWT
├── models/
│   ├── usuario.js       # Modelo de usuarios
│   ├── producto.js      # Modelo de productos
│   └── orden.js         # Modelo de órdenes
├── controllers/
│   ├── authController.js
│   ├── productController.js
│   └── ordenController.js
├── routes/
│   ├── auth.js
│   ├── productos.js
│   └── ordenes.js
├── middleware/
│   └── auth.js          # Middleware de autenticación
├── data/
│   └── tienda.db        # Base de datos SQLite
├── server.js            # Servidor Express
├── seeds.js             # Datos iniciales
├── package.json
└── .env
```

## 🔐 Autenticación

La API usa JWT tokens en el header `Authorization`:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

El token se obtiene después de hacer login o registro.

## 📊 Base de Datos

SQLite con las siguientes tablas:

- **usuarios**: id, nombre, email, password, rol, createdAt
- **productos**: id, nombre, descripcion, precio, categoria, stock, imagen, createdAt
- **ordenes**: id, usuarioId, total, estado, createdAt
- **orden_items**: id, ordenId, productoId, cantidad, precio

## 🛠️ Tecnologías

- **Node.js** - Runtime de JavaScript
- **Express** - Framework web
- **SQLite3** - Base de datos
- **JWT** - Autenticación
- **bcryptjs** - Hash de contraseñas
- **CORS** - Manejo de solicitudes cruzadas

## 📝 Notas

- Los tokens tienen validez de 30 días
- Las contraseñas se almacenan hasheadas con bcryptjs
- La BD se inicializa automáticamente con datos de demostración
- CORS está habilitado para: localhost:5173, localhost:5174, localhost:3000

## ⚠️ Desarrollo

Si necesitas reiniciar la BD, simplemente elimina el archivo `backend/data/tienda.db` y reinicia el servidor.
