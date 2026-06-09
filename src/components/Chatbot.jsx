import { useState } from 'react';

// Nuestra Pila manual para el historial (sin arrays nativos)
class Pila {
    constructor() {
        this.elementos = {};
        this.tope = 0;
    }

    apilar(dato) {
        this.tope = this.tope + 1;
        this.elementos[this.tope] = dato;
    }

    obtenerTodos() {
        let resultado = [];
        for (let i = 1; i <= this.tope; i = i + 1) {
            resultado.push(this.elementos[i]);
        }
        return resultado;
    }

    copiar() {
        let nuevaPila = new Pila();
        for (let i = 1; i <= this.tope; i = i + 1) {
            nuevaPila.apilar(this.elementos[i]);
        }
        return nuevaPila;
    }
}

export default function Chatbot() {
    const [mensaje, setMensaje] = useState("");
    const [historial, setHistorial] = useState(new Pila());
    const [abierto, setAbierto] = useState(false); // Controla la burbuja

    async function mandarMensaje(evento) {
        evento.preventDefault();
        
        if (mensaje === "") return;

        // 1. Apilamos el mensaje del usuario
        let pilaActualizada = historial.copiar();
        pilaActualizada.apilar({ texto: mensaje, esUsuario: true });
        setHistorial(pilaActualizada);
        setMensaje(""); 

        // 2. Conectamos con n8n en producción (sin el -test)
        try {
            let respuestaServidor = await fetch("http://localhost:5678/webhook/chatbot-tienda", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ mensaje: mensaje })
            });

            let datos = await respuestaServidor.json();

            // 3. Apilamos la respuesta
            let pilaConRespuesta = pilaActualizada.copiar();
            pilaConRespuesta.apilar({ texto: datos.respuesta, esUsuario: false });
            setHistorial(pilaConRespuesta);

        } catch (error) {
            console.log("No se pudo conectar con n8n", error);
        }
    }

    return (
        <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000 }}>
            {/* Si está cerrado, mostramos un botón redondo naranja */}
            {!abierto && (
                <button 
                    onClick={function() { setAbierto(true); }}
                    style={{ background: '#ff6b00', color: 'white', border: 'none', borderRadius: '50%', width: '60px', height: '60px', cursor: 'pointer', boxShadow: '0 4px 8px rgba(0,0,0,0.2)', fontSize: '24px' }}
                >
                    💬
                </button>
            )}

            {/* Si está abierto, mostramos la ventana del chat */}
            {abierto && (
                <div className="contenedor-chatbot" style={{ border: '2px solid #ccc', borderRadius: '10px', padding: '15px', width: '320px', background: 'white', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                        <h3 style={{ margin: 0, fontSize: '16px' }}>Asistente SportMax</h3>
                        <button onClick={function() { setAbierto(false); }} style={{ background: 'transparent', border: 'none', fontSize: '18px', cursor: 'pointer' }}>✖</button>
                    </div>
                    
                    <div className="ventana-mensajes" style={{ height: '300px', overflowY: 'auto', marginBottom: '15px', display: 'flex', flexDirection: 'column' }}>
                        {historial.obtenerTodos().map(function(msg, index) {
                            return (
                                <div key={index} style={{ textAlign: msg.esUsuario ? 'right' : 'left', margin: '5px 0' }}>
                                    <span style={{ 
                                        background: msg.esUsuario ? '#ff6b00' : '#f1f1f1', 
                                        color: msg.esUsuario ? '#fff' : '#000', 
                                        padding: '10px', 
                                        borderRadius: '10px',
                                        display: 'inline-block',
                                        maxWidth: '85%',
                                        fontSize: '14px'
                                    }}>
                                        {msg.texto}
                                    </span>
                                </div>
                            );
                        })}
                    </div>

                    <form onSubmit={mandarMensaje} style={{ display: 'flex', gap: '5px' }}>
                        <input 
                            type="text" 
                            value={mensaje} 
                            onChange={function(e) { setMensaje(e.target.value); }} 
                            placeholder="Consultá talles o productos..." 
                            style={{ flexGrow: 1, padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
                        />
                        <button type="submit" style={{ padding: '8px 15px', background: '#ff6b00', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Enviar</button>
                    </form>
                </div>
            )}
        </div>
    );
}