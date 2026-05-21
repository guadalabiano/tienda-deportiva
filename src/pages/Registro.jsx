import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/authService';

export default function Registro() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validación de contraseñas
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden. Por favor, revisalas.');
      return;
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    setLoading(true);

    try {
      const user = await authService.registro(nombre, email, password);
      login(user);
      navigate('/');
    } catch (err) {
      setError(err.message);
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
      backgroundColor: '#f8fafc' // Fondo gris clarito
    }}>
      
      <div style={{ 
        background: 'white', 
        padding: '2.5rem', 
        borderRadius: '16px', 
        boxShadow: '0 10px 25px rgba(0,0,0,0.05)', 
        width: '100%', 
        maxWidth: '420px',
        border: '1px solid #e2e8f0'
      }}>
        
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{ color: '#0f172a', fontSize: '1.8rem', fontWeight: '900', margin: '0' }}>
            Unite al Equipo
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '5px' }}>
            Completá tus datos para empezar a comprar
          </p>
        </div>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          
          {error && (
            <div style={{
              background: '#fee2e2',
              border: '1px solid #fecaca',
              color: '#dc2626',
              padding: '12px',
              borderRadius: '8px',
              fontSize: '0.9rem'
            }}>
              {error}
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
            <label style={{ marginBottom: '6px', fontSize: '0.85rem', fontWeight: '600', color: '#334155' }}>
              Nombre Completo
            </label>
            <input 
              type="text" 
              value={nombre} 
              onChange={(e) => setNombre(e.target.value)} 
              placeholder="Ej: Juan Pérez"
              required
              disabled={loading}
              style={{ padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '1rem', outline: 'none' }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
            <label style={{ marginBottom: '6px', fontSize: '0.85rem', fontWeight: '600', color: '#334155' }}>
              Email
            </label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="tu@correo.com"
              required
              disabled={loading}
              style={{ padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '1rem', outline: 'none' }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
            <label style={{ marginBottom: '6px', fontSize: '0.85rem', fontWeight: '600', color: '#334155' }}>
              Contraseña
            </label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Mínimo 6 caracteres"
              required
              disabled={loading}
              style={{ padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '1rem', outline: 'none' }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
            <label style={{ marginBottom: '6px', fontSize: '0.85rem', fontWeight: '600', color: '#334155' }}>
              Confirmar Contraseña
            </label>
            <input 
              type="password" 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)} 
              placeholder="Repetí tu contraseña"
              required
              disabled={loading}
              style={{ padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '1rem', outline: 'none' }}
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
            boxShadow: '0 4px 6px rgba(249, 115, 22, 0.2)',
            transition: 'background 0.2s'
          }}>
            {loading ? 'Registrando...' : 'Registrarme ahora'}
          </button>

        </form>

        <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.9rem', color: '#64748b' }}>
          ¿Ya tenés cuenta?{' '}
          <Link to="/login" style={{ color: '#f97316', textDecoration: 'none', fontWeight: 'bold' }}>
            Iniciá sesión
          </Link>
        </p>

      </div>
    </div>
  );
}