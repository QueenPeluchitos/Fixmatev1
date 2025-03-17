import { useState } from "react";

// Componente del perfil desplegable
function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);

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
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg">
          <ul className="py-2 text-gray-700">
            <li className="px-4 py-2 hover:bg-amber-100 cursor-pointer">Perfil</li>
            <li className="px-4 py-2 hover:bg-amber-100 cursor-pointer">Configuración</li>
            <li className="px-4 py-2 hover:bg-amber-100 cursor-pointer">Cerrar sesión</li>
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
      <nav className="flex gap-72 text-[#726896] font-semibold">
        <a href="#" className="text-xl hover:underline hover:text-[#726896]">Inicio</a>
        <a href="#" className="text-xl hover:underline hover:text-[#726896]">Servicios</a>
        <a href="#" className="text-xl hover:underline hover:text-[#726896]">Soporte</a>
        <a href="#" className="text-xl hover:underline hover:text-[#726896]">Crear servicio</a>
      </nav>
      <div>
        {/* Aquí es donde llamas al componente ProfileDropdown */}
        <ProfileDropdown />
      </div>
    </header>
  );
}
