import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider, useCart } from './context/CartContext';
import { ProductsProvider } from './context/ProductsContext';
import { WishlistProvider, useWishlist } from './context/WishlistContext';
import Login from './pages/Login.jsx';
import Registro from './pages/Registro.jsx';
import Home from './pages/Home.jsx';
import Carrito from './pages/Carrito.jsx';
import Checkout from './pages/Checkout.jsx';
import Wishlist from './pages/Wishlist.jsx';
import DetalleProducto from './pages/DetalleProducto.jsx';
import Admin from './pages/Admin.jsx';
import RecuperarPassword from './pages/RecuperarPassword.jsx';

function NavBar() {
  const { user, logout } = useAuth();
  const { getTotalItems } = useCart();
  const { getWishlistCount } = useWishlist();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
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
        
        {/* Botón de wishlist */}
        <Link to="/wishlist" style={{
          background: 'transparent',
          border: 'none',
          color: '#cbd5e1',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          padding: '5px',
          textDecoration: 'none'
        }}>
          <span style={{ fontSize: '24px' }}>💖</span>
          {getWishlistCount() > 0 && (
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
            }}>
              {getWishlistCount()}
            </span>
          )}
        </Link>

        {/* Botón del Carrito */}
        <Link to="/carrito" style={{
          background: 'transparent',
          border: 'none',
          color: '#cbd5e1',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          padding: '5px',
          textDecoration: 'none'
        }}>
          {/* Ícono de carrito en SVG */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          {/* Globito contador de productos */}
          {getTotalItems() > 0 && (
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
            }}>
              {getTotalItems()}
            </span>
          )}
        </Link>

        {user ? (
          <>
            {user.rol === 'admin' && (
              <Link to="/admin" style={{ 
                color: '#cbd5e1', 
                textDecoration: 'none', 
                fontWeight: '600',
                fontSize: '0.95rem'
              }}>
                Panel Admin
              </Link>
            )}
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <span style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>
                👤 {user.nombre}
              </span>
              <button 
                onClick={handleLogout}
                style={{ 
                  background: '#ef4444', 
                  color: 'white', 
                  textDecoration: 'none', 
                  padding: '8px 18px', 
                  borderRadius: '6px', 
                  fontWeight: 'bold',
                  fontSize: '0.95rem',
                  boxShadow: '0 2px 4px rgba(239, 68, 68, 0.3)',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                Cerrar Sesión
              </button>
            </div>
          </>
        ) : (
          <>
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
          </>
        )}
      </div>
    </nav>
  );
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Registro />} />
      <Route path="/carrito" element={<Carrito />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/producto/:id" element={<DetalleProducto />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/recuperar" element={<RecuperarPassword />} />
      <Route path="*" element={
        <div style={{ textAlign: 'center', marginTop: '50px', fontFamily: 'system-ui' }}>
          <h2>Página no encontrada 404</h2>
          <Link to="/">← Volver al inicio</Link>
        </div>
      } />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <ProductsProvider>
            <BrowserRouter>
              <NavBar />
              <AppRoutes />
            </BrowserRouter>
          </ProductsProvider>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}