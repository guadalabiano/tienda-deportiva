import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer style={{ background: '#0f172a', color: '#f8fafc', padding: '4rem 2rem 1.5rem 2rem', marginTop: 'auto' }}>
      <div style={{ 
        maxWidth: '1100px', 
        margin: '0 auto', 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '2.5rem',
        textAlign: 'left' // Fuerza la alineación a la izquierda
      }}>
        
        {/* Sección 1: Sobre la tienda */}
        <div>
          <h3 style={{ color: '#f97316', marginBottom: '1.2rem', fontSize: '1.2rem', marginTop: 0 }}>Tienda Deportiva</h3>
          <p style={{ color: '#94a3b8', lineHeight: '1.6', fontSize: '0.9rem', margin: 0 }}>
            Tu pasión, nuestro equipamiento. Ofrecemos la mejor indumentaria y accesorios para que rindas al máximo en cada entrenamiento y partido.
          </p>
        </div>

        {/* Sección 2: Enlaces Rápidos */}
        <div>
          <h3 style={{ color: '#f8fafc', marginBottom: '1.2rem', fontSize: '1.1rem', marginTop: 0 }}>Enlaces Rápidos</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem', alignItems: 'flex-start' }}>
            <li>
              <Link to="/" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s' }}>Inicio</Link>
            </li>
            <li>
              <Link to="/carrito" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s' }}>Mi Carrito</Link>
            </li>
          </ul>
        </div>

        {/* Sección 3: Contacto y Sede */}
        <div>
          <h3 style={{ color: '#f8fafc', marginBottom: '1.2rem', fontSize: '1.1rem', marginTop: 0 }}>Sede Central</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem', color: '#94a3b8', fontSize: '0.9rem', alignItems: 'flex-start' }}>
            <li>
              Av. San Martín 1542, Ciudad, Mendoza.
            </li>
            <li>
              +54 9 261 555-0192
            </li>
            <li>
              sportmax84@gmail.com
            </li>
          </ul>
        </div>

        {/* Sección 4: Redes Sociales */}
        <div>
          <h3 style={{ color: '#f8fafc', marginBottom: '1.2rem', fontSize: '1.1rem', marginTop: 0 }}>Seguinos</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', alignItems: 'flex-start' }}>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.9rem' }}>
              Instagram
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.9rem' }}>
              Twitter
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.9rem' }}>
              Facebook
            </a>
          </div>
        </div>

      </div>

      {/* Copyright */}
      <div style={{ borderTop: '1px solid #1e293b', marginTop: '4rem', paddingTop: '1.5rem', textAlign: 'center', color: '#64748b', fontSize: '0.85rem' }}>
        <p style={{ margin: 0 }}>© {new Date().getFullYear()} Tienda Deportiva. Todos los derechos reservados.</p>
        <p style={{ margin: '0.5rem 0 0 0' }}>Desarrollado para proyecto universitario.</p>
      </div>
    </footer>
  );
}