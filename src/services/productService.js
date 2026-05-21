// Datos de productos en memoria
const productosDB = [
  {
    id: 1,
    nombre: 'Zapatillas Running Pro',
    precio: 12999,
    categoria: 'zapatillas',
    descripcion: 'Zapatillas diseñadas para corredores profesionales con tecnología de amortiguación avanzada.',
    stock: 10,
    imagen: 'https://via.placeholder.com/300x300?text=Zapatillas+Running+Pro'
  },
  {
    id: 2,
    nombre: 'Remera Deportiva',
    precio: 2499,
    categoria: 'remeras',
    descripcion: 'Remera transpirable ideal para entrenamientos intensos.',
    stock: 25,
    imagen: 'https://via.placeholder.com/300x300?text=Remera+Deportiva'
  },
  {
    id: 3,
    nombre: 'Pantalón Deportivo',
    precio: 3999,
    categoria: 'pantalones',
    descripcion: 'Pantalón cómodo con excelente flexibilidad para cualquier deporte.',
    stock: 15,
    imagen: 'https://via.placeholder.com/300x300?text=Pantalon+Deportivo'
  },
  {
    id: 4,
    nombre: 'Medias Deportivas',
    precio: 899,
    categoria: 'accesorios',
    descripcion: 'Medias con soporte ergonómico para mayor comodidad.',
    stock: 50,
    imagen: 'https://via.placeholder.com/300x300?text=Medias+Deportivas'
  },
  {
    id: 5,
    nombre: 'Mochila Deportiva',
    precio: 4999,
    categoria: 'mochilas',
    descripcion: 'Mochila resistente con múltiples compartimentos.',
    stock: 12,
    imagen: 'https://via.placeholder.com/300x300?text=Mochila+Deportiva'
  },
  {
    id: 6,
    nombre: 'Botella Térmica',
    precio: 1999,
    categoria: 'accesorios',
    descripcion: 'Botella aislante que mantiene bebidas frías o calientes.',
    stock: 30,
    imagen: 'https://via.placeholder.com/300x300?text=Botella+Termica'
  },
  {
    id: 7,
    nombre: 'Banda de Resistencia',
    precio: 799,
    categoria: 'accesorios',
    descripcion: 'Banda elástica de resistencia para entrenamientos.',
    stock: 40,
    imagen: 'https://via.placeholder.com/300x300?text=Banda+Resistencia'
  },
  {
    id: 8,
    nombre: 'Zapatillas Casual',
    precio: 8999,
    categoria: 'zapatillas',
    descripcion: 'Zapatillas cómodas para uso diario con diseño moderno.',
    stock: 20,
    imagen: 'https://via.placeholder.com/300x300?text=Zapatillas+Casual'
  }
];

export const productService = {
  getAllProductos: async () => {
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...productosDB];
  },

  getProductoById: async (id) => {
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 200));
    const producto = productosDB.find(p => p.id === parseInt(id));
    if (!producto) {
      throw new Error('Producto no encontrado');
    }
    return { ...producto };
  },

  getProductosByCategoria: async (categoria) => {
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 300));
    if (categoria === 'todos') {
      return [...productosDB];
    }
    return productosDB.filter(p => p.categoria === categoria);
  },

  createProducto: async (datos) => {
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const nuevoProducto = {
      id: Math.max(...productosDB.map(p => p.id)) + 1,
      ...datos,
      precio: parseFloat(datos.precio),
      stock: parseInt(datos.stock),
      imagen: datos.imagen || 'https://via.placeholder.com/300x300?text=' + encodeURIComponent(datos.nombre)
    };
    
    productosDB.push(nuevoProducto);
    return nuevoProducto;
  },

  updateProducto: async (id, datos) => {
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const index = productosDB.findIndex(p => p.id === parseInt(id));
    if (index === -1) {
      throw new Error('Producto no encontrado');
    }
    
    productosDB[index] = { ...productosDB[index], ...datos };
    return { ...productosDB[index] };
  },

  deleteProducto: async (id) => {
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const index = productosDB.findIndex(p => p.id === parseInt(id));
    if (index === -1) {
      throw new Error('Producto no encontrado');
    }
    
    const producto = productosDB[index];
    productosDB.splice(index, 1);
    return producto;
  }
};
