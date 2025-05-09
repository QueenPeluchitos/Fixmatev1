import { Star } from "lucide-react";
import { useState } from "react";

export default function ServicioCursoProf() {
  // Datos simulados del servicio
  const [serviceData] = useState({
    status: "terminado",
    serviceCode: "TK-0000",
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

  return (
    <div className="max-w-5xl mx-auto p-6 flex flex-col md:flex-row gap-8 bg-gray-50">
      {/* Columna izquierda con imagen y estado */}
      <div className="w-full md:w-1/2 flex flex-col gap-6">
        {/* Imagen del servicio con estrellas y avatar */}
        <div className="relative rounded-xl overflow-hidden bg-gray-200 shadow-lg">
          <img 
            src="/api/placeholder/600/400" 
            alt="Espacio de trabajo del servicio"
            className="w-full h-64 object-cover rounded-xl"
          />
          
          {/* Estrellas en la parte inferior izquierda */}
          <div className="absolute bottom-4 left-4 flex space-x-1">
            {[1, 2, 3].map((star, index) => (
              <Star key={index} className="w-5 h-5 text-yellow-500" />
            ))}
          </div>
          
          {/* Avatar del usuario en la parte inferior derecha */}
          <div className="absolute bottom-4 right-4 w-12 h-12 rounded-full overflow-hidden border-4 border-white shadow-md">
            <img 
              src="/api/placeholder/100/100" 
              alt="Avatar del usuario"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        {/* Estado del servicio */}
        <div className="flex justify-center">
          <div className="bg-green-600 text-white py-2 px-8 rounded-lg font-medium shadow-md">
            Servicio Terminado
          </div>
        </div>
        
        {/* Código del servicio */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="text-center text-gray-500 text-lg font-medium">
            {serviceData.serviceCode}
          </div>
          <div className="text-center text-gray-400 text-sm mt-2">
            Pida al cliente al finalizar el servicio
          </div>
        </div>
      </div>
      
      {/* Columna derecha con los detalles del servicio */}
      <div className="w-full md:w-1/2">
        <div className="bg-white p-6 rounded-lg shadow-md h-full">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">
            Detalles del Servicio
          </h2>
          
          <div className="flex justify-between items-center mb-4">
            <div className="text-gray-600">Costo</div>
            <div className="text-xl font-semibold text-green-600">{serviceData.details.cost}</div>
          </div>
          
          <div className="mb-4">
            <div className="text-gray-600 mb-2">Incluye:</div>
            <ul className="space-y-2 text-gray-700">
              {serviceData.details.includes.map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-lg">•</span>
                  <span className="ml-2">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="text-gray-600">Horario del Servicio</div>
            <div className="text-xl font-semibold text-gray-800">{serviceData.details.serviceTime}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
