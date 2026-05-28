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
import mercadoPagoRoutes from './routes/mercadopago.js';

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
app.use('/api/mercadopago', mercadoPagoRoutes);

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
