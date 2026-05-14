import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import DetalleProducto from './pages/DetalleProducto';
import Carrito from './pages/Carrito';
import Admin from './pages/Admin';

function App() {
  return (
    <Router>
      <nav style={{ padding: '1rem', background: '#333', color: 'white' }}>
        {/* Este es un Navbar temporal para que pruebes que funciona */}
        <Link to="/" style={{ marginRight: '10px', color: 'white' }}>Inicio</Link>
        <Link to="/carrito" style={{ marginRight: '10px', color: 'white' }}>Carrito</Link>
        <Link to="/admin" style={{ color: 'white' }}>Panel Admin</Link>
      </nav>

      <div style={{ padding: '2rem' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/producto/:id" element={<DetalleProducto />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;