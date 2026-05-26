import { useState } from 'react';
import { Link } from 'react-router-dom';
// 1. Importamos el servicio que armaron tus compañeros
import { authService } from '../services/authService';

export default function RecuperarPassword() {
  const [email, setEmail] = useState('');
  const [enviado, setEnviado] = useState(false);
  // 2. Agregamos los estados de carga y error (igual que en el Login)
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // 3. Transformamos la función para que sea asíncrona (async)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // 4. ACÁ OCURRE LA MAGIA: Llamamos a la base de datos
      // Nota: Asumimos que tus compañeros llamaron a esta función "recuperarPassword"
      await authService.RecuperarPassword(email);
      
      // Si todo sale bien, mostramos la pantalla de éxito
      setEnviado(true);
    } catch (err) {
      // Si falla (ej: el mail no existe), mostramos el error
      setError(err.message || 'Error al procesar la solicitud. Intentá de nuevo.');
    } finally {
      // Apagamos el estado de carga
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      minHeight: '85vh', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      fontFamily: 'system-ui, sans-serif',
      backgroundColor: '#f8fafc' 
    }}>
      
      <div style={{ 
        background: 'white', 
        padding: '2.5rem', 
        borderRadius: '16px', 
        boxShadow: '0 10px 25px rgba(0,0,0,0.05)', 
        width: '100%', 
        maxWidth: '400px',
        border: '1px solid #e2e8f0'
      }}>
        
        {!enviado ? (
          <>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <h2 style={{ color: '#0f172a', fontSize: '1.6rem', fontWeight: '900', margin: '0' }}>
                Recuperar Contraseña
              </h2>
              <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '10px', lineHeight: '1.5' }}>
                Ingresá el mail con el que te registraste y te vamos a enviar un enlace para que la cambies.
              </p>
            </div>

            {/* Cartel de error igual al del Login */}
            {error && (
              <div style={{
                background: '#fee2e2',
                border: '1px solid #fecaca',
                color: '#dc2626',
                padding: '12px',
                borderRadius: '8px',
                marginBottom: '1rem',
                fontSize: '0.9rem'
              }}>
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                <label style={{ marginBottom: '8px', fontSize: '0.9rem', fontWeight: '600', color: '#334155' }}>
                  Email
                </label>
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  placeholder="tu@correo.com"
                  required
                  disabled={loading}
                  style={{ 
                    padding: '12px 15px', 
                    borderRadius: '8px', 
                    border: '1px solid #cbd5e1',
                    fontSize: '1rem',
                    outline: 'none',
                    backgroundColor: loading ? '#f1f5f9' : 'white'
                  }}
                />
              </div>

              <button type="submit" disabled={loading} style={{ 
                marginTop: '5px', 
                padding: '14px', 
                background: loading ? '#cbd5e1' : '#f97316', 
                color: 'white', 
                border: 'none', 
                borderRadius: '8px', 
                fontSize: '1rem',
                fontWeight: 'bold',
                cursor: loading ? 'not-allowed' : 'pointer',
                boxShadow: '0 4px 6px rgba(249, 115, 22, 0.25)',
                transition: 'background 0.2s'
              }}>
                {loading ? 'Enviando...' : 'Enviar enlace'}
              </button>
            </form>
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '1rem 0' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✉️</div>
            <h2 style={{ color: '#0f172a', fontSize: '1.4rem', fontWeight: '900', margin: '0 0 10px 0' }}>
              ¡Revisá tu correo!
            </h2>
            <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: '1.5' }}>
              Te enviamos las instrucciones a <strong>{email}</strong> para que puedas crear una contraseña nueva.
            </p>
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <Link to="/login" style={{ color: '#64748b', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '600' }}>
            ← Volver al inicio de sesión
          </Link>
        </div>

      </div>
    </div>
  );
}