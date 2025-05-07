import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Link } from "react-router-dom"; // Para navegación interna

// Componente del perfil desplegable
function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove('authToken');
    navigate('/login');
  };

  return (
    <div className="relative">
      {/* Imagen que activa el desplegable */}
      <img
        src="/images/xd.jpg"
        alt="profile pic"
        className="h-14 w-14 rounded-full cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      />

      {/* Contenido del menú desplegable */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-10">
          <ul className="py-2 text-gray-700">
            <li className="px-4 py-2 hover:bg-amber-100 cursor-pointer">Perfil</li>
            <li className="px-4 py-2 hover:bg-amber-100 cursor-pointer">Configuración</li>
            <li onClick={handleLogout} className="px-4 py-2 hover:bg-amber-100 cursor-pointer">Cerrar sesión </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default function Header() {
  return (
    <header className="bg-yellow-500 p-7 flex justify-between items-center shadow-md">
      <div className="flex items-center gap-2">
        <img src="/images/fm1.png" alt="FixMate Logo" className="h-14" />
      </div>
      <nav className="flex gap-12 text-[#726896] font-semibold">
        <Link to="/" className="text-xl hover:underline hover:text-[#726896]">Inicio</Link>
        <Link to="/services" className="text-xl hover:underline hover:text-[#726896]">Servicios</Link>
        <Link to="/support" className="text-xl hover:underline hover:text-[#726896]">Soporte</Link>
        <Link to="/create-service" className="text-xl hover:underline hover:text-[#726896]">Crear servicio</Link>
      </nav>
      <div>
        {/* Aquí es donde llamas al componente ProfileDropdown */}
        <ProfileDropdown />
      </div>
    </header>
  );
}