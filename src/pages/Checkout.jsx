import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { ordenService } from '../services/ordenService';
import { crearPreferenciaPago } from '../services/mercadoPagoService';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import PagoCripto from '../components/PagoCripto'; 

const MP_PUBLIC_KEY = import.meta.env.VITE_MP_PUBLIC_KEY || 'APP_USR-fe6ea350-234d-4d2f-81be-7a37e2229380';

export default function Checkout() {
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    initMercadoPago(MP_PUBLIC_KEY, { locale: 'es-AR' });
  }, []);
  
  // Estados de Pago
  const [paymentMethod, setPaymentMethod] = useState('mercadopago');
  const [processing, setProcessing] = useState(false);
  const [message, setMessage] = useState('');
  const [orderResult, setOrderResult] = useState(null);
  const [preferenceId, setPreferenceId] = useState(null);

  // NUEVOS ESTADOS: Datos de Envío (Sin código postal)
  const [direccion, setDireccion] = useState('');
  const [ciudad, setCiudad] = useState('');
  
  // Guardamos el total en una constante para que no se ponga en $0 al vaciar el carrito
  const [totalFinal] = useState(getTotalPrice());

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!user) {
      navigate('/login');
      return;
    }

    if (cartItems.length === 0 && !orderResult) {
      setMessage('Tu carrito está vacío. Agrega productos antes de pagar.');
      return;
    }

    // Validación simplificada
    if (!direccion.trim() || !ciudad.trim()) {
      setMessage('Por favor, completá todos los datos de envío antes de continuar.');
      return;
    }

    if (paymentMethod === 'cripto') {
      return; 
    }

    setMessage('');
    setProcessing(true);

    try {
      if (paymentMethod === 'mercadopago') {
        const data = await crearPreferenciaPago(cartItems, totalFinal);
        
        if (data && data.id) {
          setPreferenceId(data.id);
          setMessage('Continúa el pago seguro con Mercado Pago.');
        } else {
          setMessage('Error al conectar con Mercado Pago. Intenta nuevamente.');
        }
      } else {
        // Pagos manuales
        await new Promise((resolve) => setTimeout(resolve, 900));
        const order = await ordenService.createOrden(cartItems);
        clearCart();
        setOrderResult(order);
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
          <p style={{ color: '#64748b' }}>Inicia sesión para completar el pago y guardar tu historial.</p>
          <Link to="/login" style={{ marginTop: '1.5rem', display: 'inline-block', background: '#f97316', color: 'white', padding: '12px 24px', borderRadius: '8px', textDecoration: 'none', fontWeight: '700' }}>
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
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            {/* SECCIÓN 1: DATOS DE ENVÍO */}
            {!orderResult && (
              <div style={{ background: 'white', padding: '2rem', borderRadius: '16px', boxShadow: '0 6px 18px rgba(15, 23, 42, 0.08)' }}>
                <h2 style={{ marginTop: 0, color: '#0f172a' }}>Datos de Envío</h2>
                <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>Ingresá la dirección donde vas a recibir tu pedido.</p>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#475569', fontWeight: '600' }}>Dirección completa (Calle y número)</label>
                    <input type="text" value={direccion} onChange={(e) => setDireccion(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }} placeholder="Ej: San Martín 1234" />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#475569', fontWeight: '600' }}>Ciudad</label>
                    <input type="text" value={ciudad} onChange={(e) => setCiudad(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }} placeholder="Ej: Luján de Cuyo" />
                  </div>
                </div>
              </div>
            )}

            {/* SECCIÓN 2: DATOS DE PAGO */}
            {!orderResult ? (
              <div style={{ background: 'white', padding: '2rem', borderRadius: '16px', boxShadow: '0 6px 18px rgba(15, 23, 42, 0.08)' }}>
                <h2 style={{ marginTop: 0, color: '#0f172a' }}>Datos de Pago</h2>
                <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>Elegí cómo querés abonar.</p>
                
                <form onSubmit={handleSubmit}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.85rem 1rem', borderRadius: '12px', border: paymentMethod === 'mercadopago' ? '2px solid #f97316' : '1px solid #cbd5e1', cursor: 'pointer' }}>
                      <input type="radio" name="paymentMethod" value="mercadopago" checked={paymentMethod === 'mercadopago'} onChange={() => { setPaymentMethod('mercadopago'); setPreferenceId(null); }} style={{ accentColor: '#f97316' }} /> Mercado Pago
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.85rem 1rem', borderRadius: '12px', border: paymentMethod === 'efectivo' ? '2px solid #f97316' : '1px solid #cbd5e1', cursor: 'pointer' }}>
                      <input type="radio" name="paymentMethod" value="efectivo" checked={paymentMethod === 'efectivo'} onChange={() => { setPaymentMethod('efectivo'); setPreferenceId(null); }} style={{ accentColor: '#f97316' }} /> Efectivo
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.85rem 1rem', borderRadius: '12px', border: paymentMethod === 'transferencia' ? '2px solid #f97316' : '1px solid #cbd5e1', cursor: 'pointer' }}>
                      <input type="radio" name="paymentMethod" value="transferencia" checked={paymentMethod === 'transferencia'} onChange={() => { setPaymentMethod('transferencia'); setPreferenceId(null); }} style={{ accentColor: '#f97316' }} /> Transferencia
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.85rem 1rem', borderRadius: '12px', border: paymentMethod === 'cripto' ? '2px solid #f97316' : '1px solid #cbd5e1', cursor: 'pointer' }}>
                      <input type="radio" name="paymentMethod" value="cripto" checked={paymentMethod === 'cripto'} onChange={() => { setPaymentMethod('cripto'); setPreferenceId(null); }} style={{ accentColor: '#f97316' }} /> Cripto (USDT)
                    </label>
                  </div>

                  {/* Textos Informativos */}
                  {paymentMethod === 'mercadopago' && !preferenceId && (
                    <div style={{ marginBottom: '1.5rem', padding: '16px', borderRadius: '14px', background: '#f0f9ff', border: '1px solid #bae6fd' }}>
                      <p style={{ margin: 0, color: '#0369a1' }}>Pagá de forma segura con dinero en tu cuenta o tarjetas a través de Mercado Pago.</p>
                    </div>
                  )}

                  {paymentMethod === 'cripto' && (
                    <div style={{ marginBottom: '1.5rem', padding: '16px', borderRadius: '14px', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                      <p style={{ margin: '0 0 0.5rem 0', color: '#0f172a', fontWeight: '700' }}>Pago con Criptomonedas</p>
                      <p style={{ margin: 0, color: '#475569' }}>Aboná tu pedido utilizando USDT a través de la red TRC20.</p>
                    </div>
                  )}

                  {(paymentMethod === 'efectivo' || paymentMethod === 'transferencia') && (
                    <div style={{ marginBottom: '1.5rem', padding: '16px', borderRadius: '14px', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                      <p style={{ margin: '0 0 0.5rem 0', color: '#0f172a', fontWeight: '700' }}>
                        {paymentMethod === 'efectivo' ? 'Pago en sucursal (Rapipago / Pago Fácil)' : 'Pago por transferencia'}
                      </p>
                      <p style={{ margin: 0, color: '#475569' }}>
                        {paymentMethod === 'efectivo'
                          ? 'Al confirmar, te generaremos un cupón para que abones en cualquier sucursal de Rapipago o Pago Fácil. El pedido se enviará una vez acreditado el pago.'
                          : 'Al confirmar, te enviaremos el CBU/Alias al correo para que realices la transferencia. Recordá enviarnos el comprobante.'}
                      </p>
                    </div>
                  )}

                  {message && (
                    <div style={{ marginBottom: '1.5rem', color: '#b91c1c', fontWeight: '600', padding: '10px', background: '#fee2e2', borderRadius: '8px' }}>
                      {message}
                    </div>
                  )}

                  {/* Botones de Acción */}
                  {paymentMethod === 'mercadopago' && preferenceId ? (
                    <div style={{ marginTop: '20px' }}>
                      <Wallet initialization={{ preferenceId }} customization={{ texts: { valueProp: 'smart_option' } }} />
                    </div>
                  ) : paymentMethod === 'cripto' ? (
                    <div style={{ marginTop: '20px' }}>
                       <PagoCripto totalARS={totalFinal} />
                    </div>
                  ) : (
                    <button type="submit" disabled={processing} style={{ width: '100%', background: paymentMethod === 'mercadopago' ? '#009ee3' : '#f97316', color: 'white', border: 'none', padding: '14px', borderRadius: '12px', fontWeight: '700', cursor: processing ? 'not-allowed' : 'pointer', fontSize: '1rem' }}>
                      {processing ? 'Procesando...' : `Confirmar y Pagar $${totalFinal.toLocaleString()}`}
                    </button>
                  )}
                </form>
              </div>
            ) : (
              /* PANTALLA DE ÉXITO */
              <div style={{ background: '#ecfdf5', color: '#166534', padding: '3rem 2rem', borderRadius: '16px', border: '1px solid #d1fae5', textAlign: 'center', boxShadow: '0 6px 18px rgba(15, 23, 42, 0.08)' }}>
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✅</div>
                <h2 style={{ margin: '0 0 1rem 0', color: '#064e3b' }}>¡Compra registrada con éxito!</h2>
                <p style={{ margin: 0, fontSize: '1.1rem', color: '#166534' }}>
                  {paymentMethod === 'efectivo' 
                    ? 'Generamos tu orden correctamente. Revisá tu email para descargar el cupón de pago y acercarte a un Rapipago o Pago Fácil.'
                    : 'Generamos tu orden correctamente. Revisá tu email para ver los datos de transferencia y enviarnos el comprobante.'}
                </p>
                <p style={{ marginTop: '1.5rem', fontWeight: '700', fontSize: '1.2rem', color: '#064e3b' }}>ID de tu orden: #{orderResult.id}</p>
                <Link to="/" style={{ background: '#059669', color: 'white', padding: '12px 24px', borderRadius: '8px', textDecoration: 'none', marginTop: '2rem', display: 'inline-block', fontWeight: '600' }}>
                  Volver a la tienda
                </Link>
              </div>
            )}
          </div>

          {/* RESUMEN DE LA ORDEN */}
          <div style={{ background: 'white', padding: '2rem', borderRadius: '16px', boxShadow: '0 6px 18px rgba(15, 23, 42, 0.08)', height: 'fit-content' }}>
            <h2 style={{ marginTop: 0, color: '#0f172a' }}>Resumen de la orden</h2>
            {cartItems.length === 0 && !orderResult ? (
              <p style={{ color: '#64748b' }}>No hay productos en el carrito.</p>
            ) : (
              <div style={{ display: 'grid', gap: '1rem' }}>
                {(orderResult ? orderResult.items : cartItems)?.map((item, index) => (
                  <div key={item.id || index} style={{ display: 'grid', gridTemplateColumns: '70px 1fr', gap: '0.75rem', alignItems: 'center' }}>
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
                <span>${totalFinal.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', color: '#64748b' }}>
                <span>Envío</span>
                <span>Gratis</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '900', color: '#0f172a', marginTop: '1rem', fontSize: '1.2rem' }}>
                <span>Total</span>
                <span>${totalFinal.toLocaleString()}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}