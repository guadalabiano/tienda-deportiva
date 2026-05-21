import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { initDatabase } from './config/database.js';
import { seedDatabase } from './seeds.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { mkdir } from 'fs/promises';

import authRoutes from './routes/auth.js';
import productosRoutes from './routes/productos.js';
import ordenesRoutes from './routes/ordenes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:3000'],
  credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/productos', productosRoutes);
app.use('/api/ordenes', ordenesRoutes);

// Ruta de prueba
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Backend funcionando correctamente' });
});

// Inicializar servidor
async function startServer() {
  try {
    // Crear carpeta de datos si no existe
    try {
      await mkdir(join(__dirname, 'data'), { recursive: true });
    } catch (err) {
      // La carpeta ya existe
    }

    // Inicializar base de datos
    await initDatabase();
    console.log('✓ Base de datos inicializada');

    // Poblar base de datos
    await seedDatabase();
    console.log('✓ Base de datos poblada');

    // Iniciar servidor
    app.listen(PORT, () => {
      console.log(`
╔════════════════════════════════════════╗
║   🚀 SERVIDOR BACKEND INICIADO        ║
║   http://localhost:${PORT}              ║
║   Endpoints disponibles:               ║
║   - POST   /api/auth/login             ║
║   - POST   /api/auth/registro          ║
║   - GET    /api/auth/profile           ║
║   - GET    /api/productos              ║
║   - POST   /api/productos              ║
║   - PUT    /api/productos/:id          ║
║   - DELETE /api/productos/:id          ║
║   - POST   /api/ordenes                ║
║   - GET    /api/ordenes                ║
║   - GET    /api/ordenes/:id            ║
║   - PUT    /api/ordenes/:id            ║
╚════════════════════════════════════════╝
      `);
    });
  } catch (error) {
    console.error('Error iniciando servidor:', error);
    process.exit(1);
  }
}

startServer();
import express from 'express';
import cors from 'cors';
import { initDatabase } from './config/database.js';
import { seedDatabase } from './seeds.js';
import authRoutes from './routes/auth.js';
import productRoutes from './routes/productos.js';
import ordenRoutes from './routes/ordenes.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:3000'],
  credentials: true
}));
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/productos', productRoutes);
app.use('/api/ordenes', ordenRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK' });
});

// Inicializar BD y servidor
async function startServer() {
  try {
    console.log('Inicializando base de datos...');
    await initDatabase();
    console.log('Base de datos inicializada');

    console.log('Poblando base de datos con datos iniciales...');
    await seedDatabase();
    console.log('Base de datos poblada');

    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
      console.log(`📌 API en http://localhost:${PORT}/api`);
    });
  } catch (error) {
    console.error('Error al iniciar servidor:', error);
    process.exit(1);
  }
}

startServer();

export default app;
