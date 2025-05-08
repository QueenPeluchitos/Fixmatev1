import { useState, useRef } from 'react';
import { Camera, Upload } from 'lucide-react';

export default function RegistroProf() {
  const [photo, setPhoto] = useState(null);
  const [documents, setDocuments] = useState({});
  
  const photoInputRef = useRef(null);
  const fileInputRefs = {
    logo: useRef(null),
    titulo: useRef(null),
    ine: useRef(null),
    curp: useRef(null),
    domicilio: useRef(null),
    biometrico: useRef(null),
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const localUrl = URL.createObjectURL(file);
      setPhoto(localUrl);
    }
  };

  const handleDocumentChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      setDocuments((prev) => ({ ...prev, [field]: file.name }));
    }
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
            className="w-64 h-64 bg-gray-200 rounded relative flex items-center justify-center cursor-pointer overflow-hidden"
            onClick={() => photoInputRef.current.click()}
          >
            {photo ? (
              <img src={photo} alt="Foto seleccionada" className="w-full h-full object-cover" />
            ) : (
              <Camera size={48} className="text-gray-400" />
            )}
          </div>
          <input
            type="file"
            id="photo-upload"
            className="hidden"
            accept="image/*"
            ref={photoInputRef}
            onChange={handlePhotoChange}
          />
          <p className="mt-4 text-gray-500">Ingresa una foto</p>
        </div>
        
        {/* Sección de documentos */}
        <div className="flex flex-col space-y-6">
          {[
            { label: 'Logo de comercio', name: 'logo' },
            { label: 'Título profesional', name: 'titulo' },
            { label: 'INE', name: 'ine' },
            { label: 'CURP', name: 'curp' },
            { label: 'Comprobante de domicilio', name: 'domicilio' },
            { label: 'Identificación biometrica', name: 'biometrico', biometric: true },
          ].map(({ label, name, biometric }) => (
            <div key={name} className="flex justify-between items-center">
              <div>
                <span className="text-gray-600">{label}</span>
                {biometric && <p className="text-sm text-gray-400">(Se encenderá la cámara)</p>}
                {documents[name] && (
                  <p className="text-xs text-green-500 mt-1">📎 {documents[name]}</p>
                )}
              </div>
              <button
                className={`border rounded p-2 ${biometric ? 'bg-gray-100' : 'text-gray-400'}`}
                onClick={() => fileInputRefs[name].current.click()}
              >
                {biometric ? <Camera size={20} /> : <Upload size={20} />}
              </button>
              <input
                type="file"
                accept={biometric ? 'image/*' : '*'}
                ref={fileInputRefs[name]}
                className="hidden"
                onChange={(e) => handleDocumentChange(e, name)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
