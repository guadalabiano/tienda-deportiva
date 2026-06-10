import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';
import CalculadoraEnvio from '../components/CalculadoraEnvio';

export default function Carrito() {
  const { cartItems, clearCart, getTotalPrice, getTotalItems } = useCart();
  const total = getTotalPrice();

  // Estados
  const [envioValido, setEnvioValido] = useState(false);
  const [totalConEnvio, setTotalConEnvio] = useState(total);
  const [errorCheckout, setErrorCheckout] = useState(''); // Estado para el cartel integrado
  
  const navigate = useNavigate();

  // Si el usuario soluciona el tema del envío, limpiamos el error automáticamente
  useEffect(() => {
    if (envioValido) {
      setErrorCheckout('');
    }
  }, [envioValido]);

  // Manejador del botón
  const handleCheckout = () => {
    if (!envioValido) {
      setErrorCheckout("⚠️ Calculá el envío o elegí retiro para continuar.");
      return;
    }
    navigate('/checkout');
  };

  return (
    <div style={{ minHeight: '85vh', background: '#f8fafc', paddingBottom: '3rem' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem 1rem' }}>
        
        <h1 style={{ color: '#0f172a', marginBottom: '2rem' }}>
          Carrito de Compras
          <span style={{ fontSize: '0.8rem', color: '#64748b', marginLeft: '1rem' }}>
            ({getTotalItems()} {getTotalItems() === 1 ? 'producto' : 'productos'})
          </span>
        </h1>

        {cartItems.length === 0 ? (
          <div style={{
            background: 'white',
            padding: '3rem',
            borderRadius: '12px',
            textAlign: 'center',
            boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🛒</div>
            <h2 style={{ color: '#0f172a', marginBottom: '0.5rem' }}>Carrito vacío</h2>
            <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>
              No hay productos en tu carrito. ¡Agreguemos algo!
            </p>
            <Link to="/" style={{
              display: 'inline-block',
              background: '#f97316',
              color: 'white',
              padding: '12px 24px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: '600',
              transition: 'background 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.background = '#ea580c'}
            onMouseLeave={(e) => e.target.style.background = '#f97316'}>
              Ir al catálogo
            </Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem' }}>
            
            {/* Productos y Envío */}
            <div>
              <div style={{
                background: 'white',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
              }}>
                <div style={{
                  padding: '1rem',
                  borderBottom: '1px solid #e2e8f0',
                  background: '#f1f5f9'
                }}>
                  <h3 style={{ margin: 0, color: '#0f172a' }}>Productos</h3>
                </div>
                <div style={{ padding: '1rem' }}>
                  {cartItems.map(item => (
                    <CartItem key={item.id} item={item} />
                  ))}
                </div>
              </div>

              <div style={{ marginTop: '20px' }}>
                 <CalculadoraEnvio 
                   subtotal={total} 
                   setEnvioValido={setEnvioValido} 
                   setTotalConEnvio={setTotalConEnvio} 
                 />
              </div>
            </div>

            {/* Resumen */}
            <div>
              <div style={{
                background: 'white',
                borderRadius: '12px',
                padding: '1.5rem',
                boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                position: 'sticky',
                top: '1rem'
              }}>
                <h3 style={{ margin: '0 0 1.5rem 0', color: '#0f172a' }}>
                  Resumen
                </h3>

                <div style={{ marginBottom: '1rem' }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '0.5rem',
                    fontSize: '0.95rem'
                  }}>
                    <span style={{ color: '#64748b' }}>Subtotal:</span>
                    <span style={{ color: '#0f172a', fontWeight: '600' }}>
                      ${total.toLocaleString()}
                    </span>
                  </div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '0.5rem',
                    fontSize: '0.95rem'
                  }}>
                    <span style={{ color: '#64748b' }}>Entrega:</span>
                    <span style={{ color: envioValido ? '#10b981' : '#dc2626', fontWeight: '600' }}>
                      {envioValido ? 'Calculado' : 'Pendiente'}
                    </span>
                  </div>
                </div>

                <div style={{
                  borderTop: '1px solid #e2e8f0',
                  paddingTop: '1rem',
                  marginBottom: '1.5rem'
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between'
                  }}>
                    <span style={{ fontWeight: '600', color: '#0f172a', fontSize: '1.1rem' }}>
                      Total:
                    </span>
                    <span style={{
                      fontWeight: '700',
                      color: '#f97316',
                      fontSize: '1.3rem'
                    }}>
                      ${totalConEnvio.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Cartel de error integrado */}
                {errorCheckout && (
                  <div style={{
                    background: '#fee2e2',
                    color: '#dc2626',
                    padding: '10px',
                    borderRadius: '6px',
                    fontSize: '0.85rem',
                    marginBottom: '15px',
                    border: '1px solid #fca5a5',
                    textAlign: 'center',
                    fontWeight: '500'
                  }}>
                    {errorCheckout}
                  </div>
                )}

                <button 
                  onClick={handleCheckout} 
                  style={{
                    display: 'block',
                    width: '100%',
                    background: '#f97316',
                    color: 'white',
                    textAlign: 'center',
                    border: 'none',
                    padding: '14px',
                    borderRadius: '8px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    marginBottom: '0.5rem',
                    transition: 'background 0.2s',
                    fontSize: '1rem',
                    boxSizing: 'border-box'
                  }}
                  onMouseEnter={(e) => e.target.style.background = '#ea580c'}
                  onMouseLeave={(e) => e.target.style.background = '#f97316'}>
                  Ir a Checkout
                </button>

                <button onClick={clearCart} style={{
                  width: '100%',
                  background: 'transparent',
                  color: '#dc2626',
                  border: '1px solid #fecaca',
                  padding: '12px',
                  borderRadius: '8px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = '#fee2e2';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent';
                }}>
                  Vaciar carrito
                </button>

                <Link to="/" style={{
                  display: 'block',
                  textAlign: 'center',
                  marginTop: '1rem',
                  color: '#f97316',
                  textDecoration: 'none',
                  fontWeight: '600',
                  fontSize: '0.9rem'
                }}>
                  ← Continuar comprando
                </Link>
              </div>
            </div>
            
          </div>
        )}
      </div>
    </div>
  );
}