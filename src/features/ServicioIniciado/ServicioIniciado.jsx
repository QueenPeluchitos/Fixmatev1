import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function ServicioUsuario() {
  const [serviceCompleted, setServiceCompleted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const videoRef = useRef(null);
  const navigate = useNavigate();

  const serviceCode = 'SERV-' + Math.floor(100000 + Math.random() * 900000);
  const userName = 'Juan Pérez';
  const serviceHour = new Date().toLocaleTimeString();

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (error) {
      console.error('Error al acceder a la cámara:', error);
    }
  };

  useEffect(() => {
    if (showCamera) {
      startCamera();
    } else {
      const stream = videoRef.current?.srcObject;
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    }
  }, [showCamera]);

  const handleCompleteService = () => {
    setServiceCompleted(true);
    setShowModal(true);
  };

  const handleEmergencyClick = () => {
    const subject = encodeURIComponent('Emergencia durante el servicio');
    const body = encodeURIComponent(
      `Se ha reportado una emergencia.\n\nDatos del servicio:\n- Hora: ${serviceHour}\n- Enlace: ${window.location.origin}/credencial\n\nContacte a ${userName}`
    );
    window.location.href = `mailto:un.peluchito@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="relative max-w-7xl mx-auto p-8">
      {/* Modal de cámara */}
      {showCamera && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex flex-col items-center justify-center p-6 space-y-6">
          <video ref={videoRef} className="w-full max-w-sm rounded-lg border-4 border-white" />
          <button
            onClick={() => {
              setShowCamera(false);
              navigate('/credencial');
            }}
            className="bg-[#E5A800] hover:bg-[#D48B00] text-white px-6 py-3 rounded-md transition-all"
          >
            Confirmar escaneo
          </button>
          <button
            onClick={() => setShowCamera(false)}
            className="text-white underline mt-2"
          >
            Cancelar
          </button>
        </div>
      )}

      {/* Modal de servicio terminado */}
      {showModal && (
        <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md text-center space-y-4">
            <h2 className="text-xl font-semibold text-[#E5A800]">¡Servicio completado!</h2>
            <p className="text-gray-700">Tu código de confirmación es:</p>
            <div className="text-2xl font-mono bg-gray-100 px-4 py-2 rounded-md border border-gray-300">
              {serviceCode}
            </div>
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 bg-[#49568A] hover:bg-[#3F4A75] text-white px-6 py-2 rounded-md transition-all"
            >
              Listo
            </button>
          </div>
        </div>
      )}

      {/* Contenido principal con efecto blur si showModal está activo */}
      <div className={`${showModal ? 'blur-sm pointer-events-none transition-all' : 'transition-all'}`}>
        <div className="flex flex-col md:flex-row gap-10">
          {/* Imagen y botones */}
          <div className="flex-1">
            <div className="mb-8 rounded-lg overflow-hidden">
              <img
                src="https://i.ytimg.com/vi/Zc1IMFJN7d8/sddefault.jpg"
                alt="Service workshop"
                className="w-full h-96 object-cover transition-transform transform hover:scale-105"
              />
            </div>

            <div className="grid grid-cols-2 gap-6 mb-6">
              <button
                onClick={() => setShowCamera(true)}
                className="bg-[#E5A800] hover:bg-[#D48B00] text-white font-medium py-4 px-6 rounded-md text-center transition-all"
              >
                Inicio de servicio
              </button>

              <button
                onClick={handleEmergencyClick}
                className="bg-red-700 hover:bg-red-900 text-white font-medium py-4 px-6 rounded-md flex items-center justify-center gap-2 transition-all"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                </svg>
                EMERGENCIA
              </button>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <Link
                to="/denuncia"
                className="bg-orange-500 hover:bg-orange-700 text-white font-medium py-4 px-6 rounded-md text-center transition-all"
              >
                Denunciar servicio
              </Link>

              <button
                onClick={handleCompleteService}
                className="bg-[#49568A] hover:bg-[#3F4A75] text-white font-medium py-4 px-6 rounded-md text-center transition-all"
              >
                Servicio terminado
              </button>

            </div>
          </div>

          {/* Detalles del servicio */}
          <div className="flex-1">
            <div className="bg-white text-gray-800 rounded-xl p-8 h-full flex flex-col shadow-md transition-all">
              <h2 className="text-[#49568A] text-2xl font-semibold mb-8 text-center">
                Detalles del servicio
              </h2>

              <div className="space-y-8 flex-grow">
                <div className="flex justify-between text-lg">
                  <span className="text-gray-600">Costo</span>
                  <span className="font-medium">$00.00</span>
                </div>

                <div>
                  <span className="text-gray-600">Incluye</span>
                  <ul className="mt-2 space-y-2 text-base text-blue-900">
                    <li>- Fursuit completo</li>
                    <li>- Tela de alta calidad</li>
                    <li>- Patrones a la medida</li>
                  </ul>
                </div>

                <div className="flex justify-between text-lg">
                  <span className="text-gray-600">Horario del servicio</span>
                  <span className="font-medium">{serviceHour}</span>
                </div>
              </div>

              {serviceCompleted && (
                <div className="mt-10">
                  <Link
                    to="/reseña"
                    className="bg-[#E5A800] hover:bg-[#D48B00] text-white font-medium py-4 px-6 rounded-md w-full block text-center transition-all"
                  >
                    Reseña
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
