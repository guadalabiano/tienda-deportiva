import { useState, useEffect } from 'react';

export default function CalculadoraEnvio({ subtotal, setEnvioValido, setTotalConEnvio }) {
  const [cp, setCp] = useState('');
  const [retiroEnLocal, setRetiroEnLocal] = useState(false);
  const [costoEnvio, setCostoEnvio] = useState(null);

  // Cada vez que cambia el método de envío, recalculamos el total y la validez
  useEffect(() => {
    if (retiroEnLocal) {
      setCostoEnvio(0);
      setEnvioValido(true);
      setTotalConEnvio(subtotal);
    } else if (costoEnvio !== null && cp.length === 4) {
      setEnvioValido(true);
      setTotalConEnvio(subtotal + costoEnvio);
    } else {
      setEnvioValido(false);
      setTotalConEnvio(subtotal);
    }
  }, [retiroEnLocal, costoEnvio, cp, subtotal, setEnvioValido, setTotalConEnvio]);

  // Esta función se ejecuta cada vez que el usuario presiona una tecla
  const handleCpChange = (e) => {
    const valor = e.target.value.replace(/\D/g, ''); // Fuerza a que solo puedan escribir números
    if (valor.length > 4) return; // Frena cuando llegan a 4 dígitos

    setCp(valor);

    // Si llegó a 4 números, hace el cálculo automático sin necesidad de botones
    if (valor.length === 4) {
      const cpNumero = parseInt(valor);
      let costo = 6000; // Resto del país
      
      if (cpNumero >= 5500 && cpNumero <= 5519) {
        costo = 1500; // Tarifa local
      } else if (cpNumero >= 1000 && cpNumero <= 1499) {
        costo = 4500; // Tarifa CABA
      }
      
      setCostoEnvio(costo);
    } else {
      setCostoEnvio(null); // Si borran un número, resetea el cálculo
    }
  };

  return (
    <div style={{ padding: '1.5rem', background: '#1e293b', borderRadius: '12px', color: 'white' }}>
      <h4 style={{ margin: '0 0 15px 0', fontSize: '1.1rem' }}>Método de Entrega</h4>
      
      {/* Checkbox Retiro en Local */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.2rem' }}>
        <input 
          type="checkbox" 
          id="retiro"
          checked={retiroEnLocal}
          onChange={(e) => {
            setRetiroEnLocal(e.target.checked);
            if (e.target.checked) {
              setCp('');
              setCostoEnvio(0);
            } else {
              setCostoEnvio(null);
            }
          }}
          style={{ width: '18px', height: '18px', cursor: 'pointer' }}
        />
        <label htmlFor="retiro" style={{ cursor: 'pointer', fontSize: '0.95rem', fontWeight: '500' }}>
          Retiro en sucursal (Gratis)
        </label>
      </div>

      {/* Input de Código Postal Auto-calculable */}
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <input 
          type="text" 
          placeholder="Tu CP (Ej: 5500)" 
          value={cp}
          disabled={retiroEnLocal}
          onChange={handleCpChange}
          style={{ 
            padding: '10px', 
            borderRadius: '6px', 
            border: 'none', 
            width: '100%',
            maxWidth: '200px',
            background: retiroEnLocal ? '#475569' : 'white',
            color: retiroEnLocal ? '#94a3b8' : '#0f172a',
            fontSize: '0.95rem',
            outline: 'none',
            transition: 'all 0.2s'
          }}
        />
      </div>

      {/* Textos dinámicos de respuesta */}
      {retiroEnLocal && (
        <div style={{ marginTop: '15px', borderTop: '1px solid #334155', paddingTop: '10px', color: '#10b981', fontSize: '0.9rem' }}>
          ✓ Seleccionado: Retiro por sede central.
        </div>
      )}

      {!retiroEnLocal && cp.length > 0 && cp.length < 4 && (
        <div style={{ marginTop: '15px', fontSize: '0.85rem', color: '#94a3b8' }}>
          Ingresá los 4 números del CP...
        </div>
      )}

      {!retiroEnLocal && costoEnvio !== null && cp.length === 4 && (
        <div style={{ marginTop: '15px', borderTop: '1px solid #334155', paddingTop: '10px', fontSize: '0.9rem', color: '#10b981' }}>
          ✓ Costo de envío: <strong>${costoEnvio}</strong>
        </div>
      )}
    </div>
  );
}