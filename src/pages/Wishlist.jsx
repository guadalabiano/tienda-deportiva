import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export default function Wishlist() {
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = (producto) => {
    addToCart(producto);
    removeFromWishlist(producto.id);
  };

  return (
    <div style={{ minHeight: '85vh', background: '#f8fafc', paddingBottom: '3rem' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem 1rem' }}>
        <div style={{ marginBottom: '2rem' }}>
          <Link to="/" style={{ color: '#f97316', textDecoration: 'none', fontWeight: '600' }}>
            ← Volver al catálogo
          </Link>
        </div>

        <div style={{ background: 'white', borderRadius: '16px', padding: '2rem', boxShadow: '0 6px 18px rgba(15, 23, 42, 0.08)' }}>
          <h1 style={{ margin: '0 0 1rem 0', color: '#0f172a' }}>Mis deseos</h1>
          <p style={{ margin: '0 0 1.5rem 0', color: '#64748b' }}>
            Guarda productos que quieres comprar más adelante o compartir.
          </p>

          {wishlistItems.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem', borderRadius: '12px', background: '#f8fafc' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💖</div>
              <h2 style={{ margin: '0 0 0.75rem 0', color: '#0f172a' }}>No hay productos en la wishlist</h2>
              <p style={{ margin: 0, color: '#64748b' }}>Añade artículos desde el catálogo o la página de detalles.</p>
              <Link to="/" style={{ display: 'inline-block', marginTop: '1.5rem', background: '#f97316', color: 'white', padding: '12px 24px', borderRadius: '8px', textDecoration: 'none', fontWeight: '700' }}>
                Ir al catálogo
              </Link>
            </div>
          ) : (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <span style={{ color: '#0f172a', fontWeight: '700' }}>{wishlistItems.length} productos</span>
                <button
                  onClick={clearWishlist}
                  style={{
                    background: '#fee2e2',
                    color: '#b91c1c',
                    border: 'none',
                    padding: '10px 16px',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    fontWeight: '700'
                  }}
                >
                  Limpiar lista
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                {wishlistItems.map(producto => (
                  <div key={producto.id} style={{ background: '#f8fafc', borderRadius: '14px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(15, 23, 42, 0.08)' }}>
                    <img src={producto.imagen} alt={producto.nombre} style={{ width: '100%', height: '220px', objectFit: 'cover' }} />
                    <div style={{ padding: '1rem' }}>
                      <h3 style={{ margin: '0 0 0.5rem 0', color: '#0f172a' }}>{producto.nombre}</h3>
                      <p style={{ margin: '0 0 1rem 0', color: '#64748b', fontSize: '0.95rem' }}>{producto.categoria}</p>
                      <p style={{ margin: '0 0 1rem 0', fontWeight: '700', color: '#f97316' }}>${producto.precio.toLocaleString()}</p>
                      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                        <button
                          onClick={() => handleAddToCart(producto)}
                          style={{
                            flex: '1',
                            background: '#f97316',
                            color: 'white',
                            border: 'none',
                            padding: '12px',
                            borderRadius: '10px',
                            cursor: 'pointer',
                            fontWeight: '700'
                          }}
                        >
                          Agregar al carrito
                        </button>
                        <button
                          onClick={() => removeFromWishlist(producto.id)}
                          style={{
                            flex: '1',
                            background: 'white',
                            color: '#0f172a',
                            border: '1px solid #cbd5e1',
                            padding: '12px',
                            borderRadius: '10px',
                            cursor: 'pointer',
                            fontWeight: '700'
                          }}
                        >
                          Quitar
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
