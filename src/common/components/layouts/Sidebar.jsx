// Sidebar.jsx
import { useState } from 'react';
import {
  Home,
  PlusCircle,
  Heart,
  BadgeDollarSign,
  LifeBuoy,
  Wrench,
  ChevronDown
} from 'lucide-react';

const menuItems = [
  { label: 'Inicio', icon: <Home size={20} /> },
  { label: 'Crear Servicio', icon: <PlusCircle size={20} />, highlighted: true },
  { label: 'Nuestros Servicios', icon: <Heart size={20} /> },
  { label: 'Rango de precios', icon: <BadgeDollarSign size={20} /> },
  { label: 'Soporte', icon: <LifeBuoy size={20} /> },
  { label: 'Ayuda', icon: <Wrench size={20} /> },
];

export default function Sidebar() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`bg-yellow-100 min-h-screen overflow-auto p-4 flex flex-col justify-between transition-all duration-300 fixed top-0 left-0${
        isHovered ? 'w-64' : 'w-20'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Logo */}
      <div className="flex items-center gap-2 px-1 mb-6">
        <img src="../assets/fm1.png " alt="FixMate" className="w-8 h-8" />
        {isHovered && <span className="font-bold text-lg text-gray-800">FixMate</span>}
      </div>

      {/* Menu */}
      <div className="flex flex-col gap-3">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200 cursor-pointer
              ${
                item.highlighted
                  ? 'bg-yellow-400 text-white hover:bg-yellow-500'
                  : 'text-yellow-600 hover:bg-yellow-200'
              }`}
          >
            {item.icon}
            {isHovered && <span className="text-sm">{item.label}</span>}
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="mt-auto mb-4 px-2">
        {isHovered && (
          <div className="bg-gradient-to-br from-blue-200 to-blue-600 text-center rounded-xl p-4">
            <p className="text-yellow-100 text-sm mb-2">¿Quieres ser parte de nuestra empresa?</p>
            <button className="bg-yellow-400 text-blue-900 font-bold py-1 px-3 rounded-full hover:bg-yellow-500 text-sm">
              Regístrate ahora
            </button>
          </div>
        )}
      </div>

      {/* Perfil */}
      <div className="flex items-center gap-2 px-1">
        <img
          src="/avatar.jpg"
          alt="Usuario"
          className="w-10 h-10 rounded-full border-2 border-yellow-500"
        />
        {isHovered && (
          <div>
            <p className="text-sm font-semibold text-gray-800">Usuario</p>
            <p className="text-xs text-gray-500">Project Manager</p>
          </div>
        )}
        {isHovered && <ChevronDown className="ml-auto text-gray-500" size={16} />}
      </div>
    </div>
  );
}
