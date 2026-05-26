import { createContext, useContext, useState, useEffect } from 'react';

const WishlistContext = createContext();

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) throw new Error('useWishlist debe usarse dentro de un WishlistProvider');
  return context;
};

export const WishlistProvider = ({ children }) => {
  // Inicializamos la wishlist buscando si ya había algo guardado en la memoria del navegador
  const [wishlistItems, setWishlistItems] = useState(() => {
    const saved = localStorage.getItem('wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  // Cada vez que la wishlist cambie, la guardamos en el navegador para que no se borre al recargar
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  // Función para agregar o sacar un producto (Toggle)
  const toggleWishlist = (producto) => {
    setWishlistItems(prev => {
      const existe = prev.find(item => item.id === producto.id);
      if (existe) {
        return prev.filter(item => item.id !== producto.id); // Si existe, lo saca
      } else {
        return [...prev, producto]; // Si no existe, lo agrega
      }
    });
  };

  // Función para saber si un producto ya tiene el corazón marcado
  const isInWishlist = (id) => {
    return wishlistItems.some(item => item.id === id);
  };

  return (
    <WishlistContext.Provider value={{ wishlistItems, toggleWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};