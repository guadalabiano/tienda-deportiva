import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { ordenService } from '../services/ordenService';
import { mercadoPagoService } from '../services/mercadoPagoService';

export default function Checkout() {
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [cardHolder, setCardHolder] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiration, setExpiration] = useState('');
  const [cvv, setCvv] = useState('');
  const [processing, setProcessing] = useState(false);
  const [message, setMessage] = useState('');
  const [orderResult, setOrderResult] = useState(null);
  const total = getTotalPrice();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!user) {
      navigate('/login');
      return;
    }

    if (cartItems.length === 0) {
      setMessage('Tu carrito está vacío. Agrega productos antes de pagar.');
      return;
    }

    if (!cardHolder || !cardNumber || !expiration || !cvv) {
      setMessage('Completa todos los datos de pago.');
      return;
    }

    setMessage('');
    setProcessing(true);

    try {
      const payment = await mercadoPagoService.createPayment({
        cardHolder,
        cardNumber,
        expiration,
        cvv,
        amount: total
      });

      if (!payment?.success) {
        throw new Error(payment?.error || 'Pago rechazado');
      }

      const order = await ordenService.createOrden(cartItems);
      clearCart();
      setOrderResult(order);
      setMessage(`Pago aprobado. Orden #${order.id} registrada correctamente.`);
    } catch (error) {
      setMessage(error.response?.data?.error || error.message || 'Error procesando el pago.');
    } finally {
      setProcessing(false);
    }
  };

  if (!user) {
    return (
      <div style={{ minHeight: '85vh', background: '#f8fafc', paddingBottom: '3rem' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto', padding: '3rem 1rem', textAlign: 'center' }}>
          <h2 style={{ color: '#0f172a', marginBottom: '1rem' }}>Necesitas iniciar sesión</h2>
          <p style={{ color: '#64748b' }}>
            Inicia sesión para completar el pago y guardar tu historial de órdenes.
          </p>
          <Link to="/login" style={{
            marginTop: '1.5rem',
            display: 'inline-block',
            background: '#f97316',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: '700'
          }}>
            Iniciar sesión
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '85vh', background: '#f8fafc', paddingBottom: '3rem' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem 1rem' }}>
        <div style={{ marginBottom: '2rem' }}>
          <Link to="/carrito" style={{ color: '#f97316', textDecoration: 'none', fontWeight: '600' }}>
            ← Volver al carrito
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '2rem' }}>
          <div style={{ background: 'white', padding: '2rem', borderRadius: '16px', boxShadow: '0 6px 18px rgba(15, 23, 42, 0.08)' }}>
            <h2 style={{ marginTop: 0, color: '#0f172a' }}>Datos de Pago</h2>
            <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>Simulamos Mercado Pago con tarjetas ficticias para pruebas.</p>
            <form onSubmit={handleSubmit}>
              <label style={{ display: 'block', marginBottom: '0.75rem', color: '#0f172a', fontWeight: '600' }}>
                Titular de la tarjeta
              </label>
              <input
                value={cardHolder}
                onChange={(e) => setCardHolder(e.target.value)}
                placeholder="Nombre completo"
                style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', border: '1px solid #cbd5e1', marginBottom: '1rem' }}
              />

              <label style={{ display: 'block', marginBottom: '0.75rem', color: '#0f172a', fontWeight: '600' }}>
                Número de tarjeta
              </label>
              <input
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                placeholder="1234 5678 9012 3456"
                style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', border: '1px solid #cbd5e1', marginBottom: '1rem' }}
              />

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.75rem', color: '#0f172a', fontWeight: '600' }}>
                    Expiración
                  </label>
                  <input
                    value={expiration}
                    onChange={(e) => setExpiration(e.target.value)}
                    placeholder="MM/AA"
                    style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', border: '1px solid #cbd5e1' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.75rem', color: '#0f172a', fontWeight: '600' }}>
                    CVV
                  </label>
                  <input
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    placeholder="123"
                    style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', border: '1px solid #cbd5e1' }}
                  />
                </div>
              </div>

              {message && (
                <div style={{ marginBottom: '1rem', color: orderResult ? '#15803d' : '#b91c1c', fontWeight: '600' }}>
                  {message}
                </div>
              )}

              <button
                type="submit"
                disabled={processing}
                style={{
                  width: '100%',
                  background: '#f97316',
                  color: 'white',
                  border: 'none',
                  padding: '14px',
                  borderRadius: '12px',
                  fontWeight: '700',
                  cursor: processing ? 'not-allowed' : 'pointer',
                  fontSize: '1rem'
                }}
              >
                {processing ? 'Procesando pago...' : `Pagar $${total.toLocaleString()}`}
              </button>
            </form>
          </div>

          <div style={{ background: 'white', padding: '2rem', borderRadius: '16px', boxShadow: '0 6px 18px rgba(15, 23, 42, 0.08)' }}>
            <h2 style={{ marginTop: 0, color: '#0f172a' }}>Resumen de la orden</h2>
            {cartItems.length === 0 ? (
              <p style={{ color: '#64748b' }}>No hay productos en el carrito.</p>
            ) : (
              <div style={{ display: 'grid', gap: '1rem' }}>
                {cartItems.map(item => (
                  <div key={item.id} style={{ display: 'grid', gridTemplateColumns: '70px 1fr', gap: '0.75rem', alignItems: 'center' }}>
                    <img src={item.imagen} alt={item.nombre} style={{ width: '70px', height: '70px', objectFit: 'cover', borderRadius: '10px' }} />
                    <div>
                      <p style={{ margin: 0, color: '#0f172a', fontWeight: '700' }}>{item.nombre}</p>
                      <p style={{ margin: '0.35rem 0 0 0', color: '#64748b', fontSize: '0.95rem' }}>
                        {item.cantidad} × ${item.precio.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', color: '#64748b' }}>
                <span>Subtotal</span>
                <span>${total.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', color: '#64748b' }}>
                <span>Envío</span>
                <span>Gratis</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '700', color: '#0f172a', marginTop: '1rem' }}>
                <span>Total</span>
                <span>${total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {orderResult && (
          <div style={{ marginTop: '2rem', background: '#ecfdf5', color: '#166534', padding: '1.5rem', borderRadius: '14px', border: '1px solid #d1fae5' }}>
            <h3 style={{ margin: '0 0 0.75rem 0' }}>¡Compra finalizada!</h3>
            <p style={{ margin: 0 }}>Tu orden fue registrada y procesada exitosamente.</p>
            <p style={{ marginTop: '0.75rem', fontWeight: '700' }}>ID de orden: {orderResult.id}</p>
            <Link to="/" style={{ color: '#0f172a', textDecoration: 'underline', marginTop: '0.75rem', display: 'inline-block' }}>
              Volver al catálogo
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
