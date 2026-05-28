import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { useProducts } from '../context/ProductsContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export default function DetalleProducto() {
  const { id } = useParams();
  const { getProductoById } = useProducts();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [cantidad, setCantidad] = useState(1);

  const producto = getProductoById(id);
  const inWishlist = producto ? isInWishlist(producto.id) : false;

  if (!producto) {
    return (
      <div style={{ minHeight: '85vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc' }}>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ color: '#0f172a', marginBottom: '1rem' }}>Producto no encontrado</h2>
          <Link to="/" style={{
            display: 'inline-block',
            background: '#f97316',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: '600'
          }}>
            Volver al catálogo
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < cantidad; i++) {
      addToCart(producto);
    }
    alert(`${cantidad} ${cantidad === 1 ? 'unidad' : 'unidades'} de ${producto.nombre} agregado al carrito`);
  };

  return (
    <div style={{ minHeight: '85vh', background: '#f8fafc', paddingBottom: '3rem' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem 1rem' }}>
        
        {/* Breadcrumb */}
        <div style={{ marginBottom: '2rem' }}>
          <Link to="/" style={{ color: '#f97316', textDecoration: 'none', fontWeight: '600' }}>
            ← Volver al catálogo
          </Link>
        </div>

        {/* Contenedor principal */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '3rem',
          background: 'white',
          padding: '2rem',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
        }}>
          
          {/* Imagen */}
          <div>
            <img
              src={producto.imagen}
              alt={producto.nombre}
              onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/800x600?text=Imagen+no+disponible'; }}
              style={{
                width: '100%',
                borderRadius: '12px',
                objectFit: 'cover',
                background: '#e2e8f0'
              }}
            />
          </div>

          {/* Detalles */}
          <div>
            <h1 style={{ margin: '0 0 1rem 0', color: '#0f172a', fontSize: '2rem' }}>
              {producto.nombre}
            </h1>

            <div style={{ marginBottom: '2rem' }}>
              <span style={{
                display: 'inline-block',
                background: '#fef3c7',
                color: '#92400e',
                padding: '8px 12px',
                borderRadius: '6px',
                fontSize: '0.85rem',
                fontWeight: '600',
                textTransform: 'capitalize'
              }}>
                {producto.categoria}
              </span>
            </div>

            <p style={{
              fontSize: '1.1rem',
              color: '#64748b',
              marginBottom: '2rem',
              lineHeight: '1.6'
            }}>
              {producto.descripcion}
            </p>

            {/* Precio */}
            <div style={{
              background: '#f1f5f9',
              padding: '1.5rem',
              borderRadius: '8px',
              marginBottom: '2rem'
            }}>
              <p style={{ margin: '0 0 0.5rem 0', color: '#64748b', fontSize: '0.9rem' }}>
                Precio unitario
              </p>
              <p style={{
                margin: 0,
                fontSize: '2.5rem',
                fontWeight: '700',
                color: '#f97316'
              }}>
                ${producto.precio.toLocaleString()}
              </p>
            </div>

            {/* Stock */}
            <div style={{ marginBottom: '2rem' }}>
              {producto.stock > 0 ? (
                <p style={{ color: '#16a34a', fontWeight: '600' }}>
                  ✓ En stock ({producto.stock} disponibles)
                </p>
              ) : (
                <p style={{ color: '#dc2626', fontWeight: '600' }}>
                  ✗ Sin stock
                </p>
              )}
            </div>

            {/* Cantidad */}
            {producto.stock > 0 && (
              <div style={{ marginBottom: '2rem' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontWeight: '600',
                  color: '#0f172a'
                }}>
                  Cantidad:
                </label>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: '#f1f5f9',
                  borderRadius: '8px',
                  width: 'fit-content',
                  padding: '0.25rem'
                }}>
                  <button
                    onClick={() => setCantidad(Math.max(1, cantidad - 1))}
                    style={{
                      width: '40px',
                      height: '40px',
                      border: 'none',
                      background: 'transparent',
                      cursor: 'pointer',
                      fontSize: '1.2rem'
                    }}
                  >
                    −
                  </button>
                  <input
                    type="number"
                    value={cantidad}
                    onChange={(e) => setCantidad(Math.max(1, parseInt(e.target.value) || 1))}
                    min="1"
                    max={producto.stock}
                    style={{
                      width: '50px',
                      border: 'none',
                      background: 'transparent',
                      textAlign: 'center',
                      fontSize: '1rem',
                      fontWeight: '600',
                      outline: 'none'
                    }}
                  />
                  <button
                    onClick={() => setCantidad(Math.min(producto.stock, cantidad + 1))}
                    style={{
                      width: '40px',
                      height: '40px',
                      border: 'none',
                      background: 'transparent',
                      cursor: 'pointer',
                      fontSize: '1.2rem'
                    }}
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            {/* Botón agregar */}
            {producto.stock > 0 ? (
              <>
                <button
                  onClick={handleAddToCart}
                  style={{
                    width: '100%',
                    background: '#f97316',
                    color: 'white',
                    border: 'none',
                    padding: '16px',
                    borderRadius: '8px',
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: 'background 0.2s',
                    boxShadow: '0 4px 6px rgba(249, 115, 22, 0.3)'
                  }}
                  onMouseEnter={(e) => e.target.style.background = '#ea580c'}
                  onMouseLeave={(e) => e.target.style.background = '#f97316'}
                >
                  🛒 Agregar al carrito
                </button>
                <button
                  onClick={() => toggleWishlist(producto)}
                  style={{
                    width: '100%',
                    marginTop: '0.75rem',
                    background: inWishlist ? '#f97316' : '#f1f5f9',
                    color: inWishlist ? 'white' : '#0f172a',
                    border: inWishlist ? 'none' : '1px solid #cbd5e1',
                    padding: '14px',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    fontWeight: '700',
                    cursor: 'pointer',
                    transition: 'background 0.2s, color 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    if (!inWishlist) {
                      e.target.style.background = '#e2e8f0';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!inWishlist) {
                      e.target.style.background = '#f1f5f9';
                    }
                  }}
                >
                  {inWishlist ? '💖 En lista de deseos' : '🤍 Añadir a wishlist'}
                </button>
              </>
            ) : (
              <button
                disabled
                style={{
                  width: '100%',
                  background: '#cbd5e1',
                  color: 'white',
                  border: 'none',
                  padding: '16px',
                  borderRadius: '8px',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  cursor: 'not-allowed'
                }}
              >
                Sin stock
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
