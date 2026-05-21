import db from '../config/database.js';

export function getAllProductos() {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM productos', (err, rows) => {
      if (err) reject(err);
      else resolve(rows || []);
    });
  });
}

export function getProductoById(id) {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM productos WHERE id = ?', [id], (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
}

export function getProductosByCategoria(categoria) {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM productos WHERE categoria = ?', [categoria], (err, rows) => {
      if (err) reject(err);
      else resolve(rows || []);
    });
  });
}

export function createProducto(nombre, descripcion, precio, categoria, stock, imagen) {
  return new Promise((resolve, reject) => {
    db.run(
      'INSERT INTO productos (nombre, descripcion, precio, categoria, stock, imagen) VALUES (?, ?, ?, ?, ?, ?)',
      [nombre, descripcion, precio, categoria, stock, imagen],
      function (err) {
        if (err) reject(err);
        else resolve({ id: this.lastID });
      }
    );
  });
}

export function updateProducto(id, updates) {
  const fields = Object.keys(updates).map(key => `${key} = ?`).join(', ');
  const values = [...Object.values(updates), id];

  return new Promise((resolve, reject) => {
    db.run(
      `UPDATE productos SET ${fields} WHERE id = ?`,
      values,
      function (err) {
        if (err) reject(err);
        else resolve({ changes: this.changes });
      }
    );
  });
}

export function deleteProducto(id) {
  return new Promise((resolve, reject) => {
    db.run('DELETE FROM productos WHERE id = ?', [id], function (err) {
      if (err) reject(err);
      else resolve({ changes: this.changes });
    });
  });
}
