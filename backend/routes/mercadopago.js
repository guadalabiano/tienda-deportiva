import express from 'express';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import 'dotenv/config';

const router = express.Router();

router.post('/crear-preferencia', async (req, res) => {
  try {
    const accessToken = process.env.MP_ACCESS_TOKEN;

    if (!accessToken) {
      return res.status(500).json({
        error: 'No hay token de Mercado Pago configurado en el servidor.'
      });
    }

    const client = new MercadoPagoConfig({ accessToken });
    const { total, items = [] } = req.body;

    const normalizedItems = items.length
      ? items.map((item) => ({
          title: String(item.title || 'Producto'),
          quantity: Number(item.quantity) || 1,
          unit_price: Number(item.unit_price) || 0,
          currency_id: 'ARS',
        }))
      : [
          {
            title: 'Compra en SportMax',
            quantity: 1,
            unit_price: Number(total) || 0,
            currency_id: 'ARS',
          },
        ];

    const totalAmount = normalizedItems.reduce(
      (sum, item) => sum + Number(item.unit_price) * Number(item.quantity || 1),
      0,
    );

    if (!Number.isFinite(totalAmount) || totalAmount <= 0) {
      return res.status(400).json({ error: 'El total debe ser mayor a cero.' });
    }

    const preference = new Preference(client);
    const result = await preference.create({
      body: {
        items: normalizedItems,
        back_urls: {
          success: 'http://localhost:5173/checkout',
          failure: 'http://localhost:5173/checkout',
          pending: 'http://localhost:5173/checkout',
        },
      },
    });

    return res.json({
      id: result.id,
      init_point: result.init_point,
      total: totalAmount,
    });
  } catch (error) {
    console.error('Error al crear preferencia:', error);
    return res.status(500).json({
      error: error.message || 'No se pudo crear la preferencia de pago.',
    });
  }
});

export default router;