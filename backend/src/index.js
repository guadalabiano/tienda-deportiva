import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import router from './routes/index.js';

const app  = express();
const PORT = process.env.PORT || 3001;

// ── Middlewares globales ───────────────────────────────────
app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(express.json());

// ── Rutas ─────────────────────────────────────────────────
app.use('/api', router);

// ── Manejo de errores global ──────────────────────────────
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Error interno del servidor' });
});

app.listen(PORT, () =>
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
);
