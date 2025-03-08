export default function Footer() {
    return (
      <footer className="bg-[#3B4371] text-yellow-400 p-6 flex justify-between items-start shadow-md">
        <div className="flex flex-col items-center">
          <img src="/logo.png" alt="FixMate Logo" className="h-16" />
        </div>
        <div className="flex flex-col">
          <h3 className="font-bold">Fixmate</h3>
          <a href="#" className="text-sm hover:underline">Servicios</a>
          <a href="#" className="text-sm hover:underline">Populares</a>
          <a href="#" className="text-sm hover:underline">Iniciar sesión</a>
        </div>
        <div className="flex flex-col">
          <h3 className="font-bold">Servicios</h3>
          <a href="#" className="text-sm hover:underline">Ver servicios</a>
          <a href="#" className="text-sm hover:underline">Crear servicio</a>
          <a href="#" className="text-sm hover:underline">Reportes</a>
        </div>
        <div className="flex flex-col">
          <h3 className="font-bold">Soporte</h3>
          <a href="#" className="text-sm hover:underline">FAQ</a>
          <a href="#" className="text-sm hover:underline">Texto</a>
          <a href="#" className="text-sm hover:underline">Texto</a>
        </div>
        <div className="flex flex-col">
          <h3 className="font-bold">Contáctanos</h3>
          <p className="text-sm">Tel. +52 000 000 0000</p>
          <p className="text-sm">Correo Tlacuacode@gmail.com</p>
        </div>
        <div className="flex flex-col items-center">
          <h3 className="font-bold">Términos y condiciones</h3>
          <img src="/user.png" alt="User image" className="h-10 w-10 rounded-full mt-2" />
          <p className="text-sm">Tlacuacode</p>
        </div>
      </footer>
    );
  }
  