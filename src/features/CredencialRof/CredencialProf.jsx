import React from 'react';

export default function ProfessionalCard() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-blue-100 p-8 rounded-lg flex flex-col md:flex-row items-center justify-between">
        {/* Sección de perfil */}
        <div className="flex flex-col items-center text-center mb-6 md:mb-0">
          {/* Foto de perfil */}
          <div className="w-40 h-40 rounded-full overflow-hidden bg-white mb-4">
            <img 
              src="/api/placeholder/400/400" 
              alt="Foto de perfil" 
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Información del usuario */}
          <div className="space-y-1">
            <p className="text-indigo-600 font-medium text-lg">Profesionista</p>
            <p className="text-blue-400 text-sm">Tipo de usuario</p>
            <p className="text-blue-400 text-sm">Nombre del negocio</p>
            
            <div className="mt-2 text-yellow-500">
              <p className="font-medium">Carpintero</p>
              <p>4430000000</p>
              <p>ID: 0000000</p>
            </div>
          </div>
        </div>
        
        {/* Código QR */}
        <div className="w-40 h-40 bg-white p-1">
          <svg 
            width="100%" 
            height="100%" 
            viewBox="0 0 100 100" 
            className="w-full h-full" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Código QR simplificado */}
            <rect x="0" y="0" width="100" height="100" fill="white" />
            <rect x="10" y="10" width="15" height="15" fill="black" />
            <rect x="10" y="30" width="5" height="5" fill="black" />
            <rect x="20" y="30" width="5" height="5" fill="black" />
            <rect x="10" y="40" width="5" height="5" fill="black" />
            <rect x="20" y="40" width="5" height="5" fill="black" />
            <rect x="10" y="50" width="15" height="5" fill="black" />
            <rect x="30" y="10" width="5" height="15" fill="black" />
            <rect x="40" y="10" width="5" height="5" fill="black" />
            <rect x="40" y="20" width="5" height="5" fill="black" />
            <rect x="30" y="30" width="15" height="5" fill="black" />
            <rect x="30" y="40" width="5" height="5" fill="black" />
            <rect x="40" y="40" width="5" height="5" fill="black" />
            <rect x="30" y="50" width="15" height="5" fill="black" />
            <rect x="10" y="60" width="35" height="5" fill="black" />
            <rect x="10" y="70" width="5" height="20" fill="black" />
            <rect x="20" y="70" width="5" height="5" fill="black" />
            <rect x="30" y="70" width="5" height="5" fill="black" />
            <rect x="40" y="70" width="5" height="5" fill="black" />
            <rect x="20" y="80" width="25" height="5" fill="black" />
            <rect x="20" y="90" width="5" height="5" fill="black" />
            <rect x="30" y="90" width="5" height="5" fill="black" />
            <rect x="40" y="90" width="5" height="5" fill="black" />
            
            <rect x="50" y="10" width="15" height="5" fill="black" />
            <rect x="70" y="10" width="20" height="5" fill="black" />
            <rect x="50" y="20" width="5" height="5" fill="black" />
            <rect x="60" y="20" width="5" height="5" fill="black" />
            <rect x="70" y="20" width="5" height="5" fill="black" />
            <rect x="80" y="20" width="5" height="5" fill="black" />
            <rect x="90" y="20" width="5" height="5" fill="black" />
            <rect x="50" y="30" width="5" height="5" fill="black" />
            <rect x="60" y="30" width="15" height="5" fill="black" />
            <rect x="80" y="30" width="15" height="5" fill="black" />
            <rect x="50" y="40" width="10" height="5" fill="black" />
            <rect x="70" y="40" width="15" height="5" fill="black" />
            <rect x="90" y="40" width="5" height="5" fill="black" />
            <rect x="50" y="50" width="5" height="5" fill="black" />
            <rect x="60" y="50" width="5" height="5" fill="black" />
            <rect x="70" y="50" width="5" height="5" fill="black" />
            <rect x="80" y="50" width="5" height="5" fill="black" />
            <rect x="90" y="50" width="5" height="5" fill="black" />
            
            <rect x="60" y="60" width="5" height="5" fill="black" />
            <rect x="70" y="60" width="5" height="5" fill="black" />
            <rect x="80" y="60" width="15" height="5" fill="black" />
            <rect x="50" y="70" width="20" height="5" fill="black" />
            <rect x="80" y="70" width="5" height="5" fill="black" />
            <rect x="90" y="70" width="5" height="5" fill="black" />
            <rect x="50" y="80" width="5" height="5" fill="black" />
            <rect x="60" y="80" width="10" height="5" fill="black" />
            <rect x="80" y="80" width="15" height="5" fill="black" />
            <rect x="50" y="90" width="5" height="5" fill="black" />
            <rect x="60" y="90" width="5" height="5" fill="black" />
            <rect x="70" y="90" width="5" height="5" fill="black" />
            <rect x="80" y="90" width="5" height="5" fill="black" />
            <rect x="90" y="90" width="5" height="5" fill="black" />
            
            {/* Cuadrados de posicionamiento */}
            <rect x="10" y="10" width="15" height="15" fill="black" />
            <rect x="13" y="13" width="9" height="9" fill="white" />
            <rect x="16" y="16" width="3" height="3" fill="black" />
            
            <rect x="75" y="10" width="15" height="15" fill="black" />
            <rect x="78" y="13" width="9" height="9" fill="white" />
            <rect x="81" y="16" width="3" height="3" fill="black" />
            
            <rect x="10" y="75" width="15" height="15" fill="black" />
            <rect x="13" y="78" width="9" height="9" fill="white" />
            <rect x="16" y="81" width="3" height="3" fill="black" />
          </svg>
        </div>
      </div>
    </div>
  );
}