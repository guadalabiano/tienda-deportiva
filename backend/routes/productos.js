import express from 'express';
import * as productController from '../controllers/productController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.get('/', productController.getAllProductos);
router.get('/categoria/:categoria', productController.getProductosByCategoria);
router.get('/:id', productController.getProductoById);
router.post('/', authMiddleware, productController.createProducto);
router.put('/:id', authMiddleware, productController.updateProducto);
router.delete('/:id', authMiddleware, productController.deleteProducto);

export default router;
