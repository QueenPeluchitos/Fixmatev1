import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Home,
  PlusCircle,
  BadgeDollarSign,
  LifeBuoy,
  ChevronDown,
  LogOut,
  User,
  ChevronRight,
} from 'lucide-react';
import { UserContext } from "../../../features/auth/context/UserContext.js";

const priceRanges = [
  '$10 - $50',
  '$51 - $200',
  '$201 - $500',
  '$501 - $1000',
  '$1001 - $5000',
  '$5001 - $10000',
  '$10001 - $20000',
];

const menuItems = [
  { label: 'Inicio', icon: <Home size={20} />, path: '/landing' },
  { label: 'Crear Servicio', icon: <PlusCircle size={20} />, highlighted: true, path: '/crear-servicio' },
  { label: 'Rango de precios', icon: <BadgeDollarSign size={20} />, hasSubmenu: true },
  { label: 'Soporte', icon: <LifeBuoy size={20} />, path: '/soporte' },
];

export default function Sidebar() {
  const [isHovered, setIsHovered] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [openSubmenuIndex, setOpenSubmenuIndex] = useState(null);
  const navigate = useNavigate();
  const { user, refreshUser } = useContext(UserContext);

  useEffect(() => {
    const handleRefresh = async () => {
      if (refreshUser) await refreshUser();
    };
    window.addEventListener('refreshUserSidebar', handleRefresh);
    return () => {
      window.removeEventListener('refreshUserSidebar', handleRefresh);
    };
  }, [refreshUser]);

  // Determinar el rol del usuario
  const userRole = user?.tipo_usuario || localStorage.getItem('userRole');

  // Filtrar el menú según el rol
  const filteredMenuItems = menuItems.filter(item => {
    if (item.label === 'Crear Servicio') {
      return userRole === 'prof';
    }
    return true;
  });

  const handleLogout = async () => {
    setShowDropdown(false);
    try {
      await fetch('http://localhost:3000/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
    } catch (err) {
      // Opcional: mostrar error
    }
    navigate('/login');
  };

  const handleGoToProfile = () => {
    setShowDropdown(false);
    if (user?.tipo_usuario === 'prof') {
      navigate('/perfil-profesionista');
    } else {
      navigate('/perfil-usuario');
    }
  };

  const handleNavigation = (path) => {
    if (path) navigate(path);
  };

  // Obtener nombre de usuario solo desde contexto
  const userName = user?.nombre;

  // Lógica para mostrar la foto de perfil con URL absoluta si es relativa
  let fotoPerfil = user?.foto_perfil;
  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";
  if (fotoPerfil && !fotoPerfil.startsWith('http')) {
    fotoPerfil = `${backendUrl}${fotoPerfil}`;
  }
  if (!fotoPerfil) {
    fotoPerfil = "/images/placeholder.png";
  }

  return (
    <div
      className={`sticky top-0 left-0 h-screen bg-yellow-100 min-h-screen overflow-auto p-4 flex flex-col transition-all duration-300 ${
        isHovered ? 'w-64' : 'w-20'
      }`}
      style={{ zIndex: 50 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowDropdown(false);
        setOpenSubmenuIndex(null);
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-2 px-1 mb-6">
        <img src="/images/fixmatelogo.png" alt="FixMate" className="w-10 h-10" />
        {isHovered && <span className="font-bold text-lg text-gray-800">FixMate</span>}
      </div>

      {/* Menu */}
      <div className="flex flex-col gap-3 flex-1">
        {filteredMenuItems.map((item, index) => (
          <div key={index}>
            <div
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200 cursor-pointer ${
                item.highlighted
                  ? 'bg-yellow-400 text-white hover:bg-yellow-500'
                  : 'text-[#49568A] hover:bg-yellow-200'
              }`}
              onClick={() =>
                item.hasSubmenu
                  ? setOpenSubmenuIndex(openSubmenuIndex === index ? null : index)
                  : handleNavigation(item.path)
              }
            >
              {item.icon}
              {isHovered && (
                <>
                  <span className="text-sm">{item.label}</span>
                  {item.hasSubmenu && <ChevronRight size={16} className="ml-auto" />}
                </>
              )}
            </div>

            {/* Submenú de rangos de precio */}
            {item.hasSubmenu && openSubmenuIndex === index && isHovered && (
              <div className="ml-8 mt-1 flex flex-col gap-1">
                {priceRanges.map((range, i) => (
                  <div
                    key={i}
                    className="text-sm text-[#49568A] hover:underline cursor-pointer"
                    onClick={() => alert(`Seleccionaste: ${range}`)}
                  >
                    {range}
                  </div>
                ))}
              </div>
            )}
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
            src={fotoPerfil}
            alt="Usuario"
            className="w-10 h-10 rounded-full border-2 border-yellow-500"
          />
          {isHovered && (
            <>
              <div>
                <p className="text-sm font-semibold text-[#49568A]">
                  {userName || 'Usuario'}
                </p>
              </div>
              <ChevronDown className="ml-auto text-[#49568A]" size={16} />
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
            <div //boton de cerrar sesion
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
