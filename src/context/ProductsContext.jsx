import { createContext, useState, useContext, useEffect } from 'react';
import { productosData } from '../data/productos';

const ProductsContext = createContext();

export function ProductsProvider({ children }) {
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState('todos');
  const [error, setError] = useState(null);

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = () => {
    try {
      setLoading(true);
      setProductos(productosData);
      setError(null);
    } catch (err) {
      console.error('Error cargando productos locales:', err);
      setError('Error al cargar los productos');
    } finally {
      setLoading(false);
    }
  };

  const getProductos = () => {
    if (filtro === 'todos') return productos;
    if (filtro === 'destacados') return productos.filter(p => p.destacado);
    return productos.filter(p => p.categoria === filtro);
  };

  const getProductoById = (id) => {
    return productos.find(p => p.id === parseInt(id, 10));
  };

  const setFiltroCategoria = (categoria) => {
    setFiltro(categoria);
  };

  return (
    <ProductsContext.Provider value={{
      productos: getProductos(),
      allProductos: productos,
      loading,
      filtro,
      error,
      busqueda,     
      setBusqueda,
      getProductoById,
      setFiltroCategoria,
      recargarProductos: cargarProductos
    }}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error('useProducts debe usarse dentro de ProductsProvider');
  }
  return context;
}
