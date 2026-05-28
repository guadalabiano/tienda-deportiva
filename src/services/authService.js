const defaultUsers = [
  {
    id: 1,
    nombre: 'Admin',
    email: 'admin@tienda.com',
    password: '123456',
    rol: 'admin'
  },
  {
    id: 2,
    nombre: 'Usuario Demo',
    email: 'user@tienda.com',
    password: '123456',
    rol: 'user'
  }
];

const getStoredUsers = () => {
  const saved = localStorage.getItem('users');
  if (!saved) {
    localStorage.setItem('users', JSON.stringify(defaultUsers));
    return [...defaultUsers];
  }

  try {
    const parsed = JSON.parse(saved);
    if (Array.isArray(parsed)) {
      return parsed;
    }
  } catch (err) {
    console.error('Error leyendo usuarios del almacenamiento local:', err);
  }

  localStorage.setItem('users', JSON.stringify(defaultUsers));
  return [...defaultUsers];
};

const saveUsers = (users) => {
  localStorage.setItem('users', JSON.stringify(users));
};

const createToken = (user) => {
  return btoa(JSON.stringify({ id: user.id, email: user.email, timestamp: Date.now() }));
};

export const authService = {
  login: async (email, password) => {
    await new Promise((resolve) => setTimeout(resolve, 300));

    const users = getStoredUsers();
    const user = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (!user) {
      throw new Error('Email o contraseña inválidos');
    }

    const token = createToken(user);
    localStorage.setItem('token', token);

    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  },

  registro: async (nombre, email, password) => {
    await new Promise((resolve) => setTimeout(resolve, 300));

    const users = getStoredUsers();
    const emailExists = users.some((u) => u.email.toLowerCase() === email.toLowerCase());

    if (emailExists) {
      throw new Error('Ya existe una cuenta con ese email');
    }

    const newUser = {
      id: users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1,
      nombre,
      email,
      password,
      rol: 'user'
    };

    const updatedUsers = [...users, newUser];
    saveUsers(updatedUsers);

    const token = createToken(newUser);
    localStorage.setItem('token', token);

    const { password: _, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  RecuperarPassword: async (email) => {
    await new Promise((resolve) => setTimeout(resolve, 300));

    const users = getStoredUsers();
    const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());

    if (!user) {
      throw new Error('No encontramos ninguna cuenta con ese email');
    }

    return true;
  },

  getProfile: async () => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  }
};
