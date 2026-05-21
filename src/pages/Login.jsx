import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); 
    const usuarioFalso = "admin@tienda.com";
    const passFalsa = "123456";

    if (email === usuarioFalso && password === passFalsa) {
      alert("¡Inicio de sesión exitoso! Bienvenido.");
    } else {
      alert("Error: El mail o la contraseña son incorrectos.");
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
              style={{ 
                padding: '12px 15px', 
                borderRadius: '8px', 
                border: '1px solid #cbd5e1',
                fontSize: '1rem',
                outline: 'none'
              }}
            />
          </div>

          <button type="submit" style={{ 
            marginTop: '10px', 
            padding: '14px', 
            background: '#f97316', // Naranja deportivo 
            color: 'white', 
            border: 'none', 
            borderRadius: '8px', 
            fontSize: '1rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            boxShadow: '0 4px 6px rgba(249, 115, 22, 0.25)'
          }}>
            Ingresar
          </button>

        </form>

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