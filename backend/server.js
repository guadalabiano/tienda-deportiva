import express from 'express';
import cors from 'cors';
import { initDatabase } from './config/database.js';
import { seedDatabase } from './seeds.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { mkdir } from 'fs/promises';
import 'dotenv/config';

import authRoutes from './routes/auth.js';
import productosRoutes from './routes/productos.js';
import ordenesRoutes from './routes/ordenes.js';
import mercadoPagoRoutes from './routes/mercadopago.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración de CORS ultra permisiva para que el error de conexión desaparezca
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/productos', productosRoutes);
app.use('/api/ordenes', ordenesRoutes);
app.use('/api/mercadopago', mercadoPagoRoutes);

// Inicializar servidor
async function startServer() {
  try {
    await mkdir(join(__dirname, 'data'), { recursive: true });
    await initDatabase();
    await seedDatabase();
    
    app.listen(PORT, () => {
      console.log(`🚀 SERVIDOR ACTIVO EN PUERTO ${PORT}`);
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

startServer();