import api from './api';

export const authService = {
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data.user;
  },

  registro: async (nombre, email, password) => {
    const response = await api.post('/auth/registro', { nombre, email, password });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data.user;
  },

  logout: () => {
    localStorage.removeItem('token');
  },

  getProfile: async () => {
    const response = await api.get('/auth/profile');
    return response.data;
  }
};
