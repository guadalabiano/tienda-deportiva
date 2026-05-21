import { useState } from 'react';

export default function Login() {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); 

    const usuarioFalso = "admin@tienda.com";
    const passFalsa = "123456";

    if (email === usuarioFalso && password === passFalsa) {
      alert("¡Inicio de sesión exitoso! Bienvenido.");
    } else {
      alert("Error: El mail o la contraseña son incorrectos.");
    }
  };
    

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '3rem' }}>
      <h2>Acceso de Usuarios</h2>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '300px', gap: '15px', marginTop: '1rem' }}>
        
        <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
          <label style={{ marginBottom: '5px', fontWeight: 'bold' }}>Email:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="tu@correo.com"
            required
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
          <label style={{ marginBottom: '5px', fontWeight: 'bold' }}>Contraseña:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="********"
            required
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>

        <button type="submit" style={{ marginTop: '15px', padding: '10px', background: '#333', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Ingresar
        </button>

      </form>
    </div>
  );
}