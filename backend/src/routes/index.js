import { Router } from 'express';
import * as auth     from '../controllers/authController.js';
import * as products from '../controllers/productController.js';
import * as orders   from '../controllers/orderController.js';
import * as cats     from '../controllers/categoryController.js';
import { authMiddleware, adminMiddleware } from '../middleware/auth.js';

const router = Router();

// ── Auth ──────────────────────────────────────────────────
router.post('/auth/register', auth.register);
router.post('/auth/login',    auth.login);

// ── Categorías ────────────────────────────────────────────
router.get('/categories',           cats.getAll);
router.post('/categories',          authMiddleware, adminMiddleware, cats.create);
router.delete('/categories/:id',    authMiddleware, adminMiddleware, cats.remove);

// ── Productos ─────────────────────────────────────────────
router.get('/products',             products.getAll);
router.get('/products/:id',         products.getOne);
router.post('/products',            authMiddleware, adminMiddleware, products.create);
router.put('/products/:id',         authMiddleware, adminMiddleware, products.update);
router.delete('/products/:id',      authMiddleware, adminMiddleware, products.remove);

// ── Órdenes ───────────────────────────────────────────────
router.post('/orders',              authMiddleware, orders.createOrder);
router.get('/orders',               authMiddleware, orders.getUserOrders);
router.get('/orders/:id',           authMiddleware, orders.getOrder);

export default router;
