import { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';

export default function ChatDirecto() {
  const [mensajes, setMensajes] = useState([
    { id: 1, texto: "Hola!", emisor: "profesional" },
    { id: 2, texto: "Hola!", emisor: "usuario" },
  ]);
  const [nuevoMensaje, setNuevoMensaje] = useState("");
  const chatContainerRef = useRef(null);
  const [nombreProfesional, setNombreProfesional] = useState("Nombre de profesionista");

  const enviarMensaje = () => {
    if (nuevoMensaje.trim() !== "") {
      setMensajes([...mensajes, { 
        id: mensajes.length + 1, 
        texto: nuevoMensaje, 
        emisor: "usuario" 
      }]);
      setNuevoMensaje("");
      
      // Simular respuesta después de un breve retraso
      setTimeout(() => {
        setMensajes(prevMensajes => [...prevMensajes, { 
          id: prevMensajes.length + 1, 
          texto: "Gracias por tu mensaje. Te responderé en breve.", 
          emisor: "profesional" 
        }]);
      }, 1000);
    }
  };

  // Auto-scroll al último mensaje
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [mensajes]);

  // Manejar tecla Enter para enviar mensajes
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      enviarMensaje();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white p-4 shadow-md flex items-center">
        <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden">
          <img 
            src="/api/placeholder/40/40" 
            alt="Profesional" 
            className="w-full h-full object-cover" 
          />
        </div>
        <div className="ml-3">
          <h2 className="text-lg font-medium text-purple-700">Contacta con {nombreProfesional}</h2>
        </div>
      </div>
      
      {/* Chat area */}
      <div 
        ref={chatContainerRef}
        className="flex-1 p-4 overflow-y-auto"
      >
        <div className="space-y-4">
          {mensajes.map((mensaje) => (
            <div 
              key={mensaje.id} 
              className={`flex ${mensaje.emisor === 'usuario' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-xs md:max-w-md px-4 py-2 rounded-lg ${
                  mensaje.emisor === 'usuario' 
                    ? 'bg-blue-200 text-gray-800' 
                    : 'bg-amber-500 text-white'
                }`}
              >
                {mensaje.texto}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Input area */}
      <div className="bg-white p-3 border-t">
        <div className="flex items-center rounded-full bg-gray-100 px-4 py-2">
          <input
            type="text"
            placeholder="Escribe tu mensaje aquí..."
            className="flex-1 bg-transparent outline-none"
            value={nuevoMensaje}
            onChange={(e) => setNuevoMensaje(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button 
            onClick={enviarMensaje}
            className="ml-2 text-blue-500 hover:text-blue-700 focus:outline-none"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}