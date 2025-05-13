import { useRef, useState } from 'react';
import { Camera, Upload } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function RegistroProf() {
  const [photo, setPhoto] = useState(null);
  const [documents, setDocuments] = useState({});
  const [cameraActive, setCameraActive] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) setPhoto(URL.createObjectURL(file));
  };

  const handleFileUpload = (e, key) => {
    const file = e.target.files[0];
    if (file) {
      setDocuments((prev) => ({
        ...prev,
        [key]: file.name,
      }));
    }
  };

  const handleCameraClick = async () => {
    setCapturedImage(null);
    setCameraActive(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (err) {
      console.error('Error al acceder a la cámara:', err);
    }
  };

  const handleCapture = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageUrl = canvas.toDataURL('image/png');
    setCapturedImage(imageUrl);
    setCameraActive(false);

    // Detiene la cámara
    if (video.srcObject) {
      video.srcObject.getTracks().forEach((track) => track.stop());
      video.srcObject = null;
    }
  };

  const handleSubmit = () => {
    // Simula un envío de documentos
    alert('Documentos enviados correctamente.');
    // Redirige a /landing después de la alerta
    navigate('/landing');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg my-10 transition-transform transform hover:scale-105">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-semibold text-[#49568A] mb-2 transition-all duration-300 hover:text-[#E5A800]">¿DESEAS TRABAJAR</h1>
        <h1 className="text-3xl font-semibold text-[#49568A] mb-4 transition-all duration-300 hover:text-[#E5A800]">CON NOSOTROS?</h1>
        <p className="text-sm text-gray-400">SOLO PROPORCIONA ALGUNOS DATOS</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Foto */}
        <div className="flex flex-col items-center transition-all duration-300 transform hover:scale-105">
          <div
            className="w-64 h-64 bg-gray-200 rounded-full relative flex items-center justify-center cursor-pointer overflow-hidden shadow-lg hover:shadow-2xl transition-all"
            onClick={() => document.getElementById('photo-upload').click()}
          >
            {photo ? (
              <img src={photo} alt="Foto seleccionada" className="w-full h-full object-cover" />
            ) : (
              <Camera size={32} className="text-[#49568A]" />
            )}
          </div>
          <input
            type="file"
            id="photo-upload"
            className="hidden"
            accept="image/*"
            onChange={handlePhotoChange}
          />
          <p className="mt-4 text-[#49568A]">Ingresa una foto</p>
        </div>

        {/* Documentos */}
        <div className="flex flex-col space-y-6">
          {[ 'logoComercio', 'tituloProfesional', 'ine', 'curp', 'comprobanteDomicilio' ].map((key, i) => (
            <div key={i} className="flex flex-col space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-[#49568A] capitalize text-sm">{key.replace(/([A-Z])/g, ' $1').replace(/^\w/, c => c.toUpperCase())}</span>
                <button
                  className="border border-[#49568A] rounded p-2 text-[#49568A] hover:bg-[#E5A800] hover:text-white transition-colors duration-300"
                  onClick={() => document.getElementById(`file-${key}`).click()}
                >
                  <Upload size={20} />
                </button>
                <input
                  type="file"
                  id={`file-${key}`}
                  className="hidden"
                  onChange={(e) => handleFileUpload(e, key)}
                />
              </div>
              {documents[key] && (
                <p className="text-sm text-[#28A745] pl-8 mt-1">{`Archivo cargado: ${documents[key]}`}</p>
              )}
            </div>
          ))}

          {/* Identificación biométrica */}
          <div className="flex justify-between items-center">
            <div>
              <span className="text-[#49568A] text-sm">Identificación biométrica</span>
              <p className="text-xs text-gray-400">(Se encenderá la cámara)</p>
            </div>
            <button className="border border-[#49568A] rounded p-2 bg-[#E5A800] text-white hover:bg-[#D48D00] transition-all duration-300" onClick={handleCameraClick}>
              <Camera size={20} />
            </button>
          </div>

          {/* Cámara activa */}
          {cameraActive && (
            <div className="mt-4 space-y-2">
              <video ref={videoRef} width="320" height="240" autoPlay className="rounded-lg shadow-lg" />
              <canvas ref={canvasRef} width="320" height="240" className="hidden" />
              <button
                onClick={handleCapture}
                className="px-4 py-2 bg-[#E5A800] text-white rounded hover:bg-[#D48D00] transition-all duration-300"
              >
                Capturar
              </button>
            </div>
          )}

          {/* Imagen capturada */}
          {capturedImage && (
            <div className="mt-4">
              <img src={capturedImage} alt="Captura biométrica" className="w-64 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105" />
            </div>
          )}
        </div>
      </div>

      {/* Botón enviar */}
      <div className="mt-10 text-center">
        <button
          onClick={handleSubmit}
          className="bg-[#E5A800] hover:bg-[#D48D00] text-white px-6 py-3 rounded-lg text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
        >
          Enviar
        </button>
      </div>
    </div>
  );
}
