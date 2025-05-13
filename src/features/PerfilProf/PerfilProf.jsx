import { useState } from 'react';
import { Pencil, Star } from 'lucide-react';
import { Link } from "react-router-dom";

export default function PerfilProf() {
  const [nombre, setNombre] = useState('Juan Pérez');
  const [telefono, setTelefono] = useState('4430000000');
  const [direccion, setDireccion] = useState('Calle Ficticia #123');
  const [editandoCampo, setEditandoCampo] = useState(null);
  const [foto, setFoto] = useState('/api/placeholder/200/200');
  const [fotoTemporal, setFotoTemporal] = useState('');
  const [editandoFoto, setEditandoFoto] = useState(false);

  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setFotoTemporal(url);
      setEditandoFoto(true);
    }
  };

  const guardarFoto = () => {
    if (fotoTemporal) {
      setFoto(fotoTemporal);
      setFotoTemporal('');
      setEditandoFoto(false);
    }
  };

  const guardarCampo = () => {
    setEditandoCampo(null);
  };

  return (
    <div className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden max-w-6xl mx-auto my-20">
      {/* Panel de perfil y servicios actuales */}
      <div className="flex flex-col md:flex-row">
        {/* Panel izquierdo */}
        <div className="w-full md:w-1/3 p-8 flex flex-col items-center animate__animated animate__fadeIn">
          <div className="relative flex flex-col items-center">
            <div 
              className="w-32 h-32 rounded-full overflow-hidden mb-4 cursor-pointer transition-all hover:scale-105"
              onClick={() => document.getElementById('foto-upload').click()}
            >
              <img 
                src={fotoTemporal || foto} 
                alt="Foto de perfil" 
                className="w-full h-full object-cover transition-all duration-500"
              />
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
            <div className="flex items-center justify-between">
              {editandoCampo === 'nombre' ? (
                <div className="w-full flex flex-col gap-2">
                  <input 
                    type="text" 
                    value={nombre} 
                    onChange={(e) => setNombre(e.target.value)} 
                    className="w-full border rounded p-1 text-[#E5A800] transition-all focus:ring-2 focus:ring-[#E5A800]"
                  />
                  <button
                    onClick={guardarCampo}
                    className="bg-[#E5A800] hover:bg-yellow-500 text-white py-1 px-3 rounded text-sm self-end transition-all hover:scale-105"
                  >
                    Guardar
                  </button>
                </div>
              ) : (
                <>
                  <span className="font-medium text-[#E5A800]">{nombre}</span>
                  <button className="text-[#E5A800]" onClick={() => setEditandoCampo('nombre')}>
                    <Pencil size={18} />
                  </button>
                </>
              )}
            </div>

            {/* Teléfono */}
            <div className="flex items-center justify-between">
              {editandoCampo === 'telefono' ? (
                <div className="w-full flex flex-col gap-2">
                  <input 
                    type="text" 
                    value={telefono} 
                    onChange={(e) => setTelefono(e.target.value)} 
                    className="w-full border rounded p-1 text-[#E5A800] transition-all focus:ring-2 focus:ring-[#E5A800]"
                  />
                  <button
                    onClick={guardarCampo}
                    className="bg-[#E5A800] hover:bg-yellow-500 text-white py-1 px-3 rounded text-sm self-end transition-all hover:scale-105"
                  >
                    Guardar
                  </button>
                </div>
              ) : (
                <>
                  <span className="font-medium text-[#E5A800]">{telefono}</span>
                  <button className="text-[#E5A800]" onClick={() => setEditandoCampo('telefono')}>
                    <Pencil size={18} />
                  </button>
                </>
              )}
            </div>

            {/* Dirección */}
            <div className="flex items-center justify-between">
              {editandoCampo === 'direccion' ? (
                <div className="w-full flex flex-col gap-2">
                  <input 
                    type="text" 
                    value={direccion} 
                    onChange={(e) => setDireccion(e.target.value)} 
                    className="w-full border rounded p-1 text-[#E5A800] transition-all focus:ring-2 focus:ring-[#E5A800]"
                  />
                  <button
                    onClick={guardarCampo}
                    className="bg-[#E5A800] hover:bg-yellow-500 text-white py-1 px-3 rounded text-sm self-end transition-all hover:scale-105"
                  >
                    Guardar
                  </button>
                </div>
              ) : (
                <>
                  <span className="font-medium text-[#E5A800]">{direccion}</span>
                  <button className="text-[#E5A800]" onClick={() => setEditandoCampo('direccion')}>
                    <Pencil size={18} />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Panel derecho de servicios activos */}
        <div className="w-full md:w-2/3 bg-[#F9FAFB] p-8 animate__animated animate__fadeIn">
          <h2 className="text-2xl font-semibold text-[#49568A] mb-6 text-center">Servicios</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((serv, i) => (
              <div key={i} className="bg-white rounded-lg overflow-hidden shadow transition-all hover:scale-105">
                <div className="h-40 overflow-hidden">
                  <img 
                    src="/api/placeholder/300/200" 
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
                        <h3 className="font-medium text-[#E5A800]">Servicio {i + 1}</h3>
                      </div>
                    </div>
                    <Link to="/servicio-profesionista">
                      <button className="text-[#E5A800]">
                        <Pencil size={18} />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
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
