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
  },
  {
    id: 9,
    nombre: 'Camiseta Titular Godoy Cruz',
    precio: 45000,
    categoria: 'remeras',
    descripcion: 'Camiseta oficial del Tomba para alentar en el estadio.',
    stock: 15,
    imagen: 'https://via.placeholder.com/300x300?text=Camiseta+Godoy+Cruz'
  },
  {
    id: 10,
    nombre: 'Camiseta River Plate',
    precio: 45000,
    categoria: 'remeras',
    descripcion: 'Camiseta titular con la clásica banda roja.',
    stock: 20,
    imagen: 'https://via.placeholder.com/300x300?text=Camiseta+River'
  },
  {
    id: 11,
    nombre: 'Camiseta Boca Juniors',
    precio: 45000,
    categoria: 'remeras',
    descripcion: 'Camiseta titular azul y oro.',
    stock: 18,
    imagen: 'https://via.placeholder.com/300x300?text=Camiseta+Boca'
  },
  {
    id: 12,
    nombre: 'Camiseta Racing Club',
    precio: 45000,
    categoria: 'remeras',
    descripcion: 'La celeste y blanca oficial.',
    stock: 12,
    imagen: 'https://via.placeholder.com/300x300?text=Camiseta+Racing'
  },
  {
    id: 13,
    nombre: 'Botines Fútbol 5',
    precio: 65000,
    categoria: 'zapatillas',
    descripcion: 'Ideales para césped sintético y partidos semanales con amigos.',
    stock: 25,
    imagen: 'https://via.placeholder.com/300x300?text=Botines+Futbol'
  },
  {
    id: 14,
    nombre: 'Short Entrenamiento',
    precio: 15000,
    categoria: 'pantalones',
    descripcion: 'Short liviano, ideal para hacer bici o musculación.',
    stock: 30,
    imagen: 'https://via.placeholder.com/300x300?text=Short+Entrenamiento'
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
