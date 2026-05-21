import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home.jsx';
import DetalleProducto from './pages/DetalleProducto.jsx';
import Carrito from './pages/Carrito.jsx';
import Login from './pages/Login.jsx';
import Admin from './pages/Admin.jsx';

function App() {
  return (
    <Router>
      <nav style={{ padding: '1rem', background: '#333', color: 'white' }}>
       
        <Link to="/" style={{ marginRight: '10px', color: 'white' }}>Inicio</Link>
        <Link to="/carrito" style={{ marginRight: '10px', color: 'white' }}>Carrito</Link>
        <Link to="/admin" style={{ color: 'white' }}>Panel Admin</Link>
        <Link to="/login" style={{marginLeft: '10px', color: 'lightblue' }}> Iniciar Sesión</Link>
      </nav>

      <div style={{ padding: '2rem' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/producto/:id" element={<DetalleProducto />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
  
}

export default App;