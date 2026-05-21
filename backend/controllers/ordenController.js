import * as ordenModel from '../models/orden.js';
import * as productModel from '../models/producto.js';

export async function createOrden(req, res) {
  try {
    const { items } = req.body;
    const usuarioId = req.userId;

    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'Carrito vacío' });
    }

    let total = 0;
    
    // Validar stock y calcular total primero
    for (const item of items) {
      const producto = await productModel.getProductoById(item.id);

      if (!producto) {
        return res.status(404).json({ error: `Producto ${item.id} no encontrado` });
      }

      if (producto.stock < item.cantidad) {
        return res.status(400).json({ error: `Stock insuficiente para ${producto.nombre}` });
      }

      total += producto.precio * item.cantidad;
    }

    // Crear orden con total
    const orden = await ordenModel.createOrden(usuarioId, total);

    // Agregar items y actualizar stock
    for (const item of items) {
      const producto = await productModel.getProductoById(item.id);
      await ordenModel.createOrdenItem(orden.id, item.id, item.cantidad, producto.precio);
      await productModel.updateProducto(item.id, { stock: producto.stock - item.cantidad });
    }

    // Actualizar estado
    await ordenModel.updateOrdenEstado(orden.id, 'pendiente');
    const updatedOrden = await ordenModel.getOrdenById(orden.id);

    res.status(201).json(updatedOrden);
  } catch (error) {
    console.error('Error en createOrden:', error);
    res.status(500).json({ error: 'Error al crear orden' });
  }
}

export async function getOrdenesByUsuario(req, res) {
  try {
    const usuarioId = req.userId;
    const ordenes = await ordenModel.getOrdenByUsuario(usuarioId);

    res.json(ordenes);
  } catch (error) {
    console.error('Error en getOrdenesByUsuario:', error);
    res.status(500).json({ error: 'Error al obtener órdenes' });
  }
}

export async function getOrdenById(req, res) {
  try {
    const { id } = req.params;
    const orden = await ordenModel.getOrdenById(id);

    if (!orden) {
      return res.status(404).json({ error: 'Orden no encontrada' });
    }

    res.json(orden);
  } catch (error) {
    console.error('Error en getOrdenById:', error);
    res.status(500).json({ error: 'Error al obtener orden' });
  }
}

export async function updateOrdenEstado(req, res) {
  try {
    const { id } = req.params;
    const { estado } = req.body;

    const estados = ['pendiente', 'enviado', 'entregado', 'cancelado'];
    if (!estados.includes(estado)) {
      return res.status(400).json({ error: 'Estado inválido' });
    }

    const result = await ordenModel.updateOrdenEstado(id, estado);

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Orden no encontrada' });
    }

    res.json({ message: 'Orden actualizada' });
  } catch (error) {
    console.error('Error en updateOrdenEstado:', error);
    res.status(500).json({ error: 'Error al actualizar orden' });
  }
}
