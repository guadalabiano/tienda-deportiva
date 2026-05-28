import api from './api';

export const productService = {
  getAllProductos: async () => {
    const response = await api.get('/productos');
    return response.data;
  },

  getProductoById: async (id) => {
    const response = await api.get(`/productos/${id}`);
    return response.data;
  },

  getProductosByCategoria: async (categoria) => {
    const response = await api.get(`/productos/categoria/${categoria}`);
    return response.data;
  },

  createProducto: async (datos) => {
    const response = await api.post('/productos', datos);
    return response.data;
  },

  updateProducto: async (id, datos) => {
    const response = await api.put(`/productos/${id}`, datos);
    return response.data;
  },

  deleteProducto: async (id) => {
    const response = await api.delete(`/productos/${id}`);
    return response.data;
  }
};
