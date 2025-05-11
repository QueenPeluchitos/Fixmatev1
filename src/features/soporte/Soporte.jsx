import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SoportePage() {
  const navigate = useNavigate();

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          {/* Left column with support information */}
          <div className="lg:w-2/5 p-6 bg-blue-50 rounded-lg shadow-md mb-6 lg:mb-0">
            <h2 className="text-3xl font-bold text-yellow-600 mb-4">Soporte Técnico</h2>
            <p className="text-lg text-gray-700 mb-6">
              Si tienes alguna pregunta, problema o necesitas asistencia con tu pedido, nuestro equipo de soporte está listo para ayudarte. Todos los casos se gestionan a través de correo electrónico.
            </p>

            <p className="text-xl font-semibold text-gray-900 mb-4">¿Cómo podemos ayudarte?</p>
            <p className="text-lg text-gray-600 mb-6">
              Por favor, envía tu solicitud o pregunta a nuestra dirección de correo electrónico: <a href="mailto:fixmatesoporte@gmail.com" className="text-blue-500 hover:text-blue-700">fixmatesoporte@gmail.com</a>.
            </p>

            <p className="text-lg text-gray-700">
              Nuestro equipo de soporte responderá lo antes posible para ayudarte con cualquier problema o duda que tengas. ¡Gracias por confiar en nuestros servicios!
            </p>
          </div>

          {/* Right column with contact information */}
          <div className="lg:w-3/5 p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-2xl font-bold text-center text-gray-700 mb-4">Información de Contacto</h3>
            <p className="text-lg text-gray-700 mb-6 text-center">
              Si deseas más detalles o hablar directamente con nuestro equipo, no dudes en escribirnos a <span className="font-semibold text-blue-600">fixmatesoporte@gmail.com</span>.
            </p>

            <div className="text-center">
              <button
                onClick={() => navigate('/landing')} // Redirige a la página principal, por ejemplo
                className="bg-yellow-500 hover:bg-yellow-600 text-white py-3 px-6 rounded-lg text-lg"
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
