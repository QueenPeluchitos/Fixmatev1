import { Twitter, Instagram, Send, Facebook } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-sky-900 text-white w-full fixed bottom-0">
      <div className="container mx-auto px-6 py-4 max-w-1xl flex justify-between items-center bot">
        <div>
          <h2 className="text-2xl font-bold">FixMate</h2>
          <p className="text-xs text-gray-300 mt-1">© FixMate 2024. Derechos reservados</p>
        </div>

        <div className="hidden md:flex space-x-8">
          <a href="#features" className="hover:text-gray-300 uppercase text-sm font-medium">Features</a>
          <a href="#services" className="hover:text-gray-300 uppercase text-sm font-medium">Servicios</a>
          <a href="#pricing" className="hover:text-gray-300 uppercase text-sm font-medium">Precios</a>
          <a href="#howto" className="hover:text-gray-300 uppercase text-sm font-medium">Preguntas frecuentes</a>
        </div>

        <div className="flex space-x-3">
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