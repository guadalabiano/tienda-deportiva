export const crearPreferenciaPago = async (cartItems = [], totalCarrito) => {
  try {
    const rawApiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
    const apiBaseUrl = rawApiBaseUrl.replace(/\/+$/, '');
    const apiUrl = apiBaseUrl.endsWith('/api')
      ? `${apiBaseUrl}/mercadopago/crear-preferencia`
      : `${apiBaseUrl}/api/mercadopago/crear-preferencia`;
    const total = Number(totalCarrito ?? 0);
    const items = cartItems.length
      ? cartItems.map((item) => ({
          title: item.nombre,
          quantity: Number(item.cantidad) || 1,
          unit_price: Number(item.precio) || 0,
        }))
      : [
          {
            title: 'Compra en SportMax',
            quantity: 1,
            unit_price: total,
          },
        ];

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ total, items }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Error al conectar con el servidor');
    }

    return result;
  } catch (error) {
    console.error('Error en el servicio de Mercado Pago:', error);
    throw error;
  }
};