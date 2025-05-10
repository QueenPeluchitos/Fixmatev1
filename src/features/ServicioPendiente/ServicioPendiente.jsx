import { Star } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ServicioPendiente() {
  const navigate = useNavigate();

  const [serviceData] = useState({
    status: "pendiente",
    details: {
      cost: "$00.00",
      includes: [
        "Fursuit completo",
        "Tela de alta calidad",
        "Patrones a la medida"
      ],
      serviceTime: "00:00PM"
    }
  });

  const handleChatRedirect = () => {
    navigate("/chat-directo");
  };

  return (
    <div className="max-w-6xl mx-auto p-10 text-lg my-10">
      {/* Estado del servicio */}
      <div className="mb-8">
        <div className="bg-yellow-500 text-white font-semibold py-4 px-8 rounded-lg text-center text-xl">
          Servicio pendiente
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-10">
        {/* Columna izquierda */}
        <div className="w-full md:w-1/2 flex flex-col gap-8">
          <div className="relative rounded-xl overflow-hidden bg-gray-100 shadow-lg">
            <img 
              src="https://64.media.tumblr.com/7c2f3e5db6cdc33d06bf9b138f2213d7/tumblr_inline_psc4587hzu1qf5zn1_1280.jpg" 
              alt="Espacio de trabajo" 
              className="w-full h-72 object-cover"
            />
            <div className="absolute bottom-3 left-3 flex gap-1">
              {[...Array(3)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 stroke-yellow-400" />
              ))}
            </div>
            <div className="absolute bottom-3 right-3 w-12 h-12 rounded-full overflow-hidden border-2 border-white">
              <img 
                src="https://covalto-production-website.s3.amazonaws.com/Hero_Mobile_Cuenta_Personas_V1_1_8046e424ea.webp" 
                alt="Avatar" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Sección de contacto */}
          <div className="text-center">
            <h3 className="text-purple-700 text-2xl font-semibold mb-2">¿Tienes dudas?</h3>
            <p className="text-gray-600 mb-4">Contacta con tu profesionista</p>
            <button
              onClick={handleChatRedirect}
              className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-8 rounded-lg font-medium transition"
            >
              Iniciar chat directo
            </button>
          </div>
        </div>

        {/* Columna derecha */}
        <div className="w-full md:w-1/2">
          <div className="bg-blue-100 p-8 rounded-xl shadow-md h-full">
            <h2 className="text-2xl font-bold text-gray-700 mb-8">Detalles del servicio</h2>

            <div className="flex justify-between items-center mb-6">
              <span className="text-gray-600">Costo</span>
              <span className="text-xl font-semibold">{serviceData.details.cost}</span>
            </div>

            <div className="mb-6">
              <span className="text-gray-600 block mb-2">Incluye:</span>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                {serviceData.details.includes.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-600">Horario del servicio</span>
              <span className="text-xl font-semibold">{serviceData.details.serviceTime}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
