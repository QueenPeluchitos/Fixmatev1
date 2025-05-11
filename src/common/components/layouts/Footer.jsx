import { Twitter, Instagram, Send, Facebook } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-sky-900 text-white w-full relative mt-auto py-6">
      <div className="container mx-auto px-6 max-w-6xl flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold">FixMate</h2>
          <p className="text-xs text-gray-300 mt-1">
            © FixMate 2024. Todos los derechos reservados
          </p>
        </div>

        {/* Menú de enlaces en dispositivos grandes */}
        <div className="hidden md:flex space-x-8">
          <a href="/landing" className="hover:text-gray-300 uppercase text-sm font-medium">
            Servicios
          </a>
          <a href="/faq" className="hover:text-gray-300 uppercase text-sm font-medium">
            Preguntas frecuentes
          </a>
          <a href="/soporte" className="hover:text-gray-300 uppercase text-sm font-medium">
            Soporte
          </a>
        </div>

        {/* Iconos sociales */}
        <div className="flex space-x-3 justify-center mt-4 md:mt-0">
          <a href="#" className="bg-gray-900 p-2 rounded-full hover:bg-gray-700 transition-colors">
            <Twitter size={18} />
          </a>
          <a href="#" className="bg-gray-900 p-2 rounded-full hover:bg-gray-700 transition-colors">
            <Instagram size={18} />
          </a>
          <a href="#" className="bg-gray-900 p-2 rounded-full hover:bg-gray-700 transition-colors">
            <Send size={18} />
          </a>
          <a href="#" className="bg-gray-900 p-2 rounded-full hover:bg-gray-700 transition-colors">
            <Facebook size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
