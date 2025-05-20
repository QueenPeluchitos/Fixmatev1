import React, { useState, useRef, useEffect, useContext } from 'react';
import { Star, Edit2 } from 'lucide-react';
import { UserContext } from '../auth/context/UserContext.js';

export default function PerfilUsuario() {
  const { user } = useContext(UserContext);
  const [profileImage, setProfileImage] = useState('/images/placeholder.png');
  const fileInputRef = useRef(null);

  const [userData, setUserData] = useState({
    nombre: '',
    apellido: '',
    telefono: '',
    direccion: '',
    email: '',
    emergencia: '',
  });

  const [editField, setEditField] = useState(null);

  const [historialServicios, setHistorialServicios] = useState([
    { id: 1, nombre: 'Servicio 1', estado: 'Pendiente', precio: '$00.00' },
    { id: 2, nombre: 'Servicio 2', estado: 'En curso', precio: '$50.00' },
    { id: 3, nombre: 'Servicio 3', estado: 'Completado', precio: '$120.00' },
  ]);

  const [statusMsg, setStatusMsg] = useState(null);
  const [statusType, setStatusType] = useState(null); // 'success' | 'error'
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (user) {
      setUserData({
        nombre: user.nombre || '',
        apellido: user.apellido || '',
        telefono: user.telefono || '',
        direccion: user.direccion || '',
        email: user.correo || '',
        emergencia: user.emergencia || ''
      });
      if (user.foto_perfil) setProfileImage(user.foto_perfil);
    }
  }, [user]);

  useEffect(() => {
    if (statusMsg) {
      setFadeOut(false);
      const timer = setTimeout(() => setFadeOut(true), 4000); // Empieza a desvanecer a los 4s
      const timerRemove = setTimeout(() => {
        setStatusMsg(null);
        setStatusType(null);
        setFadeOut(false);
      }, 5000); // Elimina a los 5s
      return () => {
        clearTimeout(timer);
        clearTimeout(timerRemove);
      };
    }
  }, [statusMsg]);

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
    const { direccion, ...rest } = userData;
    try {
      const response = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(rest),
      });
      if (!response.ok) throw new Error('Error al guardar');
      setStatusMsg('Datos guardados correctamente');
      setStatusType('success');
    } catch (err) {
      setStatusMsg('Error al guardar: ' + err.message);
      setStatusType('error');
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
    <div className="max-w-6xl mx-auto px-6 py-12 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* Perfil de Usuario */}
        <div className="bg-white shadow-xl rounded-2xl p-8 text-center border border-gray-200 transition-all transform hover:scale-105 hover:shadow-2xl">
          <div className="relative w-48 h-48 mx-auto mb-6 cursor-pointer rounded-full overflow-hidden shadow-lg transition-all transform hover:scale-110" onClick={handleImageClick}>
            <img src={profileImage} alt="Perfil" className="w-full h-full object-cover" />
            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageChange} />
          </div>

          <h2 className="text-2xl font-semibold text-[#49568A] mb-4 transition-all duration-300 hover:text-[#E5A800]">Mi Perfil</h2>

          <div className="space-y-4 text-left">
            {Object.entries(userData).map(([field, value]) => (
              <div key={field} className="flex justify-between items-center bg-yellow-50 px-4 py-2 rounded-lg hover:bg-yellow-100 transition-all duration-300">
                {editField === field ? (
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => handleChange(field, e.target.value)}
                    onBlur={() => setEditField(null)}
                    autoFocus
                    className="w-full text-gray-700 border-none focus:outline-none bg-transparent"
                    disabled={field === 'direccion'}
                  />
                ) : (
                  <>
                    <span className="text-gray-700">{value}</span>
                    <button onClick={() => field !== 'direccion' && setEditField(field)} className={`text-[#E5A800] hover:text-[#E5A800] transition-all duration-200 ${field === 'direccion' ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={field === 'direccion'}>
                      <Edit2 size={18} />
                    </button>
                  </>
                )}
              </div>
            ))}
          </div>

          <button
            onClick={handleSave}
            className="mt-6 bg-[#E5A800] hover:bg-[#D48D00] text-white font-semibold py-2 px-6 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            Guardar cambios
          </button>
        </div>

        {/* Historial y Favoritos */}
        <div className="space-y-10">
          {/* Historial de servicios */}
          <div className="bg-white shadow-xl rounded-2xl p-6 border border-gray-200 transition-all transform hover:scale-105 hover:shadow-2xl">
            <h3 className="text-xl font-semibold text-[#49568A] mb-4 text-center transition-all duration-300 hover:text-[#E5A800]">Historial de servicios</h3>
            <div className="space-y-4">
              {historialServicios.map((service) => (
                <div key={service.id} className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700 font-medium">{service.nombre}</span>
                    <span className="text-gray-700 font-semibold">{service.precio}</span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className={`text-xs py-1 px-3 rounded-full text-white ${service.estado === 'Pendiente' ? 'bg-[#E5A800]' : service.estado === 'En curso' ? 'bg-[#28A745]' : 'bg-[#49568A]'}`}>
                      {service.estado}
                    </span>
                    <button
                      onClick={() => handleRedirect(service)}
                      className={`text-white py-1 px-3 text-sm rounded transition-colors ${service.estado === 'Pendiente' ? 'bg-[#E5A800] hover:bg-[#D48D00]' : service.estado === 'En curso' ? 'bg-[#28A745] hover:bg-[#218838]' : 'bg-[#49568A] hover:bg-[#3A496B]'}`}
                    >
                      {service.estado === 'Pendiente' ? 'Ver servicio pendiente' : service.estado === 'En curso' ? 'Ver servicio en curso' : 'Dejar reseña'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Favoritos */}
          <div className="bg-white shadow-xl rounded-2xl p-6 border border-gray-200 transition-all transform hover:scale-105 hover:shadow-2xl">
            <h3 className="text-xl font-semibold text-[#49568A] mb-4 text-center transition-all duration-300 hover:text-[#E5A800]">Favoritos</h3>
            <div className="grid grid-cols-2 gap-4">
              {['cerrajero', 'limpieza'].map((tipo, index) => (
                <div
                  key={index}
                  onClick={() => handleFavoritoClick(tipo)}
                  className="cursor-pointer relative bg-gray-100 rounded-lg overflow-hidden hover:shadow-lg transition-transform hover:scale-105"
                >
                  <img src="/api/placeholder/300/200" alt={`Servicio de ${tipo}`} className="w-full h-28 object-cover transition-all duration-300 transform hover:scale-105" />
                  <div className="absolute bottom-10 left-2 flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#E5A800] text-[#E5A800]" />
                    ))}
                  </div>
                  <div className="absolute bottom-10 right-2">
                    <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white">
                      <img src="/api/placeholder/100/100" alt={`Perfil ${tipo}`} className="w-full h-full object-cover" />
                    </div>
                  </div>
                  <div className="text-center text-[#E5A800] mt-2 pb-2 font-medium transition-all duration-300 hover:text-[#49568A]">
                    Servicio de {tipo}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mensaje de estado */}
        {statusMsg && (
          <div
            className={`mb-4 p-3 rounded-md font-medium text-sm transition-opacity duration-700 ${statusType === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'} ${fadeOut ? 'opacity-0' : 'opacity-100'}`}
          >
            {statusMsg}
          </div>
        )}

      </div>
    </div>
  );
}
