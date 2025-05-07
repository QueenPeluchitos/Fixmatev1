import { useState } from 'react';
import { Pencil, Star } from 'lucide-react';

export default function PerfilProf() {
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('4430000000');
  const [direccion, setDireccion] = useState('');

  return (
    <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-md overflow-hidden max-w-6xl mx-auto">
      {/* Panel de perfil izquierdo */}
      <div className="w-full md:w-1/3 p-8 flex flex-col items-center">
        <div className="relative">
          <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
            <img 
              src="/api/placeholder/200/200" 
              alt="Foto de perfil" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        <h2 className="text-2xl font-semibold text-gray-600 mb-2">Profesionista</h2>
        <div className="flex items-center gap-2 mb-6 text-gray-400">
          <span>Tipo de usuario</span>
          <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center">
            <div className="w-4 h-4 bg-blue-300 rounded-md"></div>
          </div>
        </div>
        
        {/* Información de contacto */}
        <div className="w-full space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-medium text-yellow-500">Nombre</span>
            <button className="text-yellow-500">
              <Pencil size={18} />
            </button>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="font-medium text-yellow-500">{telefono}</span>
            <button className="text-yellow-500">
              <Pencil size={18} />
            </button>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="font-medium text-yellow-500">Dirección</span>
            <button className="text-yellow-500">
              <Pencil size={18} />
            </button>
          </div>
        </div>
      </div>
      
      {/* Panel de servicios derecho */}
      <div className="w-full md:w-2/3 bg-blue-100 p-8">
        <h2 className="text-2xl font-semibold text-gray-600 mb-6 text-center">Servicios</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Servicio Cerrajero */}
          <div className="bg-white rounded-lg overflow-hidden shadow">
            <div className="h-40 overflow-hidden">
              <img 
                src="/api/placeholder/300/200" 
                alt="Servicio de cerrajero" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <div className="flex items-center gap-1 mb-2">
                    <Star size={16} fill="gold" color="gold" />
                    <Star size={16} fill="gold" color="gold" />
                    <Star size={16} fill="gold" color="gold" />
                    <Star size={16} fill="gold" color="gold" />
                    <Star size={16} fill="gold" color="gold" />
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-gray-200 overflow-hidden">
                      <img src="/api/placeholder/50/50" alt="Provider" className="w-full h-full object-cover" />
                    </div>
                    <h3 className="font-medium text-yellow-500">Servicio de cerrajero</h3>
                  </div>
                </div>
                <button className="text-yellow-500">
                  <Pencil size={18} />
                </button>
              </div>
            </div>
          </div>
          
          {/* Servicio de Limpieza */}
          <div className="bg-white rounded-lg overflow-hidden shadow">
            <div className="h-40 overflow-hidden">
              <img 
                src="/api/placeholder/300/200" 
                alt="Servicio de limpieza" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <div className="flex items-center gap-1 mb-2">
                    <Star size={16} fill="gold" color="gold" />
                    <Star size={16} fill="gold" color="gold" />
                    <Star size={16} fill="gold" color="gold" />
                    <Star size={16} fill="gold" color="gold" />
                    <Star size={16} fill="gold" color="gold" />
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-gray-200 overflow-hidden">
                      <img src="/api/placeholder/50/50" alt="Provider" className="w-full h-full object-cover" />
                    </div>
                    <h3 className="font-medium text-yellow-500">Servicio de limpieza</h3>
                  </div>
                </div>
                <button className="text-yellow-500">
                  <Pencil size={18} />
                </button>
              </div>
            </div>
          </div>
          
          {/* Servicio de Fontanería/Plomería */}
          <div className="bg-white rounded-lg overflow-hidden shadow">
            <div className="h-40 overflow-hidden">
              <img 
                src="/api/placeholder/300/200" 
                alt="Servicio de plomería" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <div className="flex items-center gap-1 mb-2">
                    <Star size={16} fill="gold" color="gold" />
                    <Star size={16} fill="gold" color="gold" />
                    <Star size={16} fill="gold" color="gold" />
                    <Star size={16} fill="gold" color="gold" />
                    <Star size={16} fill="gold" color="gold" />
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-pink-200 overflow-hidden">
                      <img src="/api/placeholder/50/50" alt="Provider" className="w-full h-full object-cover" />
                    </div>
                    <h3 className="font-medium text-yellow-500">Servicio de limpieza</h3>
                  </div>
                </div>
                <button className="text-yellow-500">
                  <Pencil size={18} />
                </button>
              </div>
            </div>
          </div>
          
          {/* Servicio de Mecánico */}
          <div className="bg-white rounded-lg overflow-hidden shadow">
            <div className="h-40 overflow-hidden">
              <img 
                src="/api/placeholder/300/200" 
                alt="Servicio de mecánico" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <div className="flex items-center gap-1 mb-2">
                    <Star size={16} fill="gold" color="gold" />
                    <Star size={16} fill="gold" color="gold" />
                    <Star size={16} fill="gold" color="gold" />
                    <Star size={16} fill="gold" color="gold" />
                    <Star size={16} fill="gold" color="gold" />
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-gray-200 overflow-hidden">
                      <img src="/api/placeholder/50/50" alt="Provider" className="w-full h-full object-cover" />
                    </div>
                    <h3 className="font-medium text-yellow-500">Servicio de mecánico</h3>
                  </div>
                </div>
                <button className="text-yellow-500">
                  <Pencil size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}