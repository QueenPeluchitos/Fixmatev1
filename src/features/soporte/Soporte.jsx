import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Phone, Info } from 'lucide-react';

export default function SoportePage() {
  const navigate = useNavigate();

  return (
    <div className="max-w-6xl mx-auto p-6 m-30">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          {/* Left column with support information */}
          <div className="lg:w-2/5 p-8 bg-yellow-100 rounded-lg shadow-sm mb-6 lg:mb-0">
            <h2 className="text-3xl font-semibold text-yellow-600 mb-6 flex items-center">
              <Info className="mr-3 text-yellow-600" size={28} /> Soporte Técnico
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              Si tienes alguna pregunta o problema, nuestro equipo de soporte está listo para ayudarte. Todos los casos se gestionan a través de correo electrónico.
            </p>

            <p className="text-lg text-gray-700 mb-6">
              Envía tu solicitud a nuestra dirección de correo electrónico: 
              <a href="mailto:fixmatesoporte@gmail.com" className="text-blue-600 hover:text-blue-800">fixmatesoporte@gmail.com</a>.
            </p>

            <div className="text-center mt-6">
              <button
                onClick={() => navigate('/faq')} // Link to FAQ page
                className="bg-[#49568A] hover:bg-[#3e4c75] text-white py-2 px-6 rounded-lg text-lg transition-all duration-300"
              >
                Ver Preguntas Frecuentes
              </button>
            </div>
          </div>

          {/* Right column with contact information */}
          <div className="lg:w-3/5 p-8 bg-gray-50 rounded-lg shadow-sm">
            <h3 className="text-2xl font-semibold text-center text-gray-800 mb-6">Información de Contacto</h3>
            <p className="text-lg text-gray-700 mb-6 text-center">
              Si deseas más detalles o hablar directamente con nuestro equipo, contáctanos en <span className="font-semibold text-blue-600">fixmatesoporte@gmail.com</span>.
            </p>

            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-center space-x-3">
                <Mail className="w-5 h-5 text-blue-500" />
                <p className="text-lg text-gray-700">fixmatesoporte@gmail.com</p>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={() => navigate('/landing')} // Redirige a la página principal
                className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-6 rounded-lg text-lg transition-all duration-300"
              >
                Volver al inicio
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
