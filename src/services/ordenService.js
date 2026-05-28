import api from './api';

export const ordenService = {
  createOrden: async (items) => {
    const response = await api.post('/ordenes', { items });
    return response.data;
  },

  getOrdenesByUsuario: async () => {
    const response = await api.get('/ordenes');
    return response.data;
  },

  getOrdenById: async (id) => {
    const response = await api.get(`/ordenes/${id}`);
    return response.data;
  },

  updateOrdenEstado: async (id, estado) => {
    const response = await api.put(`/ordenes/${id}`, { estado });
    return response.data;
  }
};
