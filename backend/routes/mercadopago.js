import express from 'express';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import 'dotenv/config';

const router = express.Router();
const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN });

router.post('/crear-preferencia', async (req, res) => {
  try {
    // CORRECCIÓN: Extraer el total del cuerpo de la petición
    const { total } = req.body; 
    
    if (!total) {
      return res.status(400).json({ error: 'El total es requerido' });
    }

    const preference = new Preference(client);
    const result = await preference.create({
      body: {
        items: [
          {
            title: 'Compra en SportMax',
            quantity: 1,
            unit_price: Number(total),
            currency_id: 'ARS'
          }
        ],
        back_urls: {
          success: 'http://localhost:5173/checkout',
          failure: 'http://localhost:5173/checkout',
          pending: 'http://localhost:5173/checkout'
        },
        redirect_urls: {
          success: 'http://localhost:5173/checkout',
          failure: 'http://localhost:5173/checkout',
          pending: 'http://localhost:5173/checkout'
        }
      }
    });

    return res.json({
      id: result.id,
      init_point: result.init_point
    });
  } catch (error) {
    console.error('Error al crear preferencia:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;