import pool from '../config/db.js';

export async function getAll(req, res) {
  const { category_id, search } = req.query;
  let sql = `
    SELECT p.*, c.name AS category_name
    FROM products p
    LEFT JOIN categories c ON p.category_id = c.id
    WHERE 1=1
  `;
  const params = [];

  if (category_id) { sql += ' AND p.category_id = ?'; params.push(category_id); }
  if (search)       { sql += ' AND p.name LIKE ?';    params.push(`%${search}%`); }

  sql += ' ORDER BY p.created_at DESC';
  const [rows] = await pool.query(sql, params);
  res.json(rows);
}

export async function getOne(req, res) {
  const [rows] = await pool.query(
    `SELECT p.*, c.name AS category_name
     FROM products p
     LEFT JOIN categories c ON p.category_id = c.id
     WHERE p.id = ?`,
    [req.params.id]
  );
  if (!rows.length) return res.status(404).json({ message: 'Producto no encontrado' });
  res.json(rows[0]);
}

export async function create(req, res) {
  const { category_id, name, description, price, stock, image_url } = req.body;
  if (!name || price == null)
    return res.status(400).json({ message: 'Nombre y precio son obligatorios' });

  const [result] = await pool.query(
    'INSERT INTO products (category_id, name, description, price, stock, image_url) VALUES (?,?,?,?,?,?)',
    [category_id || null, name, description || null, price, stock ?? 0, image_url || null]
  );
  res.status(201).json({ id: result.insertId, name, price });
}

export async function update(req, res) {
  const { category_id, name, description, price, stock, image_url } = req.body;
  const [result] = await pool.query(
    `UPDATE products
     SET category_id=?, name=?, description=?, price=?, stock=?, image_url=?
     WHERE id=?`,
    [category_id, name, description, price, stock, image_url, req.params.id]
  );
  if (!result.affectedRows) return res.status(404).json({ message: 'Producto no encontrado' });
  res.json({ message: 'Producto actualizado' });
}

export async function remove(req, res) {
  const [result] = await pool.query('DELETE FROM products WHERE id=?', [req.params.id]);
  if (!result.affectedRows) return res.status(404).json({ message: 'Producto no encontrado' });
  res.json({ message: 'Producto eliminado' });
}
