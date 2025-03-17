export default function Header() {
    return (
      <header className="bg-yellow-500 p-4 flex justify-between items-center shadow-md">
      <div className="flex items-center gap-2">
        <img src="../../../assets/fixmatelogo.png" alt="FixMate Logo" className="h-10" />
      </div>
      <nav className="flex gap-72 text-[#726896] font-semibold">
        <a href="#" className="hover:underline hover:text-[#726896]">Inicio</a>
        <a href="#" className="hover:underline hover:text-[#726896]">Servicios</a>
        <a href="#" className="hover:underline hover:text-[#726896]">Soporte</a>
        <a href="#" className="hover:underline hover:text-[#726896]">Crear servicio</a>
      </nav>
      <div>
        <div className="flex items-center gap-2">
          <img src="/fixmatelogo.png" alt="profile pic" className="h-10 rounded-full" />
        </div>
      </div>
      </header>
    );
  }
