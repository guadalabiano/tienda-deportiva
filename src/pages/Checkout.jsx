
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import PagoCripto from '../components/PagoCripto';

export default function Checkout() {
  const { getTotalPrice } = useCart();
  const total = getTotalPrice(); 

  // Estado que controla qué método de pago está seleccionado
  const [metodoPago, setMetodoPago] = useState('mercadopago');

  const handlePagoMercadoPago = async () => {
    // Acá va a ir tu lógica de fetch a tu backend en el puerto 3000
    console.log("Iniciando pago con MP por $", total);
  };

  return (
    <div style={{ minHeight: '85vh', background: '#f8fafc', paddingBottom: '3rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 1rem' }}>
        
        <h1 style={{ color: '#0f172a', marginBottom: '2rem', textAlign: 'center' }}>
          Finalizar Compra
        </h1>

        <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h2 style={{ margin: '0 0 0.5rem 0', color: '#0f172a' }}>Datos de Pago</h2>
            <p style={{ color: '#64748b', margin: 0 }}>Elegí cómo querés pagar tu pedido.</p>
          </div>

          {/* BOTONERA DE PAGOS (Arreglada con diseño fluido) */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', 
            gap: '1rem', 
            marginBottom: '2rem' 
          }}>
            {/* 1: Mercado Pago */}
            <div 
              onClick={() => setMetodoPago('mercadopago')}
              style={{
                border: metodoPago === 'mercadopago' ? '2px solid #f97316' : '1px solid #e2e8f0',
                padding: '1rem',
                borderRadius: '8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                background: metodoPago === 'mercadopago' ? '#fff7ed' : 'white',
                transition: 'all 0.2s'
              }}
            >
              <input type="radio" checked={metodoPago === 'mercadopago'} readOnly style={{ accentColor: '#f97316', cursor: 'pointer' }} />
              <span style={{ color: '#475569', fontSize: '0.95rem', fontWeight: metodoPago === 'mercadopago' ? '600' : '400' }}>Mercado Pago</span>
            </div>

            {/* 2: Efectivo */}
            <div 
              onClick={() => setMetodoPago('efectivo')}
              style={{
                border: metodoPago === 'efectivo' ? '2px solid #f97316' : '1px solid #e2e8f0',
                padding: '1rem',
                borderRadius: '8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                background: metodoPago === 'efectivo' ? '#fff7ed' : 'white',
                transition: 'all 0.2s'
              }}
            >
              <input type="radio" checked={metodoPago === 'efectivo'} readOnly style={{ accentColor: '#f97316', cursor: 'pointer' }} />
              <span style={{ color: '#475569', fontSize: '0.95rem', fontWeight: metodoPago === 'efectivo' ? '600' : '400' }}>Efectivo</span>
            </div>

            {/* 3: Transferencia */}
            <div 
              onClick={() => setMetodoPago('transferencia')}
              style={{
                border: metodoPago === 'transferencia' ? '2px solid #f97316' : '1px solid #e2e8f0',
                padding: '1rem',
                borderRadius: '8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                background: metodoPago === 'transferencia' ? '#fff7ed' : 'white',
                transition: 'all 0.2s'
              }}
            >
              <input type="radio" checked={metodoPago === 'transferencia'} readOnly style={{ accentColor: '#f97316', cursor: 'pointer' }} />
              <span style={{ color: '#475569', fontSize: '0.95rem', fontWeight: metodoPago === 'transferencia' ? '600' : '400' }}>Transferencia</span>
            </div>

            {/* 4: Cripto */}
            <div 
              onClick={() => setMetodoPago('cripto')}
              style={{
                border: metodoPago === 'cripto' ? '2px solid #f97316' : '1px solid #e2e8f0',
                padding: '1rem',
                borderRadius: '8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                background: metodoPago === 'cripto' ? '#fff7ed' : 'white',
                transition: 'all 0.2s'
              }}
            >
              <input type="radio" checked={metodoPago === 'cripto'} readOnly style={{ accentColor: '#f97316', cursor: 'pointer' }} />
              <span style={{ color: '#475569', fontSize: '0.95rem', fontWeight: metodoPago === 'cripto' ? '600' : '400' }}>Cripto (USDT)</span>
            </div>
          </div>

          {/* CONTENIDO CONDICIONAL: Cambia según qué botón toques */}
          
          {metodoPago === 'mercadopago' && (
            <div>
              <div style={{ background: '#f0f9ff', color: '#0369a1', padding: '1rem', borderRadius: '8px', marginBottom: '1rem', textAlign: 'center' }}>
                Al confirmar, podrás pagar de forma segura con dinero en tu cuenta o tarjetas a través de Mercado Pago.
              </div>
              <button onClick={handlePagoMercadoPago} style={{ width: '100%', background: '#0ea5e9', color: 'white', padding: '14px', borderRadius: '8px', border: 'none', fontWeight: 'bold', fontSize: '1.1rem', cursor: 'pointer', transition: 'background 0.2s' }} onMouseEnter={(e) => e.target.style.background = '#0284c7'} onMouseLeave={(e) => e.target.style.background = '#0ea5e9'}>
                Confirmar y Pagar ${total.toLocaleString()}
              </button>
            </div>
          )}

          {metodoPago === 'efectivo' && (
            <div style={{ background: '#f8fafc', padding: '2rem', borderRadius: '8px', textAlign: 'center', border: '1px solid #e2e8f0' }}>
              <h3 style={{ margin: '0 0 10px 0', color: '#0f172a' }}>Pago en Efectivo</h3>
              <p style={{ color: '#64748b', fontSize: '0.95rem' }}>Te generaremos un cupón de pago para que abones en Rapipago o Pago Fácil.</p>
              <button style={{ marginTop: '1rem', background: '#0f172a', color: 'white', padding: '12px 24px', borderRadius: '8px', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>Generar Cupón</button>
            </div>
          )}

          {metodoPago === 'transferencia' && (
            <div style={{ background: '#f8fafc', padding: '2rem', borderRadius: '8px', textAlign: 'center', border: '1px solid #e2e8f0' }}>
              <h3 style={{ margin: '0 0 10px 0', color: '#0f172a' }}>Transferencia Bancaria</h3>
              <p style={{ color: '#64748b', fontSize: '0.95rem' }}>Transferí directamente a nuestra cuenta. Tu pedido se preparará cuando los fondos se hayan acreditado.</p>
              <button style={{ marginTop: '1rem', background: '#0f172a', color: 'white', padding: '12px 24px', borderRadius: '8px', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>Ver Datos Bancarios</button>
            </div>
          )}

          {metodoPago === 'cripto' && (
            <div style={{ marginTop: '1.5rem' }}>
              <PagoCripto totalARS={total} /> 
            </div>
          )}

          <div style={{ marginTop: '2.5rem', textAlign: 'center' }}>
            <Link to="/carrito" style={{ color: '#f97316', textDecoration: 'none', fontWeight: '600', fontSize: '0.95rem' }}>
              ← Volver al Carrito
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}