import db from '../config/database.js';

export function createOrden(usuarioId, total) {
  return new Promise((resolve, reject) => {
    db.run(
      'INSERT INTO ordenes (usuarioId, total) VALUES (?, ?)',
      [usuarioId, total],
      function (err) {
        if (err) reject(err);
        else resolve({ id: this.lastID });
      }
    );
  });
}

export function createOrdenItem(ordenId, productoId, cantidad, precio) {
  return new Promise((resolve, reject) => {
    db.run(
      'INSERT INTO orden_items (ordenId, productoId, cantidad, precio) VALUES (?, ?, ?, ?)',
      [ordenId, productoId, cantidad, precio],
      function (err) {
        if (err) reject(err);
        else resolve({ id: this.lastID });
      }
    );
  });
}

export function getOrdenByUsuario(usuarioId) {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT o.*, 
              GROUP_CONCAT(json_object('id', oi.id, 'productoId', oi.productoId, 'cantidad', oi.cantidad, 'precio', oi.precio)) as items
       FROM ordenes o
       LEFT JOIN orden_items oi ON o.id = oi.ordenId
       WHERE o.usuarioId = ?
       GROUP BY o.id
       ORDER BY o.createdAt DESC`,
      [usuarioId],
      (err, rows) => {
        if (err) reject(err);
        else {
          const ordenes = (rows || []).map(orden => ({
            ...orden,
            items: orden.items ? JSON.parse(`[${orden.items}]`) : []
          }));
          resolve(ordenes);
        }
      }
    );
  });
}

export function getOrdenById(id) {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM ordenes WHERE id = ?', [id], (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
}

export function updateOrdenEstado(id, estado) {
  return new Promise((resolve, reject) => {
    db.run('UPDATE ordenes SET estado = ? WHERE id = ?', [estado, id], function (err) {
      if (err) reject(err);
      else resolve({ changes: this.changes });
    });
  });
}
