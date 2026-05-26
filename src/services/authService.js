// Datos de usuarios en memoria
const usuariosRegistrados = [
  {
    id: 1,
    nombre: 'Admin User',
    email: 'admin@tienda.com',
    password: '123456',
    rol: 'admin'
  }
];

export const authService = {
  login: async (email, password) => {
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const usuario = usuariosRegistrados.find(u => u.email === email && u.password === password);
    
    if (!usuario) {
      throw new Error('Email o contraseña incorrectos');
    }

    // Crear token simulado
    const token = btoa(JSON.stringify({ email, id: usuario.id }));
    localStorage.setItem('token', token);
    
    // Retornar usuario sin la contraseña
    const { password: _, ...userWithoutPassword } = usuario;
    return userWithoutPassword;
  },

  registro: async (nombre, email, password) => {
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Verificar si el email ya existe
    if (usuariosRegistrados.some(u => u.email === email)) {
      throw new Error('Este email ya está registrado');
    }

    // Crear nuevo usuario
    const nuevoUsuario = {
      id: usuariosRegistrados.length + 1,
      nombre,
      email,
      password,
      rol: 'user'
    };

    usuariosRegistrados.push(nuevoUsuario);

    // Crear token simulado
    const token = btoa(JSON.stringify({ email, id: nuevoUsuario.id }));
    localStorage.setItem('token', token);

    // Retornar usuario sin la contraseña
    const { password: _, ...userWithoutPassword } = nuevoUsuario;
    return userWithoutPassword;
  },

  logout: () => {
    localStorage.removeItem('token');
  },

  RecuperarPassword: async (email) => {
    // Simulamos que tarda un poquito en conectarse, igual que el login
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Buscamos si el mail existe en nuestra lista de usuarios
    const usuario = usuariosRegistrados.find(u => u.email === email);
    
    if (!usuario) {
      throw new Error('No encontramos ninguna cuenta con ese email');
    }

    // Si llega hasta acá, es porque el mail existe y simulamos que se envió el correo
    return true;
  },

  getProfile: async () => {
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No autenticado');
    }

    const decoded = JSON.parse(atob(token));
    const usuario = usuariosRegistrados.find(u => u.email === decoded.email);
    
    if (!usuario) {
      throw new Error('Usuario no encontrado');
    }

    const { password: _, ...userWithoutPassword } = usuario;
    return userWithoutPassword;
  }
};
