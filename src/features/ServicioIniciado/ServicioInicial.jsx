import { useState } from 'react';

export default function ServiceDetails() {
  const [serviceStarted, setServiceStarted] = useState(false);

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4 max-w-5xl mx-auto">
      {/* Left side - Image and buttons */}
      <div className="flex flex-col gap-4">
        <div className="rounded-lg overflow-hidden">
          <img 
            src="/api/placeholder/400/320" 
            alt="Workshop interior with colorful fabric shelves" 
            className="w-full h-64 object-cover"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          <button 
            className="bg-teal-200 text-teal-800 py-2 px-4 rounded-md hover:bg-teal-300 transition-colors"
            onClick={() => setServiceStarted(true)}
          >
            Inicio de servicio
          </button>
          
          <button className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors flex items-center justify-center">
            <span className="mr-1">🚨</span> EMERGENCIA
          </button>
          
          <button className="bg-orange-300 text-orange-800 py-2 px-4 rounded-md hover:bg-orange-400 transition-colors">
            Denunciar servicio
          </button>
          
          <button className="bg-yellow-400 text-yellow-800 py-2 px-4 rounded-md hover:bg-yellow-500 transition-colors">
            Servicio terminado
          </button>
        </div>
      </div>

      {/* Right side - Service details */}
      <div className="bg-blue-100 p-6 rounded-lg w-full md:max-w-md">
        <h2 className="text-center text-gray-700 font-medium mb-4">Detalles del servicio</h2>
        
        <div className="flex justify-between mb-2">
          <span className="text-gray-600">Costo</span>
          <span className="text-gray-800 font-medium">$80.00</span>
        </div>
        
        <div className="mb-4">
          <span className="text-gray-600 block">Incluye</span>
          <ul className="pl-4 text-gray-800">
            <li>-Fursuit completo</li>
            <li>-Tela de alta calida</li>
            <li>-Patrones a la medida</li>
          </ul>
        </div>
        
        <div className="flex justify-between mb-6">
          <span className="text-gray-600">Horario del servicio</span>
          <span className="text-gray-800 font-medium">00:00PM</span>
        </div>
        
        <button className="bg-yellow-500 text-white w-full py-2 rounded-md hover:bg-yellow-600 transition-colors">
          Reseña
        </button>
      </div>
    </div>
  );
}