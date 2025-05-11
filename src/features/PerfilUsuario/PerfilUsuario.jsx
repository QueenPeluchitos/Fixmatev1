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

  // Función para redirigir al usuario según el estado del servicio
  const handleRedirect = (service) => {
    if (service.estado === 'Pendiente') {
      window.location.href = '/servicio-pendiente';
    } else if (service.estado === 'En curso') {
      window.location.href = '/servicio-iniciado';
    } else if (service.estado === 'Completado') {
      window.location.href = '/reseña';
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 my-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Columna izquierda - Perfil de usuario */}
        <div className="flex flex-col items-center">
          {/* Imagen de perfil */}
          <div className="w-64 h-64 rounded-full overflow-hidden mb-6 cursor-pointer transform transition-transform duration-500 hover:scale-110 hover:shadow-2xl" onClick={handleImageClick}>
            <img src={profileImage} alt="Foto de perfil" className="w-full h-full object-cover" />
            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageChange} />
          </div>

          {/* Información del usuario */}
          <h2 className="text-xl text-indigo-600 font-medium mb-6">Usuario</h2>

          <div className="w-full max-w-md space-y-4">
            {Object.entries(userData).map(([field, value]) => (
              <div key={field} className="flex justify-between items-center text-yellow-500">
                {editField === field ? (
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => handleChange(field, e.target.value)}
                    onBlur={() => setEditField(null)}
                    autoFocus
                    className="border border-yellow-300 p-1 rounded text-gray-700 w-full"
                  />
                ) : (
                  <>
                    <span>{value}</span>
                    <button onClick={() => setEditField(field)} className="text-yellow-500">
                      <Edit2 size={18} />
                    </button>
                  </>
                )}
              </div>
            ))}

            <button
              onClick={handleSave}
              className="mt-4 bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-2 px-4 rounded transition-transform duration-300 hover:scale-105"
            >
              Guardar cambios
            </button>
          </div>
        </div>

        {/* Columna derecha - Historial y favoritos */}
        <div className="space-y-10">
          {/* Historial */}
          <div className="bg-blue-100 rounded-lg p-6 transform transition-all duration-500 hover:shadow-xl">
            <h2 className="text-xl text-indigo-600 font-medium mb-6 text-center">Historial de servicios</h2>
            <div className="space-y-6">
              {historialServicios.map((service) => (
                <div key={service.id} className="bg-white p-4 rounded-lg shadow">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700 font-medium text-lg">{service.nombre}</span>
                    <span className="text-gray-700 font-bold">{service.precio}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className={`text-sm py-1 px-3 rounded-full ${
                      service.estado === 'Pendiente' ? 'bg-yellow-400' : 
                      service.estado === 'En curso' ? 'bg-green-500' : 'bg-blue-500'
                    } text-white`}>
                      {service.estado}
                    </span>
                    <button
                      onClick={() => handleRedirect(service)}
                      className={`text-white py-2 px-4 rounded transition-colors ${
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
          <div>
            <h2 className="text-xl text-indigo-600 font-medium mb-6">Servicios favoritos</h2>
            <div className="grid grid-cols-2 gap-4">
              {/* Servicio de ejemplo */}
              {['cerrajero', 'limpieza'].map((tipo, index) => (
                <div key={index} className="relative transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
                  <div className="rounded-lg overflow-hidden">
                    <img src="/api/placeholder/300/200" alt={`Servicio de ${tipo}`} className="w-full h-28 object-cover" />
                    <div className="absolute bottom-12 left-2 flex">
                      {[...Array(3)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <div className="absolute bottom-12 right-2">
                      <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white">
                        <img src="/api/placeholder/100/100" alt={`Perfil ${tipo}`} className="w-full h-full object-cover" />
                      </div>
                    </div>
                  </div>
                  <div className="text-center text-yellow-500 mt-2">{`Servicio de ${tipo}`}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}