import { useState, useEffect } from 'react';

export default function PagoCripto({ totalARS }) {
  const [txId, setTxId] = useState('');
  const [ordenCreada, setOrdenCreada] = useState(false);
  
  // Estados para manejar el precio real
  const [tasaCambio, setTasaCambio] = useState(null);
  const [cargandoPrecio, setCargandoPrecio] = useState(true);
  const [errorApi, setErrorApi] = useState(false);

  const billeteraTienda = "TXYZ123456789abcdefghijklmnopqrstuvwxyz";

  // Efecto que consulta la API de CriptoYa al abrir el componente
  useEffect(() => {
    const obtenerCotizacion = async () => {
      try {
        // Trae el precio de venta (ask) de USDT en pesos desde Binance
        const respuesta = await fetch('https://criptoya.com/api/binance/usdt/ars');
        if (!respuesta.ok) throw new Error('Error en la red');
        
        const data = await respuesta.json();
        setTasaCambio(data.ask); 
      } catch (error) {
        console.error("Error al traer el precio de la cripto:", error);
        setErrorApi(true);
        // Fallback: Si se cae la API, usamos un precio de rescate para no bloquear la venta
        setTasaCambio(1200); 
      } finally {
        setCargandoPrecio(false);
      }
    };

    obtenerCotizacion();
  }, []);

  const totalUSDT = tasaCambio ? (totalARS / tasaCambio).toFixed(2) : 0;

  const confirmarPago = (e) => {
    e.preventDefault();
    if (txId.length < 10) {
      alert("Por favor, ingresá un Hash (TxID) válido.");
      return;
    }
    console.log("Orden enviada a verificación con TxID:", txId, "Cotización usada:", tasaCambio);
    setOrdenCreada(true);
  };

  if (ordenCreada) {
    return (
      <div style={{ padding: '2rem', background: '#059669', color: 'white', borderRadius: '8px', textAlign: 'center' }}>
        <h3>¡Orden recibida! 🚀</h3>
        <p>Estamos verificando tu transferencia en la blockchain.</p>
        <p>Apenas los fondos impacten, prepararemos tu pedido.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '1.5rem', background: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#f8fafc' }}>
      <h3 style={{ color: '#10b981', marginBottom: '1rem', marginTop: 0 }}>Pago con USDT (Red TRC20)</h3>
      
      <div style={{ background: '#0f172a', padding: '1.5rem', borderRadius: '6px', marginBottom: '1.5rem', textAlign: 'center' }}>
        {cargandoPrecio ? (
          <p style={{ color: '#94a3b8', margin: 0 }}>Consultando cotización en vivo... ⏳</p>
        ) : (
          <>
            <p style={{ margin: '0 0 10px 0', color: '#cbd5e1' }}>Total a transferir:</p>
            <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#10b981', margin: 0 }}>
              {totalUSDT} <span style={{ fontSize: '1.2rem' }}>USDT</span>
            </p>
            <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '10px' }}>
              (Tipo de cambio: 1 USDT = ${tasaCambio} ARS {errorApi && ' - Estimado'})
            </p>
          </>
        )}
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <p style={{ fontSize: '0.9rem', marginBottom: '5px', color: '#cbd5e1' }}>Dirección de tu billetera receptora:</p>
        <input 
          type="text" 
          value={billeteraTienda} 
          readOnly 
          style={{ width: '100%', padding: '10px', borderRadius: '4px', border: 'none', background: '#334155', color: '#94a3b8', boxSizing: 'border-box' }}
        />
      </div>

      <form onSubmit={confirmarPago}>
        <p style={{ fontSize: '0.9rem', marginBottom: '5px', color: '#cbd5e1' }}>Ingresá el Hash (TxID) de tu transferencia:</p>
        <input 
          type="text" 
          placeholder="Ej: 0x123abc456..." 
          value={txId}
          disabled={cargandoPrecio}
          onChange={(e) => setTxId(e.target.value)}
          style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #475569', background: '#0f172a', color: 'white', marginBottom: '1rem', boxSizing: 'border-box' }}
        />
        <button 
          type="submit" 
          disabled={cargandoPrecio}
          style={{ 
            width: '100%', 
            background: cargandoPrecio ? '#475569' : '#10b981', 
            color: cargandoPrecio ? '#94a3b8' : 'white', 
            border: 'none', 
            padding: '12px', 
            borderRadius: '4px', 
            fontWeight: 'bold', 
            cursor: cargandoPrecio ? 'not-allowed' : 'pointer', 
            fontSize: '1rem',
            transition: 'background 0.2s'
          }}
        >
          Confirmar Transferencia
        </button>
      </form>
    </div>
  );
}