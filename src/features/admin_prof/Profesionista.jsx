import React, { useState, useEffect } from 'react';

const AdminProf = () => {
  const [professionals, setProfessionals] = useState([]);
  const [activeDetail, setActiveDetail] = useState(null);
  const [activeTab, setActiveTab] = useState('Pendientes');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfessionals = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('/api/auth/admin/profesionistas');
        if (!res.ok) throw new Error('Error al obtener profesionistas');
        const data = await res.json();
        setProfessionals(data.profesionistas || data);
      } catch (err) {
        setError('No se pudieron cargar los profesionistas.');
      } finally {
        setLoading(false);
      }
    };
    fetchProfessionals();
  }, []);

  const defaultBadges = {
    'Confiabilidad Garantizada': true,
    'Trabajo Impecable': true,
    'Proveedor Top FixMate': true,
    'Cero Cancelaciones': true
  };

  const [badgesState, setBadgesState] = useState(
    Object.fromEntries(professionals.map(p => [p.id, { ...defaultBadges }]))
  );

  const toggleDetails = (id) => {
    setActiveDetail(activeDetail === id ? null : id);
    setActiveTab('Pendientes');
  };
  const closeDetails = () => setActiveDetail(null);
  const getProfessional = id => professionals.find(p => p.id === id);
  const toggleBadge = (profId, badge) => {
    setBadgesState(prev => ({
      ...prev,
      [profId]: {
        ...prev[profId],
        [badge]: !prev[profId][badge]
      }
    }));
  };

  const renderDocumentsView = () => (
    <div className="bg-white rounded-xl shadow p-8">
      <h2 className="text-2xl font-light text-gray-800 mb-6 text-center">
        Verificación de documentos
      </h2>
      <div className="flex justify-center items-center gap-6 mb-8">
        <div className="text-center">
          <img
            src={getProfessional(activeDetail).photo}
            alt="avatar"
            className="w-20 h-20 rounded-full mx-auto mb-2"
          />
          <div className="text-gray-700 font-medium">
            {getProfessional(activeDetail).name}
          </div>
          <div className="text-gray-500 text-sm">ID: 000{activeDetail}</div>
        </div>
        <div className="ml-auto text-gray-600 italic">En revisión</div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        {['Título profesional','INE','CURP','Comprobante de domicilio'].map(doc => (
          <div key={doc} className="flex flex-col items-center">
            <div className="w-32 h-40 bg-gray-100 rounded-lg shadow-inner flex items-center justify-center">
              <svg
                className="w-8 h-8 text-gray-300"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" />
              </svg>
            </div>
            <div className="mt-2 text-sm text-gray-700">{doc}</div>
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center mb-8">
        <span className="text-purple-500 font-medium mr-4">Identificación biométrica</span>
        <span className="px-3 py-1 bg-green-200 text-green-800 rounded-full text-sm">
          Aprobada
        </span>
      </div>

      <div className="flex justify-center gap-6">
        <button
          className="px-6 py-2 bg-green-200 text-green-800 rounded-lg font-medium"
          onClick={() => alert('Aprobado')}
        >
          Aprobar
        </button>
        <button
          className="px-6 py-2 bg-red-200 text-red-800 rounded-lg font-medium"
          onClick={() => alert('Rechazado')}
        >
          Rechazar
        </button>
      </div>
    </div>
  );

  const renderPendientesView = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
      {/* Izquierda: datos del profesionista */}
      <div className="flex flex-col items-center">
        <img
          src={getProfessional(activeDetail).photo}
          alt=""
          className="w-32 h-32 rounded-full mb-5 border-4 border-gray-200 object-cover"
        />
        <h3 className="text-2xl font-semibold text-gray-800 mb-1">
          {getProfessional(activeDetail).name}
        </h3>
        <p className="text-gray-600 mb-4">
          {getProfessional(activeDetail).specialty}, {getProfessional(activeDetail).rating} ⭐
        </p>

        <div className="w-full text-left">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">Datos de profesionista</h4>
          <div className="space-y-3 text-sm text-gray-600">
            <div>
              <span className="font-semibold text-gray-800">ID:</span> 000{activeDetail}
            </div>
            <div>
              <span className="font-semibold text-gray-800">Nombre:</span> {getProfessional(activeDetail).name}
            </div>
            <div>
              <span className="font-semibold text-gray-800">Especialidad:</span> {getProfessional(activeDetail).specialty}
            </div>
          </div>

          <div className="mt-6 space-y-3">
            {['punctuality','cleanliness','trust','cancellations'].map(key => (
              <div key={key} className="flex justify-between">
                <span className="font-medium text-gray-600">Reseñas de {key}</span>
                <span className="font-semibold text-gray-800">
                  {getProfessional(activeDetail).ratings[key]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Derecha: tarjeta de negocio + insignias */}
      <div className="space-y-5">
        <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-4 rounded-xl flex items-center gap-4">
          <img
            src={getProfessional(activeDetail).photo}
            alt=""
            className="w-16 h-16 rounded-full border-2 border-white"
          />
          <div>
            <div className="text-blue-700 font-bold text-lg">
              {getProfessional(activeDetail).businessName}
            </div>
            <div className="text-gray-600 text-sm">{getProfessional(activeDetail).businessType}</div>
            <div className="text-gray-500 text-xs">{getProfessional(activeDetail).businessSpecialty}</div>
            <div className="text-gray-500 text-xs mt-1">Teléfono: 55xxxxxxx</div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 flex justify-between">
          <div>
            <div className="text-gray-800 font-semibold text-sm">
              ID: 000{activeDetail}
            </div>
            <div className="text-gray-600 text-xs mt-1">
              Profesionista Certificado
            </div>
          </div>
          <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center text-[8px] font-mono leading-none">
            ▀▀▀▀▀▀▀<br/>
            ▀░░▀░▀▀<br/>
            ▀▀░░░▀▀<br/>
            ░▀▀▀▀░▀<br/>
            ▀▀▀▀▀▀▀
          </div>
        </div>
        <div className="space-y-3">
          {Object.entries(badgesState[activeDetail]).map(([badge, active]) => (
            <div key={badge} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
              <span className="font-medium text-gray-800">{badge}</span>
              <button
                onClick={() => toggleBadge(activeDetail, badge)}
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  active ? 'bg-yellow-400 text-gray-800' : 'bg-gray-300 text-gray-600'
                }`}
              >
                {active ? 'Activo' : 'Inactivo'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const professionalsAdapted = professionals.map(p => ({
    id: p._id || p.id,
    name: (p.nombre ? (p.apellido ? `${p.nombre} ${p.apellido}` : p.nombre) : p.name),
    specialty: p.especialidad || (p.perfil && p.perfil.especialidad) || p.specialty || '-',
    rating: p.rating || '-',
    photo: p.foto || p.photo || 'https://randomuser.me/api/portraits/lego/2.jpg',
    businessName: p.nombre_negocio || p.businessName || '-',
    businessType: p.tipo_negocio || p.businessType || '-',
    businessSpecialty: p.especialidad_negocio || p.businessSpecialty || '-',
    ratings: {
      punctuality: p.puntualidad || '-',
      cleanliness: p.limpieza || '-',
      trust: p.confianza || '-',
      cancellations: p.cancelaciones || '-',
    },
  }));

  const filtrados = professionalsAdapted.filter(p =>
    p.name && p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto p-5 bg-gray-50 min-h-screen">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-light text-gray-800 mb-5">Profesionistas</h1>
        <input
          type="text"
          placeholder="Busca por nombre o profesión"
          className="bg-blue-100 rounded-lg px-4 py-3 w-full max-w-2xl text-gray-600"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      {loading ? (
        <div className="text-center py-10 text-gray-500">Cargando profesionistas...</div>
      ) : error ? (
        <div className="text-center py-10 text-red-500">{error}</div>
      ) : (
        <div className="bg-white rounded-xl shadow mb-5">
          <table className="w-full text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 font-semibold text-gray-600">#</th>
                <th className="px-6 py-3 font-semibold text-gray-600">Nombre</th>
                <th className="px-6 py-3 font-semibold text-gray-600">Especialidad</th>
                <th className="px-6 py-3 font-semibold text-gray-600">Calificación</th>
                <th className="px-6 py-3 font-semibold text-gray-600">Acción</th>
              </tr>
            </thead>
            <tbody>
              {filtrados.map((p, idx) => (
                <tr key={p.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">{idx + 1}</td>
                  <td className="px-6 py-4 underline text-black font-medium">{p.name}</td>
                  <td className="px-6 py-4 text-gray-600">{p.specialty}</td>
                  <td className="px-6 py-4 text-blue-600 font-medium">{p.rating}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => toggleDetails(p.id)}
                      className="underline text-black text-sm"
                    >
                      Ver detalles
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {/* Modal */}
      {activeDetail && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl p-8 relative animate-in slide-in-from-top duration-300 overflow-auto max-h-full">
            <button
              className="absolute top-4 right-4 text-gray-600 text-2xl"
              onClick={closeDetails}
            >
              ×
            </button>

            {/* Pestañas */}
            <div className="flex justify-center gap-4 mb-6">
              {['Documentos','Pendientes'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-2 rounded-full font-medium ${
                    activeTab === tab
                      ? tab === 'Documentos'
                        ? 'bg-gray-100 text-gray-800'
                        : 'bg-yellow-400 text-gray-800'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Contenido */}
            {activeTab === 'Documentos'
              ? renderDocumentsView()
              : renderPendientesView()}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProf;