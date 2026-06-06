export const crearPreferenciaPago = async (totalCarrito) => {
  try {
    const response = await fetch('http://localhost:3000/api/mercadopago/crear-preferencia', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ total: totalCarrito }),
    });

    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.error || 'Error al conectar con el servidor');
    }
    
    return result; 
  } catch (error) {
    console.error('Error en el servicio:', error);
    throw error;
  }
};