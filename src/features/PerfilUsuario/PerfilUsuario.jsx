import React from 'react';
import { Star, Edit2 } from 'lucide-react';

export default function PerfilUsuario() {
  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Columna izquierda - Perfil de usuario */}
        <div className="flex flex-col items-center">
          {/* Foto de perfil */}
          <div className="w-64 h-64 rounded-full overflow-hidden mb-6">
            <img 
              src="/api/placeholder/400/400" 
              alt="Foto de perfil" 
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Información del usuario */}
          <h2 className="text-xl text-indigo-600 font-medium mb-6">Usuario</h2>
          
          <div className="w-full max-w-md space-y-4">
            {/* Lista de datos personales */}
            <div className="flex justify-between items-center text-yellow-500">
              <span>Nombre</span>
              <button className="text-yellow-500">
                <Edit2 size={18} />
              </button>
            </div>
            
            <div className="flex justify-between items-center text-yellow-500">
              <span>4430000000</span>
              <button className="text-yellow-500">
                <Edit2 size={18} />
              </button>
            </div>
            
            <div className="flex justify-between items-center text-yellow-500">
              <span>Dirección</span>
              <button className="text-yellow-500">
                <Edit2 size={18} />
              </button>
            </div>
            
            <div className="flex justify-between items-center text-yellow-500">
              <span>Correo electrónico</span>
              <button className="text-yellow-500">
                <Edit2 size={18} />
              </button>
            </div>
            
            <div className="flex justify-between items-center text-yellow-500">
              <span>Contacto de emergencia</span>
              <button className="text-yellow-500">
                <Edit2 size={18} />
              </button>
            </div>
          </div>
        </div>
        
        {/* Columna derecha - Historial y favoritos */}
        <div className="space-y-10">
          {/* Historial de servicios */}
          <div className="bg-blue-100 rounded-lg p-6">
            <h2 className="text-xl text-indigo-600 font-medium mb-6 text-center">Historial de servicios</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Servicio</span>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-600">$00.00</span>
                  <span className="bg-yellow-400 text-white text-sm py-1 px-3 rounded-full">
                    Pendiente
                  </span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Servicio</span>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-600">$00.00</span>
                  <span className="bg-blue-500 text-white text-sm py-1 px-3 rounded-full">
                    Completado
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Servicios favoritos */}
          <div>
            <h2 className="text-xl text-indigo-600 font-medium mb-6">Servicios favoritos</h2>
            
            <div className="grid grid-cols-2 gap-4">
              {/* Servicio de cerrajero */}
              <div className="relative">
                <div className="rounded-lg overflow-hidden">
                  <img 
                    src="/api/placeholder/300/200" 
                    alt="Servicio de cerrajero" 
                    className="w-full h-28 object-cover"
                  />
                  
                  {/* Estrellas de calificación */}
                  <div className="absolute bottom-12 left-2 flex">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  </div>
                  
                  {/* Icono de perfil */}
                  <div className="absolute bottom-12 right-2">
                    <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white">
                      <img 
                        src="/api/placeholder/100/100" 
                        alt="Perfil cerrajero" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="text-center text-yellow-500 mt-2">
                  Servicio de cerrajero
                </div>
              </div>
              
              {/* Servicio de limpieza */}
              <div className="relative">
                <div className="rounded-lg overflow-hidden">
                  <img 
                    src="/api/placeholder/300/200" 
                    alt="Servicio de limpieza" 
                    className="w-full h-28 object-cover"
                  />
                  
                  {/* Icono de perfil */}
                  <div className="absolute bottom-12 right-2">
                    <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white">
                      <img 
                        src="/api/placeholder/100/100" 
                        alt="Perfil limpieza" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="text-center text-yellow-500 mt-2">
                  Servicio de limpieza
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}