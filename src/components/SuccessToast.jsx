import { useState, useEffect } from 'react';

export default function SuccessToast({ message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: '#16a34a',
        color: 'white',
        padding: '16px 24px',
        borderRadius: '8px',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        fontSize: '1rem',
        fontWeight: '600',
        animation: 'slideIn 0.3s ease-out',
        zIndex: 9999
      }}
    >
      <span style={{ fontSize: '1.3rem' }}>✓</span>
      <span>{message}</span>
      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(400px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
