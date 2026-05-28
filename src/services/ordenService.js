// Datos de órdenes en memoria
const ordenesDB = [];

export const ordenService = {
  createOrden: async (items) => {
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (!items || items.length === 0) {
      throw new Error('La orden debe contener al menos un producto');
    }

    const nuevaOrden = {
      id: ordenesDB.length + 1,
      items,
      total: items.reduce((sum, item) => sum + (item.precio * item.cantidad), 0),
      estado: 'pendiente',
      fechaCreacion: new Date().toISOString(),
      usuario_id: 1 // Simulado
    };

    ordenesDB.push(nuevaOrden);
    return nuevaOrden;
  },

  getOrdenesByUsuario: async () => {
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...ordenesDB];
  },

  getOrdenById: async (id) => {
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const orden = ordenesDB.find(o => o.id === parseInt(id));
    if (!orden) {
      throw new Error('Orden no encontrada');
    }
    return { ...orden };
  },

  updateOrdenEstado: async (id, estado) => {
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const orden = ordenesDB.find(o => o.id === parseInt(id));
    if (!orden) {
      throw new Error('Orden no encontrada');
    }
    
    orden.estado = estado;
    return { ...orden };
  }
};
