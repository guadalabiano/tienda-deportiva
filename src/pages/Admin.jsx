import { useState } from 'react';
import { useProducts } from '../context/ProductsContext';
import { useAuth } from '../context/AuthContext';
import { productService } from '../services/productService';

export default function Admin() {
  const { user } = useAuth();
  const { allProductos, recargarProductos } = useProducts();
  const [loading, setLoading] = useState(false);
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: '',
    precio: '',
    categoria: '',
    descripcion: '',
    stock: ''
  });

  // Verificar si es admin
  if (!user || user.rol !== 'admin') {
    return (
      <div style={{
        minHeight: '85vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f8fafc'
      }}>
        <div style={{
          textAlign: 'center',
          background: 'white',
          padding: '3rem',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
        }}>
          <h2 style={{ color: '#dc2626', marginBottom: '1rem' }}>Acceso Denegado</h2>
          <p style={{ color: '#64748b' }}>
            Solo administradores pueden acceder a esta página.
          </p>
        </div>
      </div>
    );
  }

  const handleAddProduct = async (e) => {
    e.preventDefault();
    
    if (!nuevoProducto.nombre || !nuevoProducto.precio || !nuevoProducto.categoria || !nuevoProducto.stock) {
      alert('Por favor completa todos los campos');
      return;
    }

    setLoading(true);
    try {
      await productService.createProducto({
        nombre: nuevoProducto.nombre,
        precio: parseFloat(nuevoProducto.precio),
        categoria: nuevoProducto.categoria,
        descripcion: nuevoProducto.descripcion,
        stock: parseInt(nuevoProducto.stock)
      });
      
      alert('Producto agregado exitosamente');
      setNuevoProducto({
        nombre: '',
        precio: '',
        categoria: '',
        descripcion: '',
        stock: ''
      });
      
      await recargarProductos();
    } catch (err) {
      alert(err.message || 'Error al agregar el producto');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      return;
    }

    setLoading(true);
    try {
      await productService.deleteProducto(id);
      alert('Producto eliminado exitosamente');
      await recargarProductos();
    } catch (err) {
      alert(err.message || 'Error al eliminar el producto');
    } finally {
      setLoading(false);
    }
  };

  const categorias = [
    'zapatillas',
    'remeras',
    'pantalones',
    'mochilas',
    'accesorios'
  ];

  return (
    <div style={{ minHeight: '85vh', background: '#f8fafc', paddingBottom: '3rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' }}>
        
        <h1 style={{ color: '#0f172a', marginBottom: '0.5rem' }}>
          Panel de Administración
        </h1>
        <p style={{ color: '#64748b', marginBottom: '2rem' }}>
          Bienvenido, {user.nombre}
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '3rem' }}>
          
          {/* Estadísticas */}
          <div style={{
            background: 'white',
            padding: '1.5rem',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
          }}>
            <p style={{ margin: '0 0 0.5rem 0', color: '#64748b', fontSize: '0.9rem' }}>
              Total de Productos
            </p>
            <p style={{ margin: 0, fontSize: '2rem', fontWeight: '700', color: '#f97316' }}>
              {allProductos.length}
            </p>
          </div>

          <div style={{
            background: 'white',
            padding: '1.5rem',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
          }}>
            <p style={{ margin: '0 0 0.5rem 0', color: '#64748b', fontSize: '0.9rem' }}>
              Stock Total
            </p>
            <p style={{ margin: 0, fontSize: '2rem', fontWeight: '700', color: '#16a34a' }}>
              {allProductos.reduce((sum, p) => sum + p.stock, 0)}
            </p>
          </div>
        </div>

        {/* Formulario de nuevo producto */}
        <div style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
          marginBottom: '3rem'
        }}>
          <h2 style={{ margin: '0 0 1.5rem 0', color: '#0f172a' }}>
            Agregar Nuevo Producto
          </h2>

          <form onSubmit={handleAddProduct} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            
            <input
              type="text"
              placeholder="Nombre del producto"
              value={nuevoProducto.nombre}
              onChange={(e) => setNuevoProducto({ ...nuevoProducto, nombre: e.target.value })}
              style={{
                padding: '12px',
                border: '1px solid #cbd5e1',
                borderRadius: '8px',
                fontSize: '1rem',
                outline: 'none'
              }}
              required
            />

            <input
              type="number"
              placeholder="Precio"
              value={nuevoProducto.precio}
              onChange={(e) => setNuevoProducto({ ...nuevoProducto, precio: e.target.value })}
              style={{
                padding: '12px',
                border: '1px solid #cbd5e1',
                borderRadius: '8px',
                fontSize: '1rem',
                outline: 'none'
              }}
              required
            />

            <select
              value={nuevoProducto.categoria}
              onChange={(e) => setNuevoProducto({ ...nuevoProducto, categoria: e.target.value })}
              style={{
                padding: '12px',
                border: '1px solid #cbd5e1',
                borderRadius: '8px',
                fontSize: '1rem',
                outline: 'none'
              }}
              required
            >
              <option value="">Seleccionar categoría</option>
              {categorias.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            <input
              type="number"
              placeholder="Stock"
              value={nuevoProducto.stock}
              onChange={(e) => setNuevoProducto({ ...nuevoProducto, stock: e.target.value })}
              style={{
                padding: '12px',
                border: '1px solid #cbd5e1',
                borderRadius: '8px',
                fontSize: '1rem',
                outline: 'none'
              }}
              required
            />

            <textarea
              placeholder="Descripción"
              value={nuevoProducto.descripcion}
              onChange={(e) => setNuevoProducto({ ...nuevoProducto, descripcion: e.target.value })}
              style={{
                padding: '12px',
                border: '1px solid #cbd5e1',
                borderRadius: '8px',
                fontSize: '1rem',
                outline: 'none',
                gridColumn: '1 / -1',
                minHeight: '100px',
                fontFamily: 'system-ui'
              }}
              required
            />

            <button
              type="submit"
              disabled={loading}
              style={{
                gridColumn: '1 / -1',
                background: loading ? '#cbd5e1' : '#16a34a',
                color: 'white',
                border: 'none',
                padding: '12px',
                borderRadius: '8px',
                fontWeight: '600',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => !loading && (e.target.style.background = '#15803d')}
              onMouseLeave={(e) => !loading && (e.target.style.background = '#16a34a')}
            >
              {loading ? 'Agregando...' : 'Agregar Producto'}
            </button>
          </form>
        </div>

        {/* Tabla de productos */}
        <div style={{
          background: 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
          overflow: 'hidden'
        }}>
          <div style={{
            padding: '1.5rem',
            borderBottom: '1px solid #e2e8f0',
            background: '#f1f5f9'
          }}>
            <h2 style={{ margin: 0, color: '#0f172a' }}>Productos</h2>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: '0.9rem'
            }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                  <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: '#0f172a' }}>
                    Producto
                  </th>
                  <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: '#0f172a' }}>
                    Categoría
                  </th>
                  <th style={{ padding: '1rem', textAlign: 'right', fontWeight: '600', color: '#0f172a' }}>
                    Precio
                  </th>
                  <th style={{ padding: '1rem', textAlign: 'right', fontWeight: '600', color: '#0f172a' }}>
                    Stock
                  </th>
                  <th style={{ padding: '1rem', textAlign: 'center', fontWeight: '600', color: '#0f172a' }}>
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {allProductos.map(producto => (
                  <tr key={producto.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '1rem', color: '#0f172a' }}>
                      {producto.nombre}
                    </td>
                    <td style={{ padding: '1rem', color: '#64748b', textTransform: 'capitalize' }}>
                      {producto.categoria}
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'right', color: '#f97316', fontWeight: '600' }}>
                      ${producto.precio.toLocaleString()}
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'right' }}>
                      <span style={{
                        background: producto.stock > 5 ? '#dcfce7' : producto.stock > 0 ? '#fef3c7' : '#fee2e2',
                        color: producto.stock > 5 ? '#15803d' : producto.stock > 0 ? '#92400e' : '#dc2626',
                        padding: '6px 12px',
                        borderRadius: '6px',
                        fontSize: '0.85rem',
                        fontWeight: '600'
                      }}>
                        {producto.stock}
                      </span>
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'center' }}>
                      <button
                        style={{
                          background: 'transparent',
                          border: 'none',
                          color: '#3b82f6',
                          cursor: 'pointer',
                          fontWeight: '600',
                          marginRight: '1rem'
                        }}
                        onClick={() => alert('Función de editar en desarrollo')}
                      >
                        Editar
                      </button>
                      <button
                        disabled={loading}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          color: loading ? '#cbd5e1' : '#dc2626',
                          cursor: loading ? 'not-allowed' : 'pointer',
                          fontWeight: '600'
                        }}
                        onClick={() => handleDeleteProduct(producto.id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}