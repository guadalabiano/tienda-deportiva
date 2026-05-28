import pool from '../config/db.js';

// Crear una orden a partir del carrito enviado desde el frontend
// Body: { items: [{ product_id, quantity }] }
export async function createOrder(req, res) {
  const { items } = req.body;
  if (!items?.length)
    return res.status(400).json({ message: 'El carrito está vacío' });

  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    // Verificar stock y calcular total
    let total = 0;
    const enriched = [];
    for (const item of items) {
      const [[product]] = await conn.query(
        'SELECT id, price, stock FROM products WHERE id = ? FOR UPDATE',
        [item.product_id]
      );
      if (!product)
        throw new Error(`Producto ${item.product_id} no encontrado`);
      if (product.stock < item.quantity)
        throw new Error(`Stock insuficiente para producto ${item.product_id}`);

      total += product.price * item.quantity;
      enriched.push({ ...item, unit_price: product.price });
    }

    // Insertar orden
    const [orderResult] = await conn.query(
      'INSERT INTO orders (user_id, total) VALUES (?, ?)',
      [req.user.id, total]
    );
    const orderId = orderResult.insertId;

    // Insertar ítems y descontar stock
    for (const item of enriched) {
      await conn.query(
        'INSERT INTO order_items (order_id, product_id, quantity, unit_price) VALUES (?,?,?,?)',
        [orderId, item.product_id, item.quantity, item.unit_price]
      );
      await conn.query(
        'UPDATE products SET stock = stock - ? WHERE id = ?',
        [item.quantity, item.product_id]
      );
    }

    await conn.commit();
    res.status(201).json({ order_id: orderId, total });
  } catch (err) {
    await conn.rollback();
    res.status(400).json({ message: err.message });
  } finally {
    conn.release();
  }
}

// Historial de órdenes del usuario logueado
export async function getUserOrders(req, res) {
  const [orders] = await pool.query(
    'SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC',
    [req.user.id]
  );

  for (const order of orders) {
    const [items] = await pool.query(
      `SELECT oi.*, p.name FROM order_items oi
       JOIN products p ON oi.product_id = p.id
       WHERE oi.order_id = ?`,
      [order.id]
    );
    order.items = items;
  }

  res.json(orders);
}

// Detalle de una orden (solo el dueño o admin)
export async function getOrder(req, res) {
  const [[order]] = await pool.query(
    'SELECT * FROM orders WHERE id = ?', [req.params.id]
  );
  if (!order) return res.status(404).json({ message: 'Orden no encontrada' });
  if (order.user_id !== req.user.id && req.user.role !== 'admin')
    return res.status(403).json({ message: 'Acceso denegado' });

  const [items] = await pool.query(
    `SELECT oi.*, p.name, p.image_url FROM order_items oi
     JOIN products p ON oi.product_id = p.id
     WHERE oi.order_id = ?`,
    [order.id]
  );
  res.json({ ...order, items });
}
