import { useState, useEffect } from 'react';
import { useProducts } from '../context/ProductsContext';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const { productos, loading, filtro, setFiltroCategoria } = useProducts();

  // --- LÓGICA DE FILTROS Y PAGINADO ---
  const [busqueda, setBusqueda] = useState('');
  const [precioMin, setPrecioMin] = useState('');
  const [precioMax, setPrecioMax] = useState('');
  const [paginaActual, setPaginaActual] = useState(1);
  const productosPorPagina = 6;

  // Reseteamos a la página 1 cada vez que cambiamos de categoría
  useEffect(() => {
    setPaginaActual(1);
  }, [filtro]);

  // Matemática para buscar, filtrar por precio y cortar la lista
  const productosFiltrados = productos.filter(producto => {
    const coincideBusqueda = producto.nombre.toLowerCase().includes(busqueda.toLowerCase());
    const cumpleMinimo = precioMin === '' || producto.precio >= Number(precioMin);
    const cumpleMaximo = precioMax === '' || producto.precio <= Number(precioMax);
    return coincideBusqueda && cumpleMinimo && cumpleMaximo;
  });

  const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina);
  const indiceUltimoProducto = paginaActual * productosPorPagina;
  const indicePrimerProducto = indiceUltimoProducto - productosPorPagina;
  const productosA_Mostrar = productosFiltrados.slice(indicePrimerProducto, indiceUltimoProducto);

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
          Los mejores artículos deportivos a los mejores precios
        </p>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
        
        {/* Panel de Control: Búsqueda y Filtros */}
        <div style={{
         position: 'sticky',
          top: '70px', // IMPORTANTE: Ajustá este número para que coincida con el alto de tu NavBar azul
          zIndex: '900',
          backgroundColor: '#ffffff', // Fondo blanco para tapar los productos al scrollear
          // ----------------------------------------
          
          padding: '1.5rem',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
          marginBottom: '2rem',
          border: '1px solid #e2e8f0'
        }}>
          
          {/* Fila 1: Buscador estilizado */}
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: '15px', top: '12px', fontSize: '1.1rem', opacity: '0.6' }}>🔍</span>
              <input 
                type="text" 
                placeholder="Buscar por nombre (ej: Zapatillas, Camiseta...)" 
                value={busqueda}
                onChange={(e) => { setBusqueda(e.target.value); setPaginaActual(1); }}
                style={{
                  width: '100%',
                  padding: '12px 20px 12px 45px',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  fontSize: '1rem',
                  outline: 'none',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.2s'
                }}
                onFocus={(e) => e.target.style.borderColor = '#f97316'}
                onBlur={(e) => e.target.style.borderColor = '#cbd5e1'}
              />
            </div>
          </div>

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
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
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
            </div>

          </div>
        </div>

        {/* Grid de productos */}
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
    </div>
  );
}