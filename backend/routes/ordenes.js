import express from 'express';
import * as ordenController from '../controllers/ordenController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.post('/', authMiddleware, ordenController.createOrden);
router.get('/', authMiddleware, ordenController.getOrdenesByUsuario);
router.get('/:id', authMiddleware, ordenController.getOrdenById);
router.put('/:id', authMiddleware, ordenController.updateOrdenEstado);

export default router;
