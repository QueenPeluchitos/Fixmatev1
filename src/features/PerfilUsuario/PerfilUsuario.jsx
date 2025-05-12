import React, { useState, useRef } from 'react';
import { Star, Edit2 } from 'lucide-react';

export default function PerfilUsuario() {
  const [profileImage, setProfileImage] = useState('/api/placeholder/400/400');
  const fileInputRef = useRef(null);

  const [userData, setUserData] = useState({
    nombre: 'Nombre',
    telefono: '4430000000',
    direccion: 'Dirección',
    email: 'Correo electrónico',
    emergencia: 'Contacto de emergencia',
  });

  const [editField, setEditField] = useState(null);

  const handleChange = (field, value) => {
    setUserData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const localUrl = URL.createObjectURL(file);
      setProfileImage(localUrl);
    }
  };

  const handleSave = async () => {
    const formData = new FormData();
    Object.entries(userData).forEach(([key, value]) => {
      formData.append(key, value);
    });

    if (fileInputRef.current.files[0]) {
      formData.append('profileImage', fileInputRef.current.files[0]);
    }

    try {
      const response = await fetch('/api/usuarios/123', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Error al guardar');
      alert('Datos guardados correctamente');
    } catch (err) {
      alert('Error al guardar: ' + err.message);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* Columna izquierda - Información del usuario */}
        <div className="bg-white shadow-xl rounded-2xl p-8 text-center">
          <div className="relative w-48 h-48 mx-auto mb-6 cursor-pointer rounded-full overflow-hidden shadow-lg" onClick={handleImageClick}>
            <img src={profileImage} alt="Perfil" className="w-full h-full object-cover" />
            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageChange} />
          </div>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Mi Perfil</h2>

          <div className="space-y-4 text-left">
            {Object.entries(userData).map(([field, value]) => (
              <div key={field} className="flex justify-between items-center bg-yellow-50 px-4 py-2 rounded-lg hover:bg-yellow-100">
                {editField === field ? (
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => handleChange(field, e.target.value)}
                    onBlur={() => setEditField(null)}
                    autoFocus
                    className="w-full text-gray-700 border-none focus:outline-none bg-transparent"
                  />
                ) : (
                  <>
                    <span className="text-gray-700">{value}</span>
                    <button onClick={() => setEditField(field)} className="text-yellow-500 hover:text-yellow-600">
                      <Edit2 size={18} />
                    </button>
                  </>
                )}
              </div>
            ))}
          </div>

          <button
            onClick={handleSave}
            className="mt-6 bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-2 px-6 rounded-lg transition"
          >
            Guardar cambios
          </button>
        </div>

        {/* Columna derecha - Historial y Favoritos */}
        <div className="space-y-10">
          {/* Historial */}
          <div className="bg-white shadow-xl rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">Historial de servicios</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                <span className="text-gray-600">Servicio</span>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-600">$00.00</span>
                  <span className="bg-yellow-400 text-white text-xs py-1 px-3 rounded-full">Pendiente</span>
                </div>
              </div>

              <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                <span className="text-gray-600">Servicio</span>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-600">$00.00</span>
                  <span className="bg-blue-500 text-white text-xs py-1 px-3 rounded-full">Completado</span>
                </div>
              </div>
            </div>
          </div>

          {/* Favoritos */}
          <div className="bg-white shadow-xl rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">Favoritos</h3>
            <div className="grid grid-cols-2 gap-4">
              {['cerrajero', 'limpieza'].map((tipo, index) => (
                <div key={index} className="relative bg-gray-100 rounded-lg overflow-hidden">
                  <img src="/api/placeholder/300/200" alt={`Servicio de ${tipo}`} className="w-full h-28 object-cover" />
                  <div className="absolute bottom-10 left-2 flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <div className="absolute bottom-10 right-2">
                    <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white">
                      <img src="/api/placeholder/100/100" alt={`Perfil ${tipo}`} className="w-full h-full object-cover" />
                    </div>
                  </div>
                  <div className="text-center text-yellow-500 mt-2 pb-2 font-medium">
                    Servicio de {tipo}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
