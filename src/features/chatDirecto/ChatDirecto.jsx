import { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';

export default function ChatDirecto() {
  const [mensajes, setMensajes] = useState([]);
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

      setTimeout(() => {
        setMensajes(prev => [...prev, {
          id: prev.length + 1,
          texto: "Hola, gracias por tu mensaje. Te responderé en breve.",
          emisor: "profesional"
        }]);
      }, 1000);
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [mensajes]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') enviarMensaje();
  };

  return (
    <div className="flex flex-col h-[90vh] bg-white">
      {/* Header */}
      <div className="bg-white px-4 py-4 shadow flex items-center">
        <div className="w-12 h-12 rounded-full bg-gray-300 overflow-hidden">
          <img 
            src="https://covalto-production-website.s3.amazonaws.com/Hero_Mobile_Cuenta_Personas_V1_1_8046e424ea.webp" 
            alt="Profesional" 
            className="w-full h-full object-cover" 
          />
        </div>
        <div className="ml-4">
          <h2 className="text-xl font-semibold text-[#49568A]">
            Contacta con {nombreProfesional}
          </h2>
        </div>
      </div>

      {/* Chat messages */}
      <div 
        ref={chatContainerRef}
        className="flex-1 px-5 py-4 overflow-y-auto bg-white"
      >
        <div className="space-y-4">
          {mensajes.map((mensaje) => (
            <div 
              key={mensaje.id} 
              className={`flex ${mensaje.emisor === 'usuario' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[75%] px-5 py-3 rounded-xl text-lg ${
                  mensaje.emisor === 'usuario'
                    ? 'bg-[#DAE0F6] text-[#49568A]'
                    : 'bg-[#E5A800] text-white'
                }`}
              >
                {mensaje.texto}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="bg-white px-5 py-4 border-t">
        <div className="flex items-center rounded-full bg-[#F9F9F9] px-5 py-3 border border-gray-300">
          <input
            type="text"
            placeholder="Escribe tu mensaje..."
            className="flex-1 bg-transparent text-lg outline-none placeholder-[#9BA8D9] text-[#49568A]"
            value={nuevoMensaje}
            onChange={(e) => setNuevoMensaje(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button 
            onClick={enviarMensaje}
            className="ml-4 text-[#49568A] hover:text-[#E5A800]"
          >
            <Send size={28} />
          </button>
        </div>
      </div>
    </div>
  );
}
