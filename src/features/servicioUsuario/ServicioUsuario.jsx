import React from 'react';

export default function UserProfile() {
  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column - User Info */}
        <div className="flex flex-col items-center">
          {/* Profile Image */}
          <div className="w-48 h-48 rounded-full overflow-hidden bg-white mb-4">
            <img 
              src="/api/placeholder/400/400" 
              alt="User profile" 
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* User Info Section */}
          <h2 className="text-purple-700 text-xl font-medium mb-4">Usuario</h2>
          
          <div className="w-full max-w-md space-y-3">
            <div className="flex justify-between items-center text-yellow-500">
              <span className="font-medium">Nombre</span>
              <button className="text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </button>
            </div>
            
            <div className="flex justify-between items-center text-yellow-500">
              <span className="font-medium">4430000000</span>
              <button className="text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </button>
            </div>
            
            <div className="flex justify-between items-center text-yellow-500">
              <span className="font-medium">Dirección</span>
              <button className="text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </button>
            </div>
            
            <div className="flex justify-between items-center text-yellow-500">
              <span className="font-medium">Correo electrónico</span>
              <button className="text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </button>
            </div>
            
            <div className="flex justify-between items-center text-yellow-500">
              <span className="font-medium">Contacto de emergenciar</span>
              <button className="text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        {/* Right Column - Services */}
        <div className="space-y-8">
          {/* Service History */}
          <div className="bg-blue-100 rounded-lg p-6">
            <h2 className="text-purple-700 text-xl font-medium mb-4 text-center">Historial de servicios</h2>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Servicio</span>
                <div className="flex items-center gap-2">
                  <span className="font-medium">$00.00</span>
                  <span className="bg-yellow-300 text-yellow-800 text-xs px-2 py-1 rounded">Pendiente</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Servicio</span>
                <div className="flex items-center gap-2">
                  <span className="font-medium">$00.00</span>
                  <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded">Completada</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Favorite Services */}
          <div>
            <h2 className="text-purple-700 text-xl font-medium mb-4 text-center">Servicios favoritos</h2>
            
            <div className="grid grid-cols-2 gap-4">
              {/* Service Card 1 */}
              <div className="border rounded-lg overflow-hidden bg-white">
                <div className="relative">
                  <img 
                    src="/api/placeholder/300/200" 
                    alt="Locksmith service" 
                    className="w-full h-32 object-cover"
                  />
                  <div className="absolute bottom-1 left-1 flex">
                    <span className="text-yellow-500">★★★</span>
                  </div>
                  <div className="absolute bottom-1 right-1 bg-white rounded-full p-1">
                    <div className="w-6 h-6 rounded-full bg-gray-200"></div>
                  </div>
                </div>
                <div className="p-2 text-center">
                  <p className="text-yellow-500 font-medium">Servicio de cerrajero</p>
                </div>
              </div>
              
              {/* Service Card 2 */}
              <div className="border rounded-lg overflow-hidden bg-white">
                <div className="relative">
                  <img 
                    src="/api/placeholder/300/200" 
                    alt="Cleaning service" 
                    className="w-full h-32 object-cover"
                  />
                  <div className="absolute bottom-1 right-1 bg-white rounded-full p-1">
                    <div className="w-6 h-6 rounded-full bg-gray-200"></div>
                  </div>
                </div>
                <div className="p-2 text-center">
                  <p className="text-yellow-500 font-medium">Servicio de limpieza</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}