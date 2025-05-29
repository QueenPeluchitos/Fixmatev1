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
    calle: '',
    numero: '',
    colonia: '',
    ciudad: '',
    estado: '',
    codigo_postal: '',
    referencias: '',
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

  const [show2FAModal, setShow2FAModal] = useState(false);
  const [qrData, setQrData] = useState(null);
  const [codigo2FA, setCodigo2FA] = useState('');
  const [activando2FA, setActivando2FA] = useState(false);

  useEffect(() => {
    if (user) {
      setUserData({
        nombre: user.nombre || '',
        apellido: user.apellido || '',
        telefono: user.telefono || '',
        calle: user.direccion_completa?.calle || '',
        numero: user.direccion_completa?.numero || '',
        colonia: user.direccion_completa?.colonia || '',
        ciudad: user.direccion_completa?.ciudad || '',
        estado: user.direccion_completa?.estado || '',
        codigo_postal: user.direccion_completa?.codigo_postal || '',
        referencias: user.direccion_completa?.referencias || '',
        email: user.correo || '',
        emergencia: user.emergencia || ''
      });
      if (user.foto_perfil) {
        const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";
        const fotoUrl = user.foto_perfil.startsWith('http') ? user.foto_perfil : `${backendUrl}${user.foto_perfil}`;
        setProfileImage(fotoUrl);
      }
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
    let ok = true;
    // Guardar datos generales (excepto dirección)
    try {
      const response = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(rest),
      });
      if (!response.ok) throw new Error('Error al guardar datos generales');
    } catch (err) {
      setStatusMsg('Error al guardar datos generales: ' + err.message);
      setStatusType('error');
      ok = false;
    }
    // Guardar dirección (estructura completa)
    try {
      const direccionPayload = {
        id_usuario: user.id_usuario,
        calle: userData.calle || userData.direccion || '',
        numero: userData.numero || '',
        colonia: userData.colonia || '',
        ciudad: userData.ciudad || '',
        estado: userData.estado || '',
        codigo_postal: userData.codigo_postal || '',
        referencias: userData.referencias || '',
      };
      // Si tienes solo un campo de dirección, solo manda calle
      const resDir = await fetch('/api/auth/direccion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(direccionPayload),
      });
      if (!resDir.ok) throw new Error('Error al guardar dirección');
    } catch (err) {
      setStatusMsg('Error al guardar dirección: ' + err.message);
      setStatusType('error');
      ok = false;
    }
    if (ok) {
      setStatusMsg('Datos guardados correctamente');
      setStatusType('success');
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

  // Lógica para activar 2FA
  const handleActivar2FA = async () => {
    setActivando2FA(true);
    setStatusMsg(null);
    setStatusType(null);
    try {
      const res = await fetch('/api/auth/2fa/setup', {
        method: 'POST',
        credentials: 'include',
      });
      const data = await res.json();
      if (res.ok && data.qr) {
        setQrData(data.qr);
        setShow2FAModal(true);
      } else {
        setStatusMsg(data.message || 'Error al iniciar 2FA');
        setStatusType('error');
      }
    } catch (err) {
      setStatusMsg('Error de red al activar 2FA');
      setStatusType('error');
    } finally {
      setActivando2FA(false);
    }
  };

  // Lógica para verificar el primer código 2FA
  const handleVerificar2FA = async (e) => {
    e.preventDefault();
    setStatusMsg(null);
    setStatusType(null);
    try {
      const res = await fetch('/api/auth/2fa/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ code: codigo2FA }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatusMsg('2FA activado correctamente');
        setStatusType('success');
        setShow2FAModal(false);
        setCodigo2FA('');
        // Opcional: recargar perfil para reflejar el cambio
        window.location.reload();
      } else {
        setStatusMsg(data.message || 'Código incorrecto');
        setStatusType('error');
      }
    } catch (err) {
      setStatusMsg('Error de red al verificar 2FA');
      setStatusType('error');
    }
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
            {/* Campos generales */}
            {["nombre", "apellido", "telefono", "email", "emergencia"].map((field) => (
              <div key={field} className="mb-4">
                <label className="block text-xs text-[#49568A] font-semibold mb-1 capitalize">
                  {field === 'emergencia' ? 'Contacto de emergencia' : field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <div className="flex justify-between items-center bg-yellow-50 px-4 py-2 rounded-lg hover:bg-yellow-100 transition-all duration-300">
                  {editField === field ? (
                    <input
                      type="text"
                      value={userData[field]}
                      onChange={(e) => handleChange(field, e.target.value)}
                      onBlur={() => setEditField(null)}
                      autoFocus
                      className="w-full text-gray-700 border-none focus:outline-none bg-transparent"
                    />
                  ) : (
                    <>
                      <span className="text-gray-700">{userData[field]}</span>
                      <button onClick={() => setEditField(field)} className="text-[#E5A800] hover:text-[#E5A800] transition-all duration-200">
                        <Edit2 size={18} />
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
            {/* Dirección editable por campos */}
            <div className="mb-4">
              <label className="block text-xs text-[#49568A] font-semibold mb-1">Dirección</label>
              <div className="flex flex-col gap-2 bg-yellow-50 px-4 py-2 rounded-lg border border-yellow-200 hover:bg-yellow-100 transition-all duration-300">
                {editField === 'direccion' ? (
                  <>
                    <input type="text" value={userData.calle} onChange={e => handleChange('calle', e.target.value)} placeholder="Calle" className="w-full border-none bg-transparent text-[#49568A] focus:outline-none focus:ring-2 focus:ring-[#E5A800]" />
                    <input type="text" value={userData.numero} onChange={e => handleChange('numero', e.target.value)} placeholder="Número" className="w-full border-none bg-transparent text-[#49568A] focus:outline-none focus:ring-2 focus:ring-[#E5A800]" />
                    <input type="text" value={userData.colonia} onChange={e => handleChange('colonia', e.target.value)} placeholder="Colonia" className="w-full border-none bg-transparent text-[#49568A] focus:outline-none focus:ring-2 focus:ring-[#E5A800]" />
                    <input type="text" value={userData.ciudad} onChange={e => handleChange('ciudad', e.target.value)} placeholder="Ciudad" className="w-full border-none bg-transparent text-[#49568A] focus:outline-none focus:ring-2 focus:ring-[#E5A800]" />
                    <input type="text" value={userData.estado} onChange={e => handleChange('estado', e.target.value)} placeholder="Estado" className="w-full border-none bg-transparent text-[#49568A] focus:outline-none focus:ring-2 focus:ring-[#E5A800]" />
                    <input type="text" value={userData.codigo_postal} onChange={e => handleChange('codigo_postal', e.target.value)} placeholder="Código Postal" className="w-full border-none bg-transparent text-[#49568A] focus:outline-none focus:ring-2 focus:ring-[#E5A800]" />
                    <input type="text" value={userData.referencias} onChange={e => handleChange('referencias', e.target.value)} placeholder="Referencias" className="w-full border-none bg-transparent text-[#49568A] focus:outline-none focus:ring-2 focus:ring-[#E5A800]" />
                    <button type="button" onClick={() => setEditField(null)} className="bg-[#E5A800] hover:bg-yellow-500 text-white py-1 px-3 rounded text-sm self-end transition-all hover:scale-105">Listo</button>
                  </>
                ) : (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">{[
                      userData.calle,
                      userData.numero,
                      userData.colonia,
                      userData.ciudad,
                      userData.estado,
                      userData.codigo_postal
                    ].filter(Boolean).join(', ')}</span>
                    <button onClick={() => setEditField('direccion')} className="text-[#E5A800] hover:text-[#E5A800] transition-all duration-200">
                      <Edit2 size={18} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <button
            onClick={handleSave}
            className="mt-6 bg-[#E5A800] hover:bg-[#D48D00] text-white font-semibold py-2 px-6 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            Guardar cambios
          </button>

          {/* Mensaje de estado debajo del botón de guardar cambios */}
          {statusMsg && (
            <div
              className={`mt-4 mb-2 p-3 rounded-md font-medium text-sm transition-opacity duration-700 ${statusType === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'} ${fadeOut ? 'opacity-0' : 'opacity-100'}`}
              style={{ position: 'relative', zIndex: 2 }}
            >
              {statusMsg}
            </div>
          )}
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

      </div>

      {/* Botón para activar 2FA si no está activo */}
      {user && !user.twofa_enabled && (
        <div className="mt-6 flex flex-col items-center w-full">
          <div className="flex items-center gap-2 mb-2">
            <button
              onClick={handleActivar2FA}
              className="bg-[#49568A] hover:bg-[#E5A800] text-white font-semibold py-2 px-6 rounded-lg transition-all duration-300 mt-8"
              disabled={activando2FA}
            >
              {activando2FA ? 'Cargando...' : 'Activar verificación 2FA'}
            </button>
          </div>
          <div className="w-full flex justify-center">
            <span className="text-xs text-gray-500 mt-1 text-center max-w-xs block">
              Necesitas una app como <b>Google Authenticator</b> o <b>Microsoft Authenticator</b> para activar la verificación en dos pasos.
            </span>
          </div>
          {statusMsg && (
            <div className={`mt-2 text-sm ${statusType === 'success' ? 'text-green-600' : 'text-red-600'}`}>{statusMsg}</div>
          )}
        </div>
      )}

      {/* Estado de 2FA y opción para desactivar */}
      {user && user.twofa_enabled && (
        <div className="mt-6 flex flex-col items-center w-full">
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-block w-3 h-3 rounded-full bg-green-500"></span>
            <span className="text-green-700 font-semibold">Verificación 2FA activada</span>
          </div>
          <button
            onClick={async () => {
              setStatusMsg(null);
              setStatusType(null);
              try {
                const res = await fetch('/api/auth/2fa/disable', {
                  method: 'POST',
                  credentials: 'include',
                });
                const data = await res.json();
                if (res.ok) {
                  setStatusMsg('2FA desactivada correctamente');
                  setStatusType('success');
                  window.location.reload();
                } else {
                  setStatusMsg(data.message || 'No se pudo desactivar 2FA');
                  setStatusType('error');
                }
              } catch (err) {
                setStatusMsg('Error de red al desactivar 2FA');
                setStatusType('error');
              }
            }}
            className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-300 mt-8"
          >
            Desactivar 2FA
          </button>
          <div className="w-full flex justify-center">
            <span className="text-xs text-gray-500 mt-1 text-center max-w-xs block">
              Necesitas una app como <b>Google Authenticator</b> o <b>Microsoft Authenticator</b> para utilizar la verificación en dos pasos.
            </span>
          </div>
          {statusMsg && (
            <div className={`mt-2 text-sm ${statusType === 'success' ? 'text-green-600' : 'text-red-600'}`}>{statusMsg}</div>
          )}
        </div>
      )}

      {/* Modal/Sección para mostrar QR y activar 2FA */}
      {show2FAModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full relative">
            <button onClick={() => setShow2FAModal(false)} className="absolute top-2 right-2 text-gray-400 hover:text-gray-700">✕</button>
            <h3 className="text-xl font-bold mb-4 text-[#49568A]">Configura la verificación en dos pasos</h3>
            <p className="mb-2 text-gray-700">Escanea este código QR con Google Authenticator o una app compatible.</p>
            {qrData && <img src={qrData} alt="QR 2FA" className="mx-auto mb-4" style={{ width: 180, height: 180 }} />}
            <form onSubmit={handleVerificar2FA}>
              <label className="block mb-2 text-gray-700">Ingresa el primer código generado por tu app:</label>
              <input
                type="text"
                value={codigo2FA}
                onChange={e => setCodigo2FA(e.target.value.replace(/\D/g, ''))}
                maxLength={6}
                pattern="[0-9]{6}"
                required
                className="w-full p-2 border border-[#9BA8D9] rounded mb-4 text-center text-lg tracking-widest focus:outline-none focus:ring-2 focus:ring-[#E5A800]"
                placeholder="Código 2FA"
              />
              <button
                type="submit"
                className="w-full bg-[#E5A800] hover:bg-[#D48D00] text-white font-semibold py-2 px-6 rounded-lg transition-all duration-300"
              >
                Activar 2FA
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
