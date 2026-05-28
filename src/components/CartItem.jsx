import { useCart } from '../context/CartContext';

export default function CartItem({ item }) {
  const { removeFromCart, updateQuantity } = useCart();

  return (
    <div style={{
      display: 'flex',
      gap: '1rem',
      padding: '1rem',
      background: 'white',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
      borderBottom: '1px solid #e2e8f0'
    }}>
      {/* Imagen */}
      <img 
        src={item.imagen} 
        alt={item.nombre}
        style={{
          width: '80px',
          height: '80px',
          borderRadius: '6px',
          objectFit: 'cover'
        }}
      />

      {/* Detalles */}
      <div style={{ flex: 1 }}>
        <h4 style={{ margin: '0 0 0.25rem 0', color: '#0f172a' }}>
          {item.nombre}
        </h4>
        <p style={{ margin: '0.25rem 0', fontSize: '0.9rem', color: '#64748b' }}>
          ${item.precio.toLocaleString()}
        </p>
      </div>

      {/* Cantidad */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        background: '#f1f5f9',
        borderRadius: '6px',
        padding: '0.25rem'
      }}>
        <button
          onClick={() => updateQuantity(item.id, item.cantidad - 1)}
          style={{
            width: '28px',
            height: '28px',
            border: 'none',
            background: 'transparent',
            cursor: 'pointer',
            fontSize: '1rem'
          }}
        >
          −
        </button>
        <span style={{ width: '30px', textAlign: 'center', fontWeight: '600' }}>
          {item.cantidad}
        </span>
        <button
          onClick={() => updateQuantity(item.id, item.cantidad + 1)}
          style={{
            width: '28px',
            height: '28px',
            border: 'none',
            background: 'transparent',
            cursor: 'pointer',
            fontSize: '1rem'
          }}
        >
          +
        </button>
      </div>

      {/* Subtotal */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: '0.5rem'
      }}>
        <span style={{ fontWeight: '700', fontSize: '1.1rem', color: '#f97316' }}>
          ${(item.precio * item.cantidad).toLocaleString()}
        </span>
        <button
          onClick={() => removeFromCart(item.id)}
          style={{
            background: '#fee2e2',
            color: '#dc2626',
            border: 'none',
            padding: '4px 8px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '0.8rem',
            fontWeight: '600'
          }}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}
