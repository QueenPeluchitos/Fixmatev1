import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Home,
  PlusCircle,
  Heart,
  BadgeDollarSign,
  LifeBuoy,
  Wrench,
  ChevronDown,
  LogOut,
  User,
} from 'lucide-react';

const menuItems = [
  { label: 'Inicio', icon: <Home size={20} />, path: '/landing' },
  { label: 'Crear Servicio', icon: <PlusCircle size={20} />, highlighted: true },
  { label: 'Nuestros Servicios', icon: <Heart size={20} /> },
  { label: 'Rango de precios', icon: <BadgeDollarSign size={20} /> },
  { label: 'Soporte', icon: <LifeBuoy size={20} /> },
  { label: 'Ayuda', icon: <Wrench size={20} /> },
];

export default function Sidebar() {
  const [isHovered, setIsHovered] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setShowDropdown(false);
    navigate('/login');
  };

  const handleGoToProfile = () => {
    setShowDropdown(false);
    navigate('/perfil-usuario');
  };

  const handleNavigation = (path) => {
    if (path) navigate(path);
  };

  return (
    <div
      className={`bg-yellow-100 min-h-screen overflow-auto p-4 flex flex-col transition-all duration-300 ${
        isHovered ? 'w-64' : 'w-20'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowDropdown(false);
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-2 px-1 mb-6">
        <img src="/images/fixmatelogo.png" alt="FixMate" className="w-10 h-10" />
        {isHovered && <span className="font-bold text-lg text-gray-800">FixMate</span>}
      </div>

      {/* Menu */}
      <div className="flex flex-col gap-3 flex-1">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200 cursor-pointer ${
              item.highlighted
                ? 'bg-yellow-400 text-white hover:bg-yellow-500'
                : 'text-yellow-600 hover:bg-yellow-200'
            }`}
            onClick={() => handleNavigation(item.path)}
          >
            {item.icon}
            {isHovered && <span className="text-sm">{item.label}</span>}
          </div>
        ))}
      </div>

      {/* Perfil */}
      <div className="relative px-1 mt-4">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setShowDropdown((prev) => !prev)}
        >
          <img
            src="/avatar.jpg"
            alt="Usuario"
            className="w-10 h-10 rounded-full border-2 border-yellow-500"
          />
          {isHovered && (
            <>
              <div>
                <p className="text-sm font-semibold text-gray-800">Usuario</p>
                <p className="text-xs text-gray-500">Project Manager</p>
              </div>
              <ChevronDown className="ml-auto text-gray-500" size={16} />
            </>
          )}
        </div>

        {/* Dropdown */}
        {isHovered && showDropdown && (
          <div className="absolute bottom-14 left-0 bg-white shadow-lg rounded-md p-2 w-48 z-10 border border-gray-200">
            <div
              className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded cursor-pointer"
              onClick={handleGoToProfile}
            >
              <User size={16} />
              <span className="text-sm">Perfil</span>
            </div>
            <div
              className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded cursor-pointer"
              onClick={handleLogout}
            >
              <LogOut size={16} />
              <span className="text-sm">Cerrar sesión</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
