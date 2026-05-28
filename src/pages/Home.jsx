import { useProducts } from '../context/ProductsContext';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const { productos, loading, filtro, setFiltroCategoria } = useProducts();

  const categorias = [
    { id: 'todos', nombre: 'Todos' },
    { id: 'zapatillas', nombre: 'Zapatillas' },
    { id: 'remeras', nombre: 'Remeras' },
    { id: 'pantalones', nombre: 'Pantalones' },
    { id: 'mochilas', nombre: 'Mochilas' },
    { id: 'accesorios', nombre: 'Accesorios' }
  ];

  return (
    <div style={{ minHeight: '85vh', background: '#f8fafc', paddingBottom: '3rem' }}>
      <div style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        color: 'white',
        padding: '3rem 2rem',
        textAlign: 'center',
        marginBottom: '3rem'
      }}>
        <h1 style={{ margin: '0 0 0.5rem 0', fontSize: '2.5rem', fontWeight: '900' }}>
          ¡Bienvenido a <span style={{ color: '#f97316' }}>SportMax</span>!
        </h1>
        <p style={{ margin: '0', fontSize: '1.1rem', opacity: 0.9 }}>
          Los mejores artículos deportivos a los mejores precios.
        </p>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          marginBottom: '2rem',
          flexWrap: 'wrap'
        }}>
          {categorias.map(cat => (
            <button
              key={cat.id}
              onClick={() => setFiltroCategoria(cat.id)}
              style={{
                padding: '10px 18px',
                background: filtro === cat.id ? '#f97316' : 'white',
                color: filtro === cat.id ? 'white' : '#0f172a',
                border: filtro === cat.id ? 'none' : '1px solid #cbd5e1',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600',
                transition: 'all 0.2s',
                boxShadow: filtro === cat.id ? '0 4px 6px rgba(249, 115, 22, 0.3)' : 'none'
              }}
              onMouseEnter={(e) => {
                if (filtro !== cat.id) {
                  e.target.style.borderColor = '#f97316';
                  e.target.style.color = '#f97316';
                }
              }}
              onMouseLeave={(e) => {
                if (filtro !== cat.id) {
                  e.target.style.borderColor = '#cbd5e1';
                  e.target.style.color = '#0f172a';
                }
              }}
            >
              {cat.nombre}
            </button>
          ))}
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <p style={{ fontSize: '1.2rem', color: '#64748b' }}>Cargando productos...</p>
          </div>
        ) : productos.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', background: 'white', borderRadius: '12px' }}>
            <p style={{ fontSize: '1.2rem', color: '#64748b' }}>No hay productos en esta categoría.</p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: '1.5rem'
          }}>
            {productos.map(producto => (
              <ProductCard key={producto.id} producto={producto} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
