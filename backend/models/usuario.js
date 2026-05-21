import db from '../config/database.js';
import bcryptjs from 'bcryptjs';

export function getUserByEmail(email) {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM usuarios WHERE email = ?', [email], (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
}

export function getUserById(id) {
  return new Promise((resolve, reject) => {
    db.get('SELECT id, nombre, email, rol FROM usuarios WHERE id = ?', [id], (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
}

export function createUser(nombre, email, password, rol = 'user') {
  return new Promise(async (resolve, reject) => {
    try {
      const hashedPassword = await bcryptjs.hash(password, 10);
      
      db.run(
        'INSERT INTO usuarios (nombre, email, password, rol) VALUES (?, ?, ?, ?)',
        [nombre, email, hashedPassword, rol],
        function (err) {
          if (err) reject(err);
          else resolve({ id: this.lastID });
        }
      );
    } catch (error) {
      reject(error);
    }
  });
}

export function verifyPassword(password, hashedPassword) {
  return bcryptjs.compare(password, hashedPassword);
}
