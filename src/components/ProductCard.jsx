import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export default function ProductCard({ producto }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const inWishlist = isInWishlist(producto.id);

  const handleAddToCart = () => {
    addToCart(producto);
    alert(`${producto.nombre} agregado al carrito`);
  };

  const handleToggleWishlist = (event) => {
    event.preventDefault();
    event.stopPropagation();
    toggleWishlist(producto);
  };

  return (
    <div style={{
      background: 'white',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 4px 6px rgba(0,0,0,0.07)',
      transition: 'transform 0.3s, box-shadow 0.3s',
      cursor: 'pointer'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-4px)';
      e.currentTarget.style.boxShadow = '0 12px 16px rgba(0,0,0,0.1)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.07)';
    }}>
      
      {/* Imagen */}
      <Link to={`/producto/${producto.id}`} style={{ textDecoration: 'none' }}>
        <img 
          src={producto.imagen} 
          alt={producto.nombre}
          style={{
            width: '100%',
            height: '200px',
            objectFit: 'cover',
            background: '#e2e8f0'
          }}
        />
      </Link>

      {/* Contenido */}
      <div style={{ padding: '1rem' }}>
        <Link to={`/producto/${producto.id}`} style={{ textDecoration: 'none' }}>
          <h3 style={{
            margin: '0 0 0.5rem 0',
            fontSize: '1rem',
            color: '#0f172a',
            height: '2.8rem',
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical'
          }}>
            {producto.nombre}
          </h3>
        </Link>

        <p style={{
          margin: '0.5rem 0',
          fontSize: '0.85rem',
          color: '#64748b',
          height: '2.4rem',
          overflow: 'hidden',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical'
        }}>
          {producto.descripcion}
        </p>

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '1rem',
          gap: '0.75rem'
        }}>
          <span style={{
            fontSize: '1.3rem',
            fontWeight: '700',
            color: '#f97316'
          }}>
            ${producto.precio.toLocaleString()}
          </span>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button
              onClick={handleToggleWishlist}
              style={{
                background: inWishlist ? '#f97316' : 'transparent',
                color: inWishlist ? 'white' : '#0f172a',
                border: inWishlist ? 'none' : '1px solid #cbd5e1',
                padding: '8px 12px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '0.9rem',
                transition: 'background 0.2s, color 0.2s'
              }}
              onMouseEnter={(e) => {
                if (!inWishlist) {
                  e.target.style.borderColor = '#f97316';
                  e.target.style.color = '#f97316';
                }
              }}
              onMouseLeave={(e) => {
                if (!inWishlist) {
                  e.target.style.borderColor = '#cbd5e1';
                  e.target.style.color = '#0f172a';
                }
              }}
            >
              {inWishlist ? 'En deseos' : 'Deseo'}
            </button>

            {producto.stock > 0 ? (
              <button
                onClick={handleAddToCart}
                style={{
                  background: '#f97316',
                  color: 'white',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '0.9rem',
                  transition: 'background 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.background = '#ea580c'}
                onMouseLeave={(e) => e.target.style.background = '#f97316'}
              >
                Agregar
              </button>
            ) : (
              <span style={{
                background: '#fee2e2',
                color: '#dc2626',
                padding: '8px 12px',
                borderRadius: '6px',
                fontSize: '0.85rem',
                fontWeight: '600'
              }}>
                Sin stock
              </span>
            )}
          </div>
        </div>

        <p style={{
          margin: '0.5rem 0 0 0',
          fontSize: '0.8rem',
          color: '#94a3b8'
        }}>
          Stock: {producto.stock}
        </p>
      </div>
    </div>
  );
}
