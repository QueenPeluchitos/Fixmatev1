import { Star } from "lucide-react";
import { useState } from "react";

export default function ServiceDetailsView() {
  // You would normally get this data from props or API
  const [serviceData] = useState({
    status: "terminado",
    serviceCode: "TK-0000",
    details: {
      cost: "$00.00",
      includes: [
        "Fursuit completo",
        "Tela de alta calida",
        "Patrones a la medida"
      ],
      serviceTime: "00:00PM"
    }
  });

  return (
    <div className="max-w-4xl mx-auto p-4 flex flex-col md:flex-row gap-6">
      {/* Left column with image and status */}
      <div className="w-full md:w-1/2 flex flex-col gap-4">
        {/* Service image with stars and user avatar */}
        <div className="relative rounded-lg overflow-hidden bg-gray-100">
          <img 
            src="/api/placeholder/600/400" 
            alt="Service workspace" 
            className="w-full h-64 object-cover"
          />
          
          {/* Stars overlay at bottom left */}
          <div className="absolute bottom-2 left-2 flex">
            <Star className="w-5 h-5 fill-yellow-400 stroke-yellow-400" />
            <Star className="w-5 h-5 fill-yellow-400 stroke-yellow-400" />
            <Star className="w-5 h-5 fill-yellow-400 stroke-yellow-400" />
          </div>
          
          {/* User avatar at bottom right */}
          <div className="absolute bottom-2 right-2 w-10 h-10 rounded-full overflow-hidden border-2 border-white">
            <img 
              src="/api/placeholder/100/100" 
              alt="User avatar" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        {/* Status button */}
        <div className="flex justify-center">
          <div className="bg-yellow-500 text-white font-medium py-2 px-6 rounded-md">
            Servicio terminado
          </div>
        </div>
        
        {/* Service code */}
        <div className="bg-gray-200 p-4 rounded-md">
          <div className="text-center text-gray-500 text-xl font-medium">
            {serviceData.serviceCode}
          </div>
          <div className="text-center text-gray-400 text-sm mt-1">
            Pida al cliente al terminar el servicio
          </div>
        </div>
      </div>
      
      {/* Right column with service details */}
      <div className="w-full md:w-1/2">
        <div className="bg-blue-100 p-6 rounded-lg h-full">
          <h2 className="text-lg font-medium text-gray-700 mb-6">
            Detalles del servicio
          </h2>
          
          <div className="flex justify-between items-center mb-5">
            <div className="text-gray-600">Costo</div>
            <div className="font-medium">{serviceData.details.cost}</div>
          </div>
          
          <div className="mb-5">
            <div className="text-gray-600 mb-1">Incluye</div>
            <ul>
              {serviceData.details.includes.map((item, index) => (
                <li key={index} className="text-gray-700">-{item}</li>
              ))}
            </ul>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="text-gray-600">Horario del servicio</div>
            <div className="font-medium">{serviceData.details.serviceTime}</div>
          </div>
        </div>
      </div>
    </div>
  );
}