import { createContext, useState, useContext, useEffect } from 'react';
import { productService } from '../services/productService';

const ProductsContext = createContext();

export function ProductsProvider({ children }) {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState('todos');
  const [error, setError] = useState(null);

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    try {
      setLoading(true);
      const data = await productService.getAllProductos();
      setProductos(data);
      setError(null);
    } catch (err) {
      console.error('Error cargando productos:', err);
      setError('Error al cargar los productos');
    } finally {
      setLoading(false);
    }
  };

  const getProductos = () => {
    if (filtro === 'todos') return productos;
    return productos.filter(p => p.categoria === filtro);
  };

  const getProductoById = (id) => {
    return productos.find(p => p.id === parseInt(id));
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
