import { verifyToken } from '../config/jwt.js';

export function authMiddleware(req, res, next) {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'Token no proporcionado' });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return res.status(401).json({ error: 'Token inválido' });
    }

    req.userId = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Error en autenticación' });
  }
}
