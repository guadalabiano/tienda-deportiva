import { useState, useEffect } from 'react';
import { useProducts } from '../context/ProductsContext';
import ProductCard from '../components/ProductCard';
import Chatbot from '../components/Chatbot';
export default function Home() {
  const { productos, allProductos, loading, filtro, setFiltroCategoria, busqueda } = useProducts();

  // --- LÓGICA DE FILTROS Y PAGINADO ---
  const [precioMin, setPrecioMin] = useState('');
  const [precioMax, setPrecioMax] = useState('');
  const [soloEnStock, setSoloEnStock] = useState(false);
  const [soloOfertas, setSoloOfertas] = useState(false);
  const [orden, setOrden] = useState('mejor');
  const [paginaActual, setPaginaActual] = useState(1);
  const productosPorPagina = 6;
  const productosDestacados = allProductos.filter(p => p.destacado);
  const productoOfertaDelDia = allProductos.find(p => p.oferta);

  // Reseteamos a la página 1 cada vez que cambiamos de categoría
  useEffect(() => {
    setPaginaActual(1);
  }, [filtro, soloEnStock, soloOfertas, orden]);

  // Matemática para buscar, filtrar por precio y cortar la lista
  const productosFiltrados = productos
    .filter(producto => {
      const coincideBusqueda = producto.nombre.toLowerCase().includes(busqueda.toLowerCase());
      const cumpleMinimo = precioMin === '' || producto.precio >= Number(precioMin);
      const cumpleMaximo = precioMax === '' || producto.precio <= Number(precioMax);
      return coincideBusqueda && cumpleMinimo && cumpleMaximo;
    })
    .filter(producto => !soloEnStock || producto.stock > 0)
    .filter(producto => !soloOfertas || producto.oferta)
    .slice()
    .sort((a, b) => {
      if (orden === 'menor') return a.precio - b.precio;
      if (orden === 'mayor') return b.precio - a.precio;
      return a.id - b.id;
    });

  const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina);
  const indiceUltimoProducto = paginaActual * productosPorPagina;
  const indicePrimerProducto = indiceUltimoProducto - productosPorPagina;
  const productosA_Mostrar = productosFiltrados.slice(indicePrimerProducto, indiceUltimoProducto);

  const categorias = [
    { id: 'todos', nombre: 'Todos' },
    { id: 'destacados', nombre: 'Destacados' },
    { id: 'zapatillas', nombre: 'Zapatillas' },
    { id: 'remeras', nombre: 'Remeras' },
    { id: 'pantalones', nombre: 'Pantalones' },
    { id: 'mochilas', nombre: 'Mochilas' },
    { id: 'accesorios', nombre: 'Accesorios' }
  ];

  return (
    <div style={{ minHeight: '85vh', background: '#f8fafc', paddingBottom: '3rem' }}>
      
      {/* Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        color: 'white',
        
        // --- ESTO ES LO ÚNICO QUE CAMBIA ACÁ ---
        padding: 'calc(3rem + 70px) 2rem 3rem 2rem', 
        marginTop: '-70px', 
        // ---------------------------------------

        textAlign: 'center',
        marginBottom: '3rem'
      }}>
        <h1 style={{ margin: '0 0 0.5rem 0', fontSize: '2.5rem', fontWeight: '900', color: 'white'  }}>
          ¡Bienvenido a <span style={{ color: '#f97316' }}>SportMax</span>!
        </h1>
        <p style={{ margin: '0', fontSize: '1.1rem', opacity: 0.9 }}>
          Los mejores artículos deportivos a los mejores precios.
        </p>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
        {productoOfertaDelDia && (
          <section style={{ marginBottom: '2rem', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 18px 40px rgba(15, 23, 42, 0.08)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', minHeight: '240px' }}>
              <div style={{ padding: '2.5rem', background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <span style={{ fontSize: '0.9rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#fbbf24', marginBottom: '1rem' }}>
                  Oferta del día
                </span>
                <h2 style={{ margin: 0, fontSize: '2.4rem', lineHeight: '1.1' }}>{productoOfertaDelDia.nombre}</h2>
                <p style={{ margin: '1rem 0', color: '#cbd5e1', maxWidth: '520px' }}>{productoOfertaDelDia.descripcion}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span style={{ fontSize: '2rem', fontWeight: '900', color: '#f97316' }}>${productoOfertaDelDia.precio.toLocaleString()}</span>
                  {productoOfertaDelDia.precioAnterior && (
                    <span style={{ fontSize: '1rem', color: '#94a3b8', textDecoration: 'line-through' }}>${productoOfertaDelDia.precioAnterior.toLocaleString()}</span>
                  )}
                </div>
                <p style={{ marginTop: '1rem', color: '#a5b4fc', fontWeight: '600' }}>Descuento especial por tiempo limitado.</p>
              </div>
              <div style={{ position: 'relative', overflow: 'hidden' }}>
                <img
                  src={productoOfertaDelDia.imagen || 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=700&q=80'}
                  alt={productoOfertaDelDia.nombre}
                  onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=700&q=80'; }}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            </div>
          </section>
        )}
        
        {/* Panel de Control: Búsqueda y Filtros */}
        <div style={{
         
          backgroundColor: '#ffffff', // Fondo blanco para tapar los productos al scrollear
          // ----------------------------------------
          
          padding: '1.5rem',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
          marginBottom: '2rem',
          border: '1px solid #e2e8f0'
        }}>
          

          {/* Fila 2: Categorías y Precios */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1.5rem'
          }}>
            
            {/* Categorías (Izquierda) */}
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {categorias.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => { setFiltroCategoria(cat.id); setPaginaActual(1); }}
                  style={{
                    padding: '8px 16px',
                    background: filtro === cat.id ? '#f97316' : '#f1f5f9',
                    color: filtro === cat.id ? 'white' : '#475569',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: '600',
                    fontSize: '0.9rem',
                    transition: 'all 0.2s',
                    boxShadow: filtro === cat.id ? '0 4px 6px rgba(249, 115, 22, 0.25)' : 'none'
                  }}
                  onMouseEnter={(e) => {
                    if (filtro !== cat.id) { e.target.style.background = '#e2e8f0'; }
                  }}
                  onMouseLeave={(e) => {
                    if (filtro !== cat.id) { e.target.style.background = '#f1f5f9'; }
                  }}
                >
                  {cat.nombre}
                </button>
              ))}
            </div>

            {/* Filtro de Precios (Derecha) */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.9rem', fontWeight: '600', color: '#475569' }}>Precio:</span>
              <input 
                type="number" 
                placeholder="Min $" 
                value={precioMin}
                onChange={(e) => { setPrecioMin(e.target.value); setPaginaActual(1); }}
                style={{ width: '85px', padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '0.9rem' }}
              />
              <span style={{ color: '#94a3b8' }}>-</span>
              <input 
                type="number" 
                placeholder="Max $" 
                value={precioMax}
                onChange={(e) => { setPrecioMax(e.target.value); setPaginaActual(1); }}
                style={{ width: '85px', padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '0.9rem' }}
              />
              <select
                value={orden}
                onChange={(e) => { setOrden(e.target.value); setPaginaActual(1); }}
                style={{ padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '0.9rem' }}
              >
                <option value="mejor">Orden recomendado</option>
                <option value="menor">Precio menor</option>
                <option value="mayor">Precio mayor</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '1rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#475569', fontSize: '0.9rem' }}>
              <input
                type="checkbox"
                checked={soloEnStock}
                onChange={(e) => { setSoloEnStock(e.target.checked); setPaginaActual(1); }}
                style={{ accentColor: '#f97316' }}
              />
              En stock
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#475569', fontSize: '0.9rem' }}>
              <input
                type="checkbox"
                checked={soloOfertas}
                onChange={(e) => { setSoloOfertas(e.target.checked); setPaginaActual(1); }}
                style={{ accentColor: '#f97316' }}
              />
              Solo ofertas
            </label>
          </div>

        </div>

        <div style={{ marginBottom: '1rem', color: '#475569', fontSize: '0.95rem' }}>
          Mostrando <strong>{productosFiltrados.length}</strong> resultados{filtro !== 'todos' ? ` en ${categorias.find(cat => cat.id === filtro)?.nombre}` : ''} · Página <strong>{paginaActual}</strong> de <strong>{totalPaginas || 1}</strong>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <p style={{ fontSize: '1.2rem', color: '#64748b' }}>Cargando productos...</p>
          </div>
        ) : productosA_Mostrar.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', background: 'white', borderRadius: '12px' }}>
            <p style={{ fontSize: '1.2rem', color: '#64748b' }}>No se encontraron productos con esos filtros</p>
          </div>
        ) : (
          <>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
              gap: '1.5rem',
              marginBottom: '3rem'
            }}>
              {productosA_Mostrar.map(producto => (
                <ProductCard key={producto.id} producto={producto} />
              ))}
            </div>

            {/* Controles de Paginado con Numeritos */}
            {totalPaginas > 1 && (
              <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                gap: '0.5rem',
                marginTop: '2rem' 
              }}>
                
                {/* Botón de flecha Anterior */}
                <button 
                  onClick={() => setPaginaActual(prev => Math.max(prev - 1, 1))}
                  disabled={paginaActual === 1}
                  style={{
                    padding: '8px 14px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    background: paginaActual === 1 ? '#f1f5f9' : 'white',
                    color: paginaActual === 1 ? '#94a3b8' : '#0f172a',
                    cursor: paginaActual === 1 ? 'not-allowed' : 'pointer',
                    fontWeight: 'bold'
                  }}
                >
                  &laquo;
                </button>

                {/* Generador automático de numeritos */}
                {Array.from({ length: totalPaginas }, (_, index) => index + 1).map(numero => (
                  <button
                    key={numero}
                    onClick={() => setPaginaActual(numero)}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '8px',
                      border: paginaActual === numero ? 'none' : '1px solid #cbd5e1',
                      background: paginaActual === numero ? '#f97316' : 'white',
                      color: paginaActual === numero ? 'white' : '#0f172a',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      boxShadow: paginaActual === numero ? '0 4px 6px rgba(249, 115, 22, 0.3)' : 'none',
                      transition: 'all 0.2s'
                    }}
                  >
                    {numero}
                  </button>
                ))}

                {/* Botón de flecha Siguiente */}
                <button 
                  onClick={() => setPaginaActual(prev => Math.min(prev + 1, totalPaginas))}
                  disabled={paginaActual === totalPaginas}
                  style={{
                    padding: '8px 14px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    background: paginaActual === totalPaginas ? '#f1f5f9' : 'white',
                    color: paginaActual === totalPaginas ? '#94a3b8' : '#0f172a',
                    cursor: paginaActual === totalPaginas ? 'not-allowed' : 'pointer',
                    fontWeight: 'bold'
                  }}
                >
                  &raquo;
                </button>
                
              </div>
            )}
          </>
        )}
      </div>
      <Chatbot />
    </div>
  );
}
