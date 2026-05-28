import * as productModel from '../models/producto.js';

export async function getAllProductos(req, res) {
  try {
    const productos = await productModel.getAllProductos();
    res.json(productos);
  } catch (error) {
    console.error('Error en getAllProductos:', error);
    res.status(500).json({ error: 'Error al obtener productos' });
  }
}

export async function getProductoById(req, res) {
  try {
    const { id } = req.params;
    const producto = await productModel.getProductoById(id);

    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.json(producto);
  } catch (error) {
    console.error('Error en getProductoById:', error);
    res.status(500).json({ error: 'Error al obtener producto' });
  }
}

export async function getProductosByCategoria(req, res) {
  try {
    const { categoria } = req.params;
    const productos = await productModel.getProductosByCategoria(categoria);
    res.json(productos);
  } catch (error) {
    console.error('Error en getProductosByCategoria:', error);
    res.status(500).json({ error: 'Error al obtener productos' });
  }
}

export async function createProducto(req, res) {
  try {
    const { nombre, descripcion, precio, categoria, stock, imagen } = req.body;

    if (!nombre || !precio || !categoria || stock === undefined) {
      return res.status(400).json({ error: 'Campos requeridos faltantes' });
    }

    const result = await productModel.createProducto(nombre, descripcion, precio, categoria, stock, imagen);
    
    res.status(201).json({
      id: result.id,
      nombre,
      descripcion,
      precio,
      categoria,
      stock,
      imagen
    });
  } catch (error) {
    console.error('Error en createProducto:', error);
    res.status(500).json({ error: 'Error al crear producto' });
  }
}

export async function updateProducto(req, res) {
  try {
    const { id } = req.params;
    const updates = req.body;

    const result = await productModel.updateProducto(id, updates);

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.json({ message: 'Producto actualizado' });
  } catch (error) {
    console.error('Error en updateProducto:', error);
    res.status(500).json({ error: 'Error al actualizar producto' });
  }
}

export async function deleteProducto(req, res) {
  try {
    const { id } = req.params;

    const result = await productModel.deleteProducto(id);

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.json({ message: 'Producto eliminado' });
  } catch (error) {
    console.error('Error en deleteProducto:', error);
    res.status(500).json({ error: 'Error al eliminar producto' });
  }
}
