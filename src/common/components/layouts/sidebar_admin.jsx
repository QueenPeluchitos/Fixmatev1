import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  ClipboardList,
  FileText,
  UserCheck,
  LogOut,
  ChevronDown,
} from 'lucide-react';

const Sidebar = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <aside
      className={`bg-white h-full min-h-screen overflow-auto px-4 py-6 flex flex-col transition-all duration-300 ease-in-out ${
        isHovered ? 'w-64' : 'w-20'
      } sticky top-0 left-0 z-40`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowDropdown(false);
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-2 px-1 mb-10">
        <img src="/images/fixmatelogo.png" alt="FixMate" className="w-10 h-10" />
        {isHovered && <span className="font-bold text-lg text-[#49568A]">FixMate Admin</span>}
      </div>

      <nav className="flex flex-col gap-4 text-gray-700 flex-1">
        <NavLink
          to="/Dashboard"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200 cursor-pointer ${
              isActive ? 'bg-[#f4f6fb] text-[#49568A] font-semibold' : 'hover:bg-[#f4f6fb] text-gray-600'
            }`
          }
        >
          <LayoutDashboard size={20} />
          {isHovered && <span className="text-sm">Dashboard</span>}
        </NavLink>

        <NavLink
          to="/Usuario"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200 cursor-pointer ${
              isActive ? 'bg-[#f4f6fb] text-[#49568A] font-semibold' : 'hover:bg-[#f4f6fb] text-gray-600'
            }`
          }
        >
          <Users size={20} />
          {isHovered && <span className="text-sm">Usuarios</span>}
        </NavLink>

        <NavLink
          to="/Profesionista"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200 cursor-pointer ${
              isActive ? 'bg-[#f4f6fb] text-[#49568A] font-semibold' : 'hover:bg-[#f4f6fb] text-gray-600'
            }`
          }
        >
          <UserCheck size={20} />
          {isHovered && <span className="text-sm">Profesionistas</span>}
        </NavLink>


        <NavLink
          to="/Reportes"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200 cursor-pointer ${
              isActive ? 'bg-[#f4f6fb] text-[#49568A] font-semibold' : 'hover:bg-[#f4f6fb] text-gray-600'
            }`
          }
        >
          <ClipboardList size={20} />
          {isHovered && <span className="text-sm">Reportes</span>}
        </NavLink>
      </nav>

      {/* Perfil */}
      <div className="mt-6 relative px-1">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setShowDropdown((prev) => !prev)}
        >
          <img
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="Admin"
            className="w-10 h-10 rounded-full border-2 border-[#49568A]"
          />
          {isHovered && (
            <>
              <div>
                <p className="text-sm font-semibold text-gray-800">Administrador</p>
              </div>
              <ChevronDown className="ml-auto text-gray-500" size={16} />
            </>
          )}
        </div>

        {isHovered && showDropdown && (
          <div className="absolute bottom-14 left-0 bg-white shadow-lg rounded-md p-2 w-48 z-10 border border-gray-200">
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
    </aside>
  );
};

export default Sidebar;
