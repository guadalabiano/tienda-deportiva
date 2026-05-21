import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/authService';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const user = await authService.login(email, password);
      login(user);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Error al iniciar sesión');
    } finally {
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
      backgroundColor: '#f8fafc' // Un gris súper clarito de fondo
    }}>
      
      <div style={{ 
        background: 'white', 
        padding: '2.5rem', 
        borderRadius: '16px', 
        boxShadow: '0 10px 25px rgba(0,0,0,0.05)', 
        width: '100%', 
        maxWidth: '380px',
        border: '1px solid #e2e8f0'
      }}>
        
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{ color: '#0f172a', fontSize: '1.8rem', fontWeight: '900', margin: '0' }}>
            Bienvenido
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '5px' }}>
            Ingresá a tu cuenta para continuar
          </p>
        </div>
        
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
                transition: 'border-color 0.2s'
              }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
            <label style={{ marginBottom: '8px', fontSize: '0.9rem', fontWeight: '600', color: '#334155' }}>
              Contraseña
            </label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="••••••••"
              required
              disabled={loading}
              style={{ 
                padding: '12px 15px', 
                borderRadius: '8px', 
                border: '1px solid #cbd5e1',
                fontSize: '1rem',
                outline: 'none'
              }}
            />
          </div>

          <button type="submit" disabled={loading} style={{ 
            marginTop: '10px', 
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
            {loading ? 'Ingresando...' : 'Ingresar'}
          </button>

        </form>

        <div style={{ marginTop: '1rem', padding: '1rem', background: '#f1f5f9', borderRadius: '8px', fontSize: '0.85rem', color: '#475569' }}>
          <p style={{ margin: '0 0 0.5rem 0', fontWeight: '600' }}>Credenciales demo:</p>
          <p style={{ margin: '0.25rem 0' }}>📧 admin@tienda.com</p>
          <p style={{ margin: '0.25rem 0' }}>🔑 123456</p>
        </div>

        <p style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.9rem', color: '#64748b' }}>
          ¿No tenés cuenta?{' '}
          <Link to="/registro" style={{ color: '#f97316', textDecoration: 'none', fontWeight: 'bold' }}>
            Registrate acá
          </Link>
        </p>

      </div>
    </div>
  );
}