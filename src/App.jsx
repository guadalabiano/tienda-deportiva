import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Registro from './pages/Registro.jsx';

export default function App() {
  return (
    <BrowserRouter>
      {/* --- BARRA DE NAVEGACIÓN --- */}
      <nav style={{
        background: '#0f172a', 
        padding: '1rem 2.5rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        fontFamily: 'system-ui, sans-serif'
      }}>
        
        {/* Logo / Nombre de la tienda */}
        <Link to="/" style={{ 
          color: 'white', 
          textDecoration: 'none', 
          fontSize: '1.5rem', 
          fontWeight: '900',
          letterSpacing: '-0.5px'
        }}>
          Sport<span style={{ color: '#f97316' }}>Max</span>
        </Link>

        {/* Botones de la derecha */}
        <div style={{ display: 'flex', gap: '25px', alignItems: 'center' }}>
          
          {/* Botón del Carrito */}
          <button style={{
            background: 'transparent',
            border: 'none',
            color: '#cbd5e1',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
            padding: '5px'
          }}>
            {/* Ícono de carrito en SVG */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            {/* Globito contador de productos */}
            <span style={{
              position: 'absolute',
              top: '-5px',
              right: '-8px',
              background: '#f97316',
              color: 'white',
              borderRadius: '50%',
              padding: '2px 6px',
              fontSize: '0.7rem',
              fontWeight: 'bold'
            }}>0</span>
          </button>

          <Link to="/login" style={{ 
            color: '#cbd5e1', 
            textDecoration: 'none', 
            fontWeight: '600',
            fontSize: '0.95rem'
          }}>
            Iniciar Sesión
          </Link>
          
          <Link to="/registro" style={{ 
            background: '#f97316', 
            color: 'white', 
            textDecoration: 'none', 
            padding: '8px 18px', 
            borderRadius: '6px', 
            fontWeight: 'bold',
            fontSize: '0.95rem',
            boxShadow: '0 2px 4px rgba(249, 115, 22, 0.3)'
          }}>
            Registrarse
          </Link>
        </div>
      </nav>

      {/* --- RUTAS DE LAS PANTALLAS --- */}
      <Routes>
        <Route path="/" element={
          <div style={{ textAlign: 'center', marginTop: '50px', fontFamily: 'system-ui' }}>
            <h2>Catálogo en construcción 🛠️</h2>
          </div>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
      </Routes>
    </BrowserRouter>
  );
}