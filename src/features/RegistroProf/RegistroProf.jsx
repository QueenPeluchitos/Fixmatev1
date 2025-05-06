import { useState } from 'react';
import { Camera, Upload } from 'lucide-react';

export default function JobApplicationForm() {
  const [photo, setPhoto] = useState(null);
  
  const handlePhotoChange = (e) => {
    // En un entorno real, aquí manejaríamos la carga de archivos
    setPhoto("photo_selected");
  };
  
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-semibold text-gray-500 mb-2">¿DESEAS TRABAJAR</h1>
        <h1 className="text-3xl font-semibold text-gray-500 mb-4">CON NOSOTROS?</h1>
        <p className="text-sm text-gray-400">SOLO PROPORCIONA ALGUNOS DATOS</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Sección de foto */}
        <div className="flex flex-col items-center">
          <div 
            className="w-64 h-64 bg-gray-200 rounded relative flex items-center justify-center cursor-pointer"
            onClick={() => document.getElementById('photo-upload').click()}
          >
            {!photo && (
              <div className="absolute bottom-2 right-2 text-gray-500">
                <Camera size={24} />
              </div>
            )}
          </div>
          <input 
            type="file" 
            id="photo-upload" 
            className="hidden" 
            accept="image/*"
            onChange={handlePhotoChange}
          />
          <p className="mt-4 text-gray-500">Ingresa una foto</p>
        </div>
        
        {/* Sección de documentos */}
        <div className="flex flex-col space-y-6">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Logo de comercio</span>
            <button className="border rounded p-2 text-gray-400">
              <Upload size={20} />
            </button>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Título profesional</span>
            <button className="border rounded p-2 text-gray-400">
              <Upload size={20} />
            </button>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-600">INE</span>
            <button className="border rounded p-2 bg-blue-50 text-blue-400">
              <Upload size={20} />
            </button>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-600">CURP</span>
            <button className="border rounded p-2 text-gray-400">
              <Upload size={20} />
            </button>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Comprobante<br />de domicilio</span>
            <button className="border rounded p-2 text-gray-400">
              <Upload size={20} />
            </button>
          </div>
          
          <div className="flex justify-between items-center">
            <div>
              <span className="text-gray-600">Identificación<br />biometrica</span>
              <p className="text-sm text-gray-400">(Se encenderá la cámara)</p>
            </div>
            <button className="border rounded p-2 bg-gray-100">
              <Camera size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}