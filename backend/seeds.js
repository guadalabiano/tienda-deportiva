import * as usuarioModel from './models/usuario.js';
import * as productoModel from './models/producto.js';

export async function seedDatabase() {
  try {
    // Verificar si ya hay datos
    const usuarios = await new Promise((resolve, reject) => {
      const db = (await import('./config/database.js')).default;
      db.all('SELECT COUNT(*) as count FROM usuarios', (err, rows) => {
        if (err) reject(err);
        else resolve(rows?.[0]?.count || 0);
      });
    });

    if (usuarios > 0) {
      console.log('Base de datos ya contiene datos, saltando seed');
      return;
    }

    // Crear usuarios
    console.log('Creando usuarios...');
    await usuarioModel.createUser('Admin', 'admin@tienda.com', '123456', 'admin');
    await usuarioModel.createUser('Usuario Demo', 'usuario@demo.com', '123456', 'user');

    // Crear productos
    console.log('Creando productos...');
    const productos = [
      {
        nombre: 'Zapatillas Running Pro',
        descripcion: 'Zapatillas diseñadas para corredores profesionales con tecnología de amortiguación avanzada.',
        precio: 12999,
        categoria: 'zapatillas',
        stock: 10,
        imagen: 'https://via.placeholder.com/300x300?text=Running+Pro'
      },
      {
        nombre: 'Remera Deportiva',
        descripcion: 'Remera transpirable ideal para entrenamientos intensos.',
        precio: 2499,
        categoria: 'remeras',
        stock: 25,
        imagen: 'https://via.placeholder.com/300x300?text=Remera+Deportiva'
      },
      {
        nombre: 'Pantalón Deportivo',
        descripcion: 'Pantalón cómodo con excelente flexibilidad para cualquier deporte.',
        precio: 3999,
        categoria: 'pantalones',
        stock: 15,
        imagen: 'https://via.placeholder.com/300x300?text=Pantalon+Deportivo'
      },
      {
        nombre: 'Medias Deportivas',
        descripcion: 'Medias con soporte ergonómico para mayor comodidad.',
        precio: 899,
        categoria: 'accesorios',
        stock: 50,
        imagen: 'https://via.placeholder.com/300x300?text=Medias+Deportivas'
      },
      {
        nombre: 'Mochila Deportiva',
        descripcion: 'Mochila resistente con múltiples compartimentos.',
        precio: 4999,
        categoria: 'mochilas',
        stock: 12,
        imagen: 'https://via.placeholder.com/300x300?text=Mochila+Deportiva'
      },
      {
        nombre: 'Botella Térmica',
        descripcion: 'Botella aislante que mantiene bebidas frías o calientes.',
        precio: 1999,
        categoria: 'accesorios',
        stock: 30,
        imagen: 'https://via.placeholder.com/300x300?text=Botella+Termica'
      },
      {
        nombre: 'Banda de Resistencia',
        descripcion: 'Banda elástica de resistencia para entrenamientos.',
        precio: 799,
        categoria: 'accesorios',
        stock: 40,
        imagen: 'https://via.placeholder.com/300x300?text=Banda+Resistencia'
      },
      {
        nombre: 'Zapatillas Casual',
        descripcion: 'Zapatillas cómodas para uso diario con diseño moderno.',
        precio: 8999,
        categoria: 'zapatillas',
        stock: 20,
        imagen: 'https://via.placeholder.com/300x300?text=Zapatillas+Casual'
      }
    ];

    for (const prod of productos) {
      await productoModel.createProducto(
        prod.nombre,
        prod.descripcion,
        prod.precio,
        prod.categoria,
        prod.stock,
        prod.imagen
      );
    }

    console.log('✓ Datos iniciales creados exitosamente');
  } catch (error) {
    console.error('Error poblando BD:', error);
  }
}
