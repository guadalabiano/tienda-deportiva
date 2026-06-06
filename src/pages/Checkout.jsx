import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { ordenService } from '../services/ordenService';
import { crearPreferenciaPago } from '../services/mercadoPagoService';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';

// Inicialización de Mercado Pago con la clave en formato string (entre comillas)
initMercadoPago('APP_USR-fe6ea350-234d-4d2f-81be-7a37e2229380', { locale: 'es-AR' });

export default function Checkout() {
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [paymentMethod, setPaymentMethod] = useState('mercadopago');
  const [processing, setProcessing] = useState(false);
  const [message, setMessage] = useState('');
  const [orderResult, setOrderResult] = useState(null);
  
  // Estado para guardar el ID de preferencia de MP
  const [preferenceId, setPreferenceId] = useState(null);
  
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

    setMessage('');
    setProcessing(true);

    try {
      if (paymentMethod === 'mercadopago') {
        // Pedimos el ID de preferencia al backend
        const data = await crearPreferenciaPago(total);
        
        if (data && data.id) {
          setPreferenceId(data.id);
          setMessage('Continúa el pago seguro con Mercado Pago.');
        } else {
          setMessage('Error al conectar con Mercado Pago. Intenta nuevamente.');
        }
      } else {
        // Pagos manuales: creamos la orden directamente
        await new Promise((resolve) => setTimeout(resolve, 900));
        const order = await ordenService.createOrden(cartItems);
        clearCart();
        setOrderResult(order);
        
        if (paymentMethod === 'efectivo') {
          setMessage(`Orden #${order.id} registrada. Pagás en efectivo al recibir tu pedido.`);
        } else {
          setMessage(`Orden #${order.id} registrada. Conservá tu comprobante de transferencia.`);
        }
      }
    } catch (error) {
      setMessage(error.response?.data?.error || error.message || 'Error procesando la orden.');
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
            <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>Elegí cómo querés pagar tu pedido.</p>
            
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.85rem 1rem', borderRadius: '12px', border: paymentMethod === 'mercadopago' ? '2px solid #f97316' : '1px solid #cbd5e1', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="mercadopago"
                    checked={paymentMethod === 'mercadopago'}
                    onChange={() => { setPaymentMethod('mercadopago'); setPreferenceId(null); }}
                    style={{ accentColor: '#f97316' }}
                  />
                  Mercado Pago
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.85rem 1rem', borderRadius: '12px', border: paymentMethod === 'efectivo' ? '2px solid #f97316' : '1px solid #cbd5e1', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="efectivo"
                    checked={paymentMethod === 'efectivo'}
                    onChange={() => { setPaymentMethod('efectivo'); setPreferenceId(null); }}
                    style={{ accentColor: '#f97316' }}
                  />
                  Efectivo
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.85rem 1rem', borderRadius: '12px', border: paymentMethod === 'transferencia' ? '2px solid #f97316' : '1px solid #cbd5e1', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="transferencia"
                    checked={paymentMethod === 'transferencia'}
                    onChange={() => { setPaymentMethod('transferencia'); setPreferenceId(null); }}
                    style={{ accentColor: '#f97316' }}
                  />
                  Transferencia
                </label>
              </div>

              {paymentMethod === 'mercadopago' && !preferenceId && (
                <div style={{ marginBottom: '1.5rem', padding: '16px', borderRadius: '14px', background: '#f0f9ff', border: '1px solid #bae6fd' }}>
                  <p style={{ margin: 0, color: '#0369a1' }}>
                    Al confirmar, podrás pagar de forma segura con dinero en tu cuenta o tarjetas a través de Mercado Pago.
                  </p>
                </div>
              )}

              {paymentMethod !== 'mercadopago' && (
                <div style={{ marginBottom: '1.5rem', padding: '16px', borderRadius: '14px', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                  <p style={{ margin: '0 0 0.5rem 0', color: '#0f172a', fontWeight: '700' }}>
                    {paymentMethod === 'efectivo' ? 'Pago en efectivo' : 'Pago por transferencia'}
                  </p>
                  <p style={{ margin: 0, color: '#475569' }}>
                    {paymentMethod === 'efectivo'
                      ? 'Vas a pagar el total en efectivo al momento de recibir tu pedido en la puerta de tu casa.'
                      : 'Al confirmar, te enviaremos el CBU/Alias al correo para que realices la transferencia.'}
                  </p>
                </div>
              )}

              {message && (
                <div style={{ marginBottom: '1.5rem', color: orderResult ? '#15803d' : '#b91c1c', fontWeight: '600' }}>
                  {message}
                </div>
              )}

              {paymentMethod === 'mercadopago' && preferenceId ? (
                <div style={{ marginTop: '20px' }}>
                  <Wallet initialization={{ preferenceId }} customization={{ texts: { valueProp: 'smart_option' } }} />
                </div>
              ) : (
                <button
                  type="submit"
                  disabled={processing || orderResult}
                  style={{
                    width: '100%',
                    background: paymentMethod === 'mercadopago' ? '#009ee3' : '#f97316',
                    color: 'white',
                    border: 'none',
                    padding: '14px',
                    borderRadius: '12px',
                    fontWeight: '700',
                    cursor: (processing || orderResult) ? 'not-allowed' : 'pointer',
                    fontSize: '1rem',
                    transition: 'background 0.2s'
                  }}
                >
                  {processing ? 'Procesando...' : `Confirmar y Pagar $${total.toLocaleString()}`}
                </button>
              )}
            </form>
          </div>

          <div style={{ background: 'white', padding: '2rem', borderRadius: '16px', boxShadow: '0 6px 18px rgba(15, 23, 42, 0.08)', height: 'fit-content' }}>
            <h2 style={{ marginTop: 0, color: '#0f172a' }}>Resumen de la orden</h2>
            {cartItems.length === 0 ? (
              <p style={{ color: '#64748b' }}>No hay productos en el carrito.</p>
            ) : (
              <div style={{ display: 'grid', gap: '1rem' }}>
                {cartItems.map(item => (
                  <div key={item.id} style={{ display: 'grid', gridTemplateColumns: '70px 1fr', gap: '0.75rem', alignItems: 'center' }}>
                    <img src={item.imagen} alt={item.nombre} style={{ width: '70px', height: '70px', objectFit: 'cover', borderRadius: '10px' }} />
                    <div>
                      <p style={{ margin: 0, color: '#0f172a', fontWeight: '700', fontSize: '0.95rem' }}>{item.nombre}</p>
                      <p style={{ margin: '0.35rem 0 0 0', color: '#64748b', fontSize: '0.9rem' }}>
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
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '900', color: '#0f172a', marginTop: '1rem', fontSize: '1.2rem' }}>
                <span>Total</span>
                <span>${total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {orderResult && (
          <div style={{ marginTop: '2rem', background: '#ecfdf5', color: '#166534', padding: '1.5rem', borderRadius: '14px', border: '1px solid #d1fae5' }}>
            <h3 style={{ margin: '0 0 0.75rem 0' }}>¡Compra registrada con éxito!</h3>
            <p style={{ margin: 0 }}>Tu orden ha sido procesada según el método de pago elegido.</p>
            <p style={{ marginTop: '0.75rem', fontWeight: '700' }}>ID de tu orden: #{orderResult.id}</p>
            <Link to="/" style={{ color: '#0f172a', textDecoration: 'underline', marginTop: '1rem', display: 'inline-block', fontWeight: '600' }}>
              Volver a la tienda
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}