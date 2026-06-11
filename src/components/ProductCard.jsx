import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext'; // <-- Control de sesión
import SuccessToast from './SuccessToast';

export default function ProductCard({ producto }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { user } = useAuth(); // <-- Traemos el estado del usuario
  const navigate = useNavigate(); // <-- Para redirigir al login
  const isFav = isInWishlist(producto.id);
  const [showToast, setShowToast] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    
    // BLOQUEO: Si no hay usuario, va al login
    if (!user) {
      navigate('/login');
      return;
    }

    addToCart(producto);
    setShowToast(true);
  };

  const handleToggleWishlist = (event) => {
    event.preventDefault();
    event.stopPropagation();

    // BLOQUEO: Si no hay usuario, va al login
    if (!user) {
      navigate('/login');
      return;
    }

    toggleWishlist(producto);
  };

  return (
    <div
      style={{
        background: 'white',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 4px 6px rgba(0,0,0,0.07)',
        transition: 'transform 0.3s, box-shadow 0.3s',
        cursor: 'pointer',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        height: '100%' 
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 12px 16px rgba(0,0,0,0.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.07)';
      }}
    >
      {/* Botón Flotante de Corazón */}
      <button
        onClick={handleToggleWishlist}
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          background: 'white',
          borderRadius: '50%',
          width: '32px',
          height: '32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: 'none',
          cursor: 'pointer',
          fontSize: '1.2rem',
          zIndex: 10,
          padding: '0',
          color: isFav ? '#ef4444' : '#94a3b8',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          transition: 'transform 0.2s ease-in-out'
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        {isFav ? '♥' : '♡'}
      </button>

      {/* Imagen y Badge */}
      <Link to={`/producto/${producto.id}`} style={{ textDecoration: 'none' }}>
        {producto.destacado && (
          <span style={{
            position: 'absolute',
            top: '10px',
            left: '10px',
            background: '#f97316',
            color: 'white',
            padding: '4px 8px',
            borderRadius: '8px',
            fontSize: '0.7rem',
            fontWeight: '700',
            zIndex: 5
          }}>
            Destacado
          </span>
        )}
        <div style={{ width: '100%', height: '220px', background: '#f1f5f9' }}>
          <img
            src={producto.imagen}
            alt={producto.nombre}
            onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/500x400?text=Sin+Imagen'; }}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
        </div>
      </Link>

      {/* Contenedor Inferior */}
      <div style={{ 
        padding: '1rem', 
        display: 'flex', 
        flexDirection: 'column', 
        flexGrow: 1 
      }}>
        
        {/* Título y Descripción */}
        <div style={{ flexGrow: 1, textAlign: 'center' }}>
          <Link to={`/producto/${producto.id}`} style={{ textDecoration: 'none' }}>
            <h3 style={{
              margin: '0 0 0.5rem 0',
              fontSize: '1.05rem',
              color: '#0f172a',
              lineHeight: '1.3',
              height: '2.6em', 
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical'
            }}>
              {producto.nombre}
            </h3>
          </Link>

          <p style={{
            margin: '0 0 1rem 0',
            fontSize: '0.85rem',
            color: '#64748b',
            lineHeight: '1.4',
            height: '2.8em', 
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical'
          }}>
            {producto.descripcion}
          </p>
        </div>

        {/* Precio y Botones */}
        <div style={{
          display: 'flex',
          flexDirection: 'column', 
          alignItems: 'center',    
          gap: '0.75rem'           
        }}>
          
          {/* Precios */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '1.35rem', fontWeight: '900', color: '#ea580c' }}>
              ${producto.precio.toLocaleString()}
            </span>
            {producto.oferta && producto.precioAnterior && (
              <span style={{ fontSize: '0.85rem', color: '#94a3b8', textDecoration: 'line-through' }}>
                ${producto.precioAnterior.toLocaleString()}
              </span>
            )}
          </div>

          {/* Botones */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', width: '100%' }}>
            <button
              onClick={handleToggleWishlist}
              style={{
                background: isFav ? '#f97316' : 'white',
                color: isFav ? 'white' : '#0f172a',
                border: isFav ? '1px solid #f97316' : '1px solid #cbd5e1',
                padding: '8px 14px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '0.85rem',
                transition: 'all 0.2s',
                whiteSpace: 'nowrap'
              }}
            >
              {isFav ? 'Deseado' : 'Deseo'}
            </button>

            {producto.stock > 0 ? (
              <button
                onClick={handleAddToCart}
                style={{
                  background: '#f97316',
                  color: 'white',
                  border: '1px solid #f97316',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '700',
                  fontSize: '0.85rem',
                  transition: 'background 0.2s',
                  whiteSpace: 'nowrap'
                }}
                onMouseEnter={(e) => e.target.style.background = '#ea580c'}
                onMouseLeave={(e) => e.target.style.background = '#f97316'}
              >
                Agregar
              </button>
            ) : (
              <span style={{
                background: '#fee2e2',
                color: '#dc2626',
                padding: '8px 14px',
                borderRadius: '8px',
                fontSize: '0.85rem',
                fontWeight: '700',
                whiteSpace: 'nowrap'
              }}>
                Sin stock
              </span>
            )}
          </div>
        </div>

        <div style={{ marginTop: '1rem', textAlign: 'center', fontSize: '0.75rem', color: '#94a3b8' }}>
          Stock: {producto.stock}
        </div>

      </div>
      
      {showToast && <SuccessToast onClose={() => setShowToast(false)} />}
    </div>
  );
}