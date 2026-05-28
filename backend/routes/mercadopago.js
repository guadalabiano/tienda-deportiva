import express from 'express';
import * as mercadoPagoController from '../controllers/mercadoPagoController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.post('/checkout', authMiddleware, mercadoPagoController.createPayment);

export default router;
