import { useState, useContext, useEffect, useRef } from 'react';
import { Pencil, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from '../auth/context/UserContext.js';
// DEBUG: loguear el contexto global
import { useContext as useReactContext } from 'react';

export default function PerfilProf() {
  // Loguear el contexto global completo
  const globalContext = useReactContext(UserContext);
  console.log('DEBUG UserContext global en PerfilProf:', globalContext);

  const { user, refreshUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState('');
  const [editandoCampo, setEditandoCampo] = useState(null);
  const [foto, setFoto] = useState('/archivos_usuarios/placeholder.png');
  const [fotoTemporal, setFotoTemporal] = useState('');
  const [editandoFoto, setEditandoFoto] = useState(false);
  const [servicios, setServicios] = useState([]);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [mensajeGuardado, setMensajeGuardado] = useState('');
  const [mensajeFadeOut, setMensajeFadeOut] = useState(false);
  const timeoutRef = useRef(null);
  const serviciosPorPagina = 4;
  const totalPaginas = Math.ceil(servicios.length / serviciosPorPagina);

  // Dirección completa
  const [calle, setCalle] = useState('');
  const [numero, setNumero] = useState('');
  const [colonia, setColonia] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [estadoDir, setEstadoDir] = useState('');
  const [codigoPostal, setCodigoPostal] = useState('');
  const [referencias, setReferencias] = useState('');

  useEffect(() => {
    console.log('PerfilProf: user:', user);
    if (user) {
      setNombre(user.nombre || '');
      setApellido(user.apellido || '');
      setTelefono(user.telefono || '');
      setDireccion(user.direccion || '');
      setFoto(user.foto_perfil || '/archivos_usuarios/placeholder.png');
      setFotoTemporal(''); // Limpiar previsualización al refrescar usuario
      // Si el usuario no es profesionista, redirigir o mostrar mensaje
      if (user.tipo_usuario !== 'prof') {
        console.warn('No es profesionista, redirigiendo a /landing');
        // No redirigir automáticamente, mostrar mensaje en pantalla
      }
    } else {
      console.warn('No hay user en contexto, probablemente no autenticado');
      // No redirigir automáticamente, mostrar mensaje en pantalla
    }
  }, [user, navigate]);

  useEffect(() => {
    async function fetchServicios() {
      if (user && user.perfil && user.perfil.id_profesionista) {
        try {
          const res = await fetch(`http://localhost:3000/api/servicios?profesionista=${user.perfil.id_profesionista}`, {
            credentials: 'include',
          });
          if (res.ok) {
            const data = await res.json();
            setServicios(data);
          } else {
            setServicios([]);
          }
        } catch (err) {
          setServicios([]);
        }
      }
    }
    fetchServicios();
  }, [user]);

  useEffect(() => {
    if (user && user.direccion_completa) {
      setCalle(user.direccion_completa.calle || '');
      setNumero(user.direccion_completa.numero || '');
      setColonia(user.direccion_completa.colonia || '');
      setCiudad(user.direccion_completa.ciudad || '');
      setEstadoDir(user.direccion_completa.estado || '');
      setCodigoPostal(user.direccion_completa.codigo_postal || '');
      setReferencias(user.direccion_completa.referencias || '');
    }
  }, [user]);

  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setFotoTemporal(url);
      setEditandoFoto(true);
    }
  };

  const guardarFoto = async () => {
    if (fotoTemporal && user) {
      // Subir la foto real
      const fileInput = document.getElementById('foto-upload');
      const file = fileInput.files[0];
      if (file) {
        const formData = new FormData();
        formData.append('foto', file);
        const res = await fetch('/api/auth/profile/photo', {
          method: 'PUT',
          credentials: 'include',
          body: formData,
        });
        if (res.ok) {
          if (refreshUser) await refreshUser();
        }
      }
      setFotoTemporal(''); // Limpiar previsualización después de guardar
      setEditandoFoto(false);
    }
  };

  const mostrarMensaje = (msg) => {
    setMensajeGuardado(msg);
    setMensajeFadeOut(false);
  };

  useEffect(() => {
    if (mensajeGuardado) {
      setMensajeFadeOut(false);
      const timerFade = setTimeout(() => setMensajeFadeOut(true), 4000); // Fade out a los 4s
      const timerRemove = setTimeout(() => {
        setMensajeGuardado('');
        setMensajeFadeOut(false);
      }, 5000); // Elimina a los 5s
      return () => {
        clearTimeout(timerFade);
        clearTimeout(timerRemove);
      };
    }
  }, [mensajeGuardado]);

  const guardarCampo = async () => {
    let payload = {};
    let url = '/api/auth/profile';
    let method = 'PUT';
    let isDireccion = false;

    if (editandoCampo === 'nombre') payload.nombre = nombre;
    if (editandoCampo === 'apellido') payload.apellido = apellido;
    if (editandoCampo === 'telefono') payload.telefono = telefono;
    if (editandoCampo === 'direccion') {
      // Aquí separamos la lógica para dirección
      isDireccion = true;
      url = '/api/auth/direccion';
      method = 'POST';
      payload = {
        id_usuario: user.id_usuario,
        calle,
        numero,
        colonia,
        ciudad,
        estado: estadoDir,
        codigo_postal: codigoPostal,
        referencias,
      };
    }

    try {
      let mensaje = '';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        mensaje = 'Cambios guardados correctamente';
        mostrarMensaje(mensaje);
        setEditandoCampo(null);
        // Si quieres refrescar la dirección en el contexto, puedes hacerlo aquí
        // if (isDireccion && refreshUser) await refreshUser();
      } else {
        mensaje = 'No se pudieron guardar los cambios.';
        mostrarMensaje(mensaje);
        setEditandoCampo(null);
      }
    } catch (err) {
      mostrarMensaje('Error de red al guardar los cambios.');
      setEditandoCampo(null);
    }
  };

  // DEBUG extra: forzar un log de error si el contexto está vacío
  if (!user) {
    console.error('El contexto user está vacío en PerfilProf. Esto indica que el AuthProvider no está cargando el usuario.');
  }

  if (!user) {
    return <div style={{padding: 40, color: 'red', fontWeight: 'bold'}}>No hay usuario en contexto. Probablemente no has iniciado sesión.<br/>Revisa la consola para más detalles.</div>;
  }
  if (user.tipo_usuario !== 'prof') {
    return <div style={{padding: 40, color: 'red', fontWeight: 'bold'}}>Acceso denegado: tu tipo de usuario es <b>{user.tipo_usuario}</b>.<br/>Solo los profesionistas pueden ver este perfil.<br/>Revisa la consola para más detalles.</div>;
  }

  const handlePrev = () => {
    setCarouselIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };
  const handleNext = () => {
    setCarouselIndex((prev) => (prev < totalPaginas - 1 ? prev + 1 : prev));
  };
  const serviciosAMostrar = servicios.slice(carouselIndex * serviciosPorPagina, (carouselIndex + 1) * serviciosPorPagina);

  return (
    <div className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden max-w-6xl mx-auto my-20">
      {/* Panel de perfil y servicios actuales */}
      <div className="flex flex-col md:flex-row">
        {/* Panel izquierdo */}
        <div className="w-full md:w-1/3 p-8 flex flex-col items-center animate__animated animate__fadeIn">
          {/* Mensaje de guardado arriba del layout de Nombre */}
          {mensajeGuardado && (
            <div
              className={`w-full mb-4 bg-green-100 text-green-700 px-4 py-2 rounded-lg text-center font-semibold shadow animate__animated animate__fadeInDown transition-opacity duration-700 ${mensajeFadeOut ? 'opacity-0' : 'opacity-100'}`}
              style={{ pointerEvents: 'none' }}
            >
              {mensajeGuardado}
            </div>
          )}
          <div className="relative flex flex-col items-center">
            <div 
              className="w-32 h-32 rounded-full overflow-hidden mb-4 cursor-pointer transition-all hover:scale-105"
              onClick={() => document.getElementById('foto-upload').click()}
            >
              {fotoTemporal ? (
                <img 
                  src={fotoTemporal} 
                  alt="Foto de perfil previsualización" 
                  className="w-full h-full object-cover transition-all duration-500"
                />
              ) : (
                <img 
                  src={foto ? `${foto}?${foto && foto !== '/archivos_usuarios/placeholder.png' ? Date.now() : ''}` : '/archivos_usuarios/placeholder.png'} 
                  alt="Foto de perfil" 
                  className="w-full h-full object-cover transition-all duration-500"
                />
              )}
            </div>
            <input
              type="file"
              id="foto-upload"
              accept="image/*"
              className="hidden"
              onChange={handleFotoChange}
            />
            {editandoFoto && (
              <button
                onClick={guardarFoto}
                className="bg-[#E5A800] hover:bg-yellow-500 text-white py-1 px-3 rounded text-sm mt-2 transition-all hover:scale-105"
              >
                Guardar
              </button>
            )}
          </div>

          <h2 className="text-2xl font-semibold text-[#49568A] mb-2">{nombre}</h2>
          <div className="flex items-center gap-2 mb-6 text-gray-400">
            <span>Profesionista</span>
            <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-[#9BA8D9] rounded-md"></div>
            </div>
          </div>

          {/* Información editable */}
          <div className="w-full space-y-4">
            {/* Nombre */}
            <div className="mb-4"> {/* Cambiado de mb-2 a mb-4 para mayor separación */}
              <label className="block text-xs text-[#49568A] font-semibold mb-1">Nombre</label>
              <div className="flex items-center justify-between bg-yellow-50 px-4 py-2 rounded-lg border border-yellow-200 hover:bg-yellow-100 transition-all duration-300">
                {editandoCampo === 'nombre' ? (
                  <div className="w-full flex flex-col gap-2">
                    <input 
                      type="text" 
                      value={nombre} 
                      onChange={(e) => setNombre(e.target.value)} 
                      className="w-full border-none bg-transparent text-[#49568A] focus:outline-none focus:ring-2 focus:ring-[#E5A800]"
                    />
                    <button
                      type="button"
                      onClick={(e) => { e.preventDefault(); guardarCampo(); }}
                      className="bg-[#E5A800] hover:bg-yellow-500 text-white py-1 px-3 rounded text-sm self-end transition-all hover:scale-105"
                    >
                      Guardar
                    </button>
                  </div>
                ) : (
                  <>
                    <span className="font-medium text-[#49568A]">{nombre}</span>
                    <button className="text-[#E5A800]" onClick={() => setEditandoCampo('nombre')}>
                      <Pencil size={18} />
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Apellido */}
            <div className="mb-4"> {/* Cambiado de mb-2 a mb-4 para mayor separación */}
              <label className="block text-xs text-[#49568A] font-semibold mb-1">Apellido</label>
              <div className="flex items-center justify-between bg-yellow-50 px-4 py-2 rounded-lg border border-yellow-200 hover:bg-yellow-100 transition-all duration-300">
                {editandoCampo === 'apellido' ? (
                  <div className="w-full flex flex-col gap-2">
                    <input 
                      type="text" 
                      value={apellido} 
                      onChange={(e) => setApellido(e.target.value)} 
                      className="w-full border-none bg-transparent text-[#49568A] focus:outline-none focus:ring-2 focus:ring-[#E5A800]"
                    />
                    <button
                      type="button"
                      onClick={(e) => { e.preventDefault(); guardarCampo(); }}
                      className="bg-[#E5A800] hover:bg-yellow-500 text-white py-1 px-3 rounded text-sm self-end transition-all hover:scale-105"
                    >
                      Guardar
                    </button>
                  </div>
                ) : (
                  <>
                    <span className="font-medium text-[#49568A]">{apellido}</span>
                    <button className="text-[#E5A800]" onClick={() => setEditandoCampo('apellido')}>
                      <Pencil size={18} />
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Teléfono */}
            <div className="mb-4"> {/* Cambiado de mb-2 a mb-4 para mayor separación */}
              <label className="block text-xs text-[#49568A] font-semibold mb-1">Teléfono</label>
              <div className="flex items-center justify-between bg-yellow-50 px-4 py-2 rounded-lg border border-yellow-200 hover:bg-yellow-100 transition-all duration-300">
                {editandoCampo === 'telefono' ? (
                  <div className="w-full flex flex-col gap-2">
                    <input 
                      type="text" 
                      value={telefono} 
                      onChange={(e) => setTelefono(e.target.value)} 
                      className="w-full border-none bg-transparent text-[#49568A] focus:outline-none focus:ring-2 focus:ring-[#E5A800]"
                    />
                    <button
                      type="button"
                      onClick={(e) => { e.preventDefault(); guardarCampo(); }}
                      className="bg-[#E5A800] hover:bg-yellow-500 text-white py-1 px-3 rounded text-sm self-end transition-all hover:scale-105"
                    >
                      Guardar
                    </button>
                  </div>
                ) : (
                  <>
                    <span className="font-medium text-[#49568A]">{telefono}</span>
                    <button className="text-[#E5A800]" onClick={() => setEditandoCampo('telefono')}>
                      <Pencil size={18} />
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Dirección */}
            <div className="mb-4"> {/* Cambiado de mb-2 a mb-4 para mayor separación */}
              <label className="block text-xs text-[#49568A] font-semibold mb-1">Dirección</label>
              <div className="flex items-center justify-between bg-yellow-50 px-4 py-2 rounded-lg border border-yellow-200 hover:bg-yellow-100 transition-all duration-300">
                {editandoCampo === 'direccion' ? (
                  <div className="w-full flex flex-col gap-2">
                    <input type="text" value={calle} onChange={e => setCalle(e.target.value)} placeholder="Calle" className="w-full border-none bg-transparent text-[#49568A] focus:outline-none focus:ring-2 focus:ring-[#E5A800]" />
                    <input type="text" value={numero} onChange={e => setNumero(e.target.value)} placeholder="Número" className="w-full border-none bg-transparent text-[#49568A] focus:outline-none focus:ring-2 focus:ring-[#E5A800]" />
                    <input type="text" value={colonia} onChange={e => setColonia(e.target.value)} placeholder="Colonia" className="w-full border-none bg-transparent text-[#49568A] focus:outline-none focus:ring-2 focus:ring-[#E5A800]" />
                    <input type="text" value={ciudad} onChange={e => setCiudad(e.target.value)} placeholder="Ciudad" className="w-full border-none bg-transparent text-[#49568A] focus:outline-none focus:ring-2 focus:ring-[#E5A800]" />
                    <input type="text" value={estadoDir} onChange={e => setEstadoDir(e.target.value)} placeholder="Estado" className="w-full border-none bg-transparent text-[#49568A] focus:outline-none focus:ring-2 focus:ring-[#E5A800]" />
                    <input type="text" value={codigoPostal} onChange={e => setCodigoPostal(e.target.value)} placeholder="Código Postal" className="w-full border-none bg-transparent text-[#49568A] focus:outline-none focus:ring-2 focus:ring-[#E5A800]" />
                    <input type="text" value={referencias} onChange={e => setReferencias(e.target.value)} placeholder="Referencias" className="w-full border-none bg-transparent text-[#49568A] focus:outline-none focus:ring-2 focus:ring-[#E5A800]" />
                    <button type="button" onClick={e => { e.preventDefault(); guardarCampo(); }} className="bg-[#E5A800] hover:bg-yellow-500 text-white py-1 px-3 rounded text-sm self-end transition-all hover:scale-105">Guardar</button>
                  </div>
                ) : (
                  <>
                    <span className="font-medium text-[#49568A]">{[calle, numero, colonia, ciudad, estadoDir, codigoPostal].filter(Boolean).join(', ')}</span>
                    <button className="text-[#E5A800]" onClick={() => setEditandoCampo('direccion')}>
                      <Pencil size={18} />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Panel derecho de servicios activos */}
        <div className="w-full md:w-2/3 bg-[#F9FAFB] p-8 animate__animated animate__fadeIn">
          <h2 className="text-2xl font-semibold text-[#49568A] mb-6 text-center">Servicios</h2>
          <div className="flex justify-between items-center mb-4">
            <button onClick={handlePrev} disabled={carouselIndex === 0} className={`p-2 rounded-full ${carouselIndex === 0 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-[#49568A] text-white hover:bg-[#3F4A75]'}`}> <ChevronLeft size={24} /> </button>
            <span className="text-[#49568A] text-sm">Página {carouselIndex + 1} de {totalPaginas || 1}</span>
            <button onClick={handleNext} disabled={carouselIndex >= totalPaginas - 1} className={`p-2 rounded-full ${carouselIndex >= totalPaginas - 1 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-[#49568A] text-white hover:bg-[#3F4A75]'}`}> <ChevronRight size={24} /> </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {servicios.length === 0 && (
              <div className="col-span-2 text-center text-gray-400">No tienes servicios registrados.</div>
            )}
            {serviciosAMostrar.map((serv, i) => (
              <Link key={serv.id_servicio || i} to={`/servicio-profesionista?id=${serv.id_servicio}`} className="block">
                <div className="bg-white rounded-lg overflow-hidden shadow transition-all hover:scale-105 cursor-pointer">
                  <div className="h-40 overflow-hidden flex items-center justify-center bg-gray-100">
                    <img 
                      src={serv.imagen || '/api/placeholder/300/200'} 
                      alt="Servicio" 
                      className="w-full h-full object-cover transition-all duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="flex items-center gap-1 mb-2">
                          {[...Array(5)].map((_, idx) => (
                            <Star key={idx} size={16} fill="gold" color="gold" />
                          ))}
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-gray-200 overflow-hidden">
                            <img src="/api/placeholder/50/50" alt="Provider" className="w-full h-full object-cover" />
                          </div>
                          <h3 className="font-medium text-[#E5A800]">{serv.nombre}</h3>
                        </div>
                      </div>
                      <button className="text-[#E5A800]">
                        <Pencil size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Sección inferior: Servicio Pendiente y Servicio Terminado */}
      <div className="bg-white p-8 space-y-10 animate__animated animate__fadeIn">
        {/* Servicio Pendiente */}
        <div>
          <h3 className="text-2xl font-semibold text-[#49568A] mb-4">Servicio Pendiente</h3>
          <div className="bg-white rounded-lg overflow-hidden shadow transition-all hover:scale-105">
            <div className="h-40 overflow-hidden">
              <img 
                src="/api/placeholder/300/200" 
                alt="Servicio pendiente" 
                className="w-full h-full object-cover transition-all duration-500"
              />
            </div>
            <div className="p-4 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-gray-200 overflow-hidden">
                  <img src="/api/placeholder/50/50" alt="Provider" className="w-full h-full object-cover" />
                </div>
                <h3 className="font-medium text-[#E5A800]">Servicio Pendiente</h3>
              </div>
              <Link to="/servicio-en-curso-profesionista">
                <button className="bg-[#E5A800] hover:bg-yellow-500 text-white py-1 px-3 rounded text-sm transition-all hover:scale-105">
                  Iniciar servicio
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Servicio Terminado */}
        <div>
          <h3 className="text-2xl font-semibold text-[#49568A] mb-4">Servicio Terminado</h3>
          <div className="bg-white rounded-lg overflow-hidden shadow transition-all hover:scale-105">
            <div className="h-40 overflow-hidden">
              <img 
                src="/api/placeholder/300/200" 
                alt="Servicio terminado" 
                className="w-full h-full object-cover transition-all duration-500"
              />
            </div>
            <div className="p-4 flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-gray-200 overflow-hidden">
                <img src="/api/placeholder/50/50" alt="Provider" className="w-full h-full object-cover" />
              </div>
              <h3 className="font-medium text-[#E5A800]">Servicio Terminado</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
