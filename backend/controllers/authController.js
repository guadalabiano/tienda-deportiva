import { getUserByEmail, createUser, verifyPassword, getUserById } from '../models/usuario.js';
import { generateToken } from '../config/jwt.js';

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email y contraseña requeridos' });
    }

    const user = await getUserByEmail(email);

    if (!user) {
      return res.status(401).json({ error: 'Email o contraseña incorrectos' });
    }

    const passwordValid = await verifyPassword(password, user.password);

    if (!passwordValid) {
      return res.status(401).json({ error: 'Email o contraseña incorrectos' });
    }

    const token = generateToken(user.id);

    res.json({
      token,
      user: {
        id: user.id,
        nombre: user.nombre,
        email: user.email,
        rol: user.rol
      }
    });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ error: 'Error en servidor' });
  }
}

export async function registro(req, res) {
  try {
    const { nombre, email, password } = req.body;

    if (!nombre || !email || !password) {
      return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'La contraseña debe tener al menos 6 caracteres' });
    }

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return res.status(400).json({ error: 'El email ya está registrado' });
    }

    const result = await createUser(nombre, email, password);

    const token = generateToken(result.id);

    res.status(201).json({
      token,
      user: {
        id: result.id,
        nombre,
        email,
        rol: 'user'
      }
    });
  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({ error: 'Error en servidor' });
  }
}

export async function getProfile(req, res) {
  try {
    const user = await getUserById(req.userId);

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error en getProfile:', error);
    res.status(500).json({ error: 'Error en servidor' });
  }
}
