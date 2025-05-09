import { useState } from 'react';
import { Pencil, Star } from 'lucide-react';

export default function PerfilProf() {
  const [nombre, setNombre] = useState('Juan Pérez');
  const [telefono, setTelefono] = useState('4430000000');
  const [direccion, setDireccion] = useState('Calle Ficticia #123');
  const [editandoCampo, setEditandoCampo] = useState(null); // 'nombre', 'telefono', 'direccion'
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
    <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-md overflow-hidden max-w-6xl mx-auto my-20">
      {/* Panel de perfil izquierdo */}
      <div className="w-full md:w-1/3 p-8 flex flex-col items-center">
        <div className="relative flex flex-col items-center">
          <div 
            className="w-32 h-32 rounded-full overflow-hidden mb-4 cursor-pointer"
            onClick={() => document.getElementById('foto-upload').click()}
          >
            <img 
              src={fotoTemporal || foto} 
              alt="Foto de perfil" 
              className="w-full h-full object-cover"
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
              className="bg-yellow-400 hover:bg-yellow-500 text-white py-1 px-3 rounded text-sm"
            >
              Guardar
            </button>
          )}
        </div>

        <h2 className="text-2xl font-semibold text-gray-600 mb-2">{nombre}</h2>
        <div className="flex items-center gap-2 mb-6 text-gray-400">
          <span>Profesionista</span>
          <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center">
            <div className="w-4 h-4 bg-blue-300 rounded-md"></div>
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
                  className="w-full border rounded p-1 text-yellow-600"
                />
                <button
                  onClick={guardarCampo}
                  className="bg-yellow-400 hover:bg-yellow-500 text-white py-1 px-3 rounded text-sm self-end"
                >
                  Guardar
                </button>
              </div>
            ) : (
              <>
                <span className="font-medium text-yellow-500">{nombre}</span>
                <button className="text-yellow-500" onClick={() => setEditandoCampo('nombre')}>
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
                  className="w-full border rounded p-1 text-yellow-600"
                />
                <button
                  onClick={guardarCampo}
                  className="bg-yellow-400 hover:bg-yellow-500 text-white py-1 px-3 rounded text-sm self-end"
                >
                  Guardar
                </button>
              </div>
            ) : (
              <>
                <span className="font-medium text-yellow-500">{telefono}</span>
                <button className="text-yellow-500" onClick={() => setEditandoCampo('telefono')}>
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
                  className="w-full border rounded p-1 text-yellow-600"
                />
                <button
                  onClick={guardarCampo}
                  className="bg-yellow-400 hover:bg-yellow-500 text-white py-1 px-3 rounded text-sm self-end"
                >
                  Guardar
                </button>
              </div>
            ) : (
              <>
                <span className="font-medium text-yellow-500">{direccion}</span>
                <button className="text-yellow-500" onClick={() => setEditandoCampo('direccion')}>
                  <Pencil size={18} />
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Panel derecho de servicios (se mantiene igual) */}
      <div className="w-full md:w-2/3 bg-blue-100 p-8">
        <h2 className="text-2xl font-semibold text-gray-600 mb-6 text-center">Servicios</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((serv, i) => (
            <div key={i} className="bg-white rounded-lg overflow-hidden shadow">
              <div className="h-40 overflow-hidden">
                <img 
                  src="/api/placeholder/300/200" 
                  alt="Servicio" 
                  className="w-full h-full object-cover"
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
                      <h3 className="font-medium text-yellow-500">Servicio {i + 1}</h3>
                    </div>
                  </div>
                  <button className="text-yellow-500">
                    <Pencil size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
