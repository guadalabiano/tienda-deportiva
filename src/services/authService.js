const defaultUsers = [
  {
    nombre: 'Admin',
    email: 'admin@tienda.com',
    password: '123456',
    rol: 'admin'
  },
  {
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
    return defaultUsers;
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
  return defaultUsers;
};

const saveUsers = (users) => {
  localStorage.setItem('users', JSON.stringify(users));
};

export const authService = {
  login: async (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = getStoredUsers();
        const user = users.find(
          (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
        );

        if (!user) {
          reject(new Error('Email o contraseña inválidos'));
          return;
        }

        resolve({ nombre: user.nombre, email: user.email, rol: user.rol });
      }, 200);
    });
  },

  registro: async (nombre, email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = getStoredUsers();
        const emailExists = users.some((u) => u.email.toLowerCase() === email.toLowerCase());

        if (emailExists) {
          reject(new Error('Ya existe una cuenta con ese email'));
          return;
        }

        const newUser = { nombre, email, password, rol: 'user' };
        saveUsers([...users, newUser]);
        resolve({ nombre, email, rol: 'user' });
      }, 200);
    });
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getProfile: async () => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  }
};
