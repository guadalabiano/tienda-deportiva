import pool from '../config/db.js';

export async function getAll(req, res) {
  const [rows] = await pool.query('SELECT * FROM categories ORDER BY name');
  res.json(rows);
}

export async function create(req, res) {
  const { name, description } = req.body;
  if (!name) return res.status(400).json({ message: 'El nombre es obligatorio' });

  const [result] = await pool.query(
    'INSERT INTO categories (name, description) VALUES (?,?)',
    [name, description || null]
  );
  res.status(201).json({ id: result.insertId, name });
}

export async function remove(req, res) {
  const [result] = await pool.query('DELETE FROM categories WHERE id=?', [req.params.id]);
  if (!result.affectedRows) return res.status(404).json({ message: 'Categoría no encontrada' });
  res.json({ message: 'Categoría eliminada' });
}
