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

  const [historialServicios, setHistorialServicios] = useState([
    { id: 1, nombre: 'Servicio 1', estado: 'Pendiente', precio: '$00.00' },
    { id: 2, nombre: 'Servicio 2', estado: 'En curso', precio: '$50.00' },
    { id: 3, nombre: 'Servicio 3', estado: 'Completado', precio: '$120.00' },
  ]);

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

  const handleRedirect = (service) => {
    if (service.estado === 'Pendiente') {
      window.location.href = '/servicio-pendiente';
    } else if (service.estado === 'En curso') {
      window.location.href = '/servicio-iniciado';
    } else if (service.estado === 'Completado') {
      window.location.href = '/reseña';
    }
  };

  const handleFavoritoClick = (tipo) => {
    window.location.href = `/servicio-usuario?tipo=${tipo}`;
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* Perfil de Usuario */}
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

        {/* Historial y Favoritos */}
        <div className="space-y-10">
          {/* Historial de servicios */}
          <div className="bg-white shadow-xl rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">Historial de servicios</h3>
            <div className="space-y-4">
              {historialServicios.map((service) => (
                <div key={service.id} className="bg-gray-50 p-4 rounded-lg shadow-sm">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700 font-medium">{service.nombre}</span>
                    <span className="text-gray-700 font-semibold">{service.precio}</span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className={`text-xs py-1 px-3 rounded-full text-white ${
                      service.estado === 'Pendiente' ? 'bg-yellow-400' :
                      service.estado === 'En curso' ? 'bg-green-500' : 'bg-blue-500'
                    }`}>
                      {service.estado}
                    </span>
                    <button
                      onClick={() => handleRedirect(service)}
                      className={`text-white py-1 px-3 text-sm rounded transition-colors ${
                        service.estado === 'Pendiente' ? 'bg-yellow-500 hover:bg-yellow-600' :
                        service.estado === 'En curso' ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600'
                      }`}
                    >
                      {service.estado === 'Pendiente' ? 'Ver servicio pendiente' :
                      service.estado === 'En curso' ? 'Ver servicio en curso' : 'Dejar reseña'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Favoritos */}
          <div className="bg-white shadow-xl rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">Favoritos</h3>
            <div className="grid grid-cols-2 gap-4">
              {['cerrajero', 'limpieza'].map((tipo, index) => (
                <div
                  key={index}
                  onClick={() => handleFavoritoClick(tipo)}
                  className="cursor-pointer relative bg-gray-100 rounded-lg overflow-hidden hover:shadow-lg transition-transform hover:scale-105"
                >
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
