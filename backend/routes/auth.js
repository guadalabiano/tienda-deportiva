import express from 'express';
import * as authController from '../controllers/authController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.post('/login', authController.login);
router.post('/registro', authController.registro);
router.get('/profile', authMiddleware, authController.getProfile);

export default router;
