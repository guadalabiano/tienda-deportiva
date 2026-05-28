import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dbPath = join(__dirname, 'data', 'tienda.db');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error al conectar con la BD:', err);
  } else {
    console.log('Conectado a SQLite');
  }
});

// Crear tablas si no existen
export function initDatabase() {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      // Tabla de usuarios
      db.run(`
        CREATE TABLE IF NOT EXISTS usuarios (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nombre TEXT NOT NULL,
          email TEXT UNIQUE NOT NULL,
          password TEXT NOT NULL,
          rol TEXT DEFAULT 'user',
          createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);

      // Tabla de productos
      db.run(`
        CREATE TABLE IF NOT EXISTS productos (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nombre TEXT NOT NULL,
          descripcion TEXT,
          precio REAL NOT NULL,
          categoria TEXT NOT NULL,
          stock INTEGER NOT NULL,
          imagen TEXT,
          createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);

      // Tabla de órdenes
      db.run(`
        CREATE TABLE IF NOT EXISTS ordenes (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          usuarioId INTEGER NOT NULL,
          total REAL NOT NULL,
          estado TEXT DEFAULT 'pendiente',
          createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (usuarioId) REFERENCES usuarios(id)
        )
      `);

      // Tabla de items de órdenes
      db.run(`
        CREATE TABLE IF NOT EXISTS orden_items (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          ordenId INTEGER NOT NULL,
          productoId INTEGER NOT NULL,
          cantidad INTEGER NOT NULL,
          precio REAL NOT NULL,
          FOREIGN KEY (ordenId) REFERENCES ordenes(id),
          FOREIGN KEY (productoId) REFERENCES productos(id)
        )
      `, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  });
}

export default db;
