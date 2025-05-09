import React from 'react';

export default function CredencialProf() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-indigo-50 to-blue-50 px-6 py-10">
      <div className="w-full max-w-[1200px] h-[500px] bg-white rounded-3xl shadow-2xl border border-gray-300 flex overflow-hidden">
        
        {/* Foto de perfil */}
        <div className="w-1/3 bg-gradient-to-b from-indigo-200 to-indigo-100 flex flex-col items-center justify-center p-8 shadow-xl rounded-l-3xl">
          <div className="w-48 h-48 rounded-full overflow-hidden border-6 border-white shadow-2xl mb-6">
            <img
              src="/api/placeholder/400/400"
              alt="Foto del profesionista"
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-sm mt-4 text-indigo-700 font-semibold">ID: 0000000</p>
        </div>

        {/* Datos + QR */}
        <div className="w-2/3 flex flex-col justify-center px-12 py-8 space-y-6">
          <div>
            <h1 className="text-4xl font-extrabold text-indigo-800 tracking-tight">Nombre del Negocio</h1>
            <p className="text-lg text-gray-600">Tipo de usuario: <span className="text-indigo-600 font-medium">Profesionista</span></p>
            <p className="text-lg text-gray-600">Especialidad: <span className="font-semibold text-gray-700">Carpintero</span></p>
            <p className="text-lg text-gray-600">Teléfono: <span className="text-indigo-600">4430000000</span></p>
          </div>

          {/* QR */}
          <div className="w-44 h-44 bg-white p-4 rounded-lg border border-gray-300 shadow-lg mt-6 flex items-center justify-center">
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Fondo blanco del QR */}
              <rect width="100" height="100" fill="white" />
              
              {/* Módulos más realistas */}
              <g fill="black">
                {/* Primer cuadro con bordes */}
                <rect x="5" y="5" width="15" height="15" />
                <rect x="75" y="5" width="15" height="15" />
                <rect x="5" y="75" width="15" height="15" />

                {/* Módulos internos */}
                <rect x="20" y="5" width="5" height="5" />
                <rect x="30" y="5" width="5" height="5" />
                <rect x="40" y="5" width="5" height="5" />
                <rect x="20" y="15" width="5" height="5" />
                <rect x="30" y="15" width="5" height="5" />
                <rect x="40" y="15" width="5" height="5" />

                <rect x="70" y="5" width="5" height="5" />
                <rect x="80" y="5" width="5" height="5" />
                <rect x="70" y="15" width="5" height="5" />
                <rect x="80" y="15" width="5" height="5" />

                {/* Agregar más módulos para el patrón */}
                <rect x="20" y="70" width="5" height="5" />
                <rect x="30" y="70" width="5" height="5" />
                <rect x="40" y="70" width="5" height="5" />
                <rect x="20" y="80" width="5" height="5" />
                <rect x="30" y="80" width="5" height="5" />
                <rect x="40" y="80" width="5" height="5" />

                {/* Cuadrado interno blanco */}
                <rect x="10" y="10" width="5" height="5" fill="white" />
                <rect x="15" y="10" width="5" height="5" fill="white" />
                <rect x="10" y="15" width="5" height="5" fill="white" />
                <rect x="15" y="15" width="5" height="5" fill="white" />
              </g>

              {/* Líneas de borde para hacerlo más realista */}
              <rect x="0" y="0" width="100" height="100" fill="transparent" stroke="black" strokeWidth="3" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
