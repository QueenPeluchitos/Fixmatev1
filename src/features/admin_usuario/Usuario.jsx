import React, { useState, useEffect } from 'react';

const UsuariosAdmin = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [activeUser, setActiveUser] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsuarios = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/auth/admin/users");
        console.log('Respuesta fetch:', res);
        if (!res.ok) throw new Error("Error al obtener usuarios");
        const data = await res.json();
        console.log('Usuarios recibidos:', data);
        setUsuarios(data.usuarios || data);
      } catch (err) {
        setError("No se pudieron cargar los usuarios.");
        console.error('Error al cargar usuarios:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsuarios();
  }, []);

  // Adaptar datos para la tabla y el modal
  const adaptUsuario = (u) => ({
    id: u._id || u.id,
    name: (u.nombre ? (u.apellido ? `${u.nombre} ${u.apellido}` : u.nombre) : u.name),
    nextCita: u.nextCita || "-", // Si no hay campo, mostrar '-'
    rating: u.rating || "-",
    reseña: u.reseña || "-",
    foto: u.foto || "https://randomuser.me/api/portraits/lego/1.jpg",
    perfil: {
      id: u._id || u.id,
      nombre: (u.nombre ? (u.apellido ? `${u.nombre} ${u.apellido}` : u.nombre) : u.name),
      email: u.email,
      emergencia: u.contacto_emergencia || "-",
      telefono: u.telefono || "-",
      direccion: u.direccion || "-",
      fechaRegistro: u.fecha_registro || "-",
      ultimoAcceso: u.ultimo_acceso || "-",
      citas: {
        total: u.citas_total || "-",
        completadas: u.citas_completadas || "-",
        canceladas: u.citas_canceladas || "-",
        topProfesiones: u.top_profesiones || [],
      },
      reseñas: {
        puntualidad: u.puntualidad || "-",
        calidad: u.calidad || "-",
        confianza: u.confianza || "-",
        comentarios: u.comentarios || "-",
      },
    },
  });

  const usuariosAdaptados = usuarios.map(adaptUsuario);

  const filtrados = usuariosAdaptados.filter((u) =>
    u.name && u.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Cabecera y buscador */}
      <h1 className="text-3xl text-center font-light mb-6 text-gray-800">
        Usuarios
      </h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Busca por nombre o profesión"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-gray-100 rounded-lg px-4 py-2 text-gray-600 placeholder-gray-400"
        />
      </div>
      {loading ? (
        <div className="text-center py-10 text-gray-500">
          Cargando usuarios...
        </div>
      ) : error ? (
        <div className="text-center py-10 text-red-500">{error}</div>
      ) : (
        /* Tabla */
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 font-semibold text-gray-600">#</th>
                <th className="px-6 py-3 font-semibold text-gray-600">Nombre</th>
                <th className="px-6 py-3 font-semibold text-gray-600">Citas</th>
                <th className="px-6 py-3 font-semibold text-gray-600">Reseñas</th>
                <th className="px-6 py-3 font-semibold text-gray-600">Reportes</th>
              </tr>
            </thead>
            <tbody>
              {filtrados.map((u, idx) => (
                <tr key={u.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4">{idx + 1}</td>
                  <td className="px-6 py-4">{u.name}</td>
                  <td className="px-6 py-4">{u.nextCita}</td>
                  <td className="px-6 py-4">
                    <span className="text-yellow-500">★ {u.rating}</span> “{u.reseña}”
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => setActiveUser(u)}
                      className="px-4 py-1 bg-blue-100 text-blue-800 rounded-lg text-sm hover:bg-blue-200"
                    >
                      Revisar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Perfil desplegable */}
      {activeUser && (
        <div className="fixed inset-0 z-50 bg-white/70 flex justify-center items-center p-4 transition-all duration-300">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl p-8 relative animate-in slide-in-from-top duration-300 overflow-auto max-h-[90vh] border border-gray-200">
            {/* Botón cerrar */}
            <button
              onClick={() => setActiveUser(null)}
              className="absolute top-5 right-5 text-gray-500 text-2xl hover:text-gray-700 focus:outline-none"
              aria-label="Cerrar modal"
            >
              ×
            </button>

            <h2 className="text-2xl font-light text-center text-gray-800 mb-6">
              Perfil de Usuario
            </h2>
            <div className="flex flex-col md:flex-row gap-8">
              {/* Izquierda */}
              <div className="flex-shrink-0 text-center md:text-left">
                <img
                  src={activeUser.foto}
                  alt="Foto de usuario"
                  className="w-24 h-24 rounded-full mx-auto md:mx-0 mb-4 border-4 border-blue-100 shadow"
                />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {activeUser.perfil.nombre}
                </h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>
                    <span className="font-semibold">ID de usuario:</span>{' '}
                    {activeUser.perfil.id}
                  </li>
                  <li>
                    <span className="font-semibold">Correo:</span>{' '}
                    {activeUser.perfil.email}
                  </li>
                  <li>
                    <span className="font-semibold">Emergencia:</span>{' '}
                    {activeUser.perfil.emergencia}
                  </li>
                  <li>
                    <span className="font-semibold">Teléfono:</span>{' '}
                    {activeUser.perfil.telefono}
                  </li>
                  <li>
                    <span className="font-semibold">Dirección:</span>{' '}
                    {activeUser.perfil.direccion}
                  </li>
                  <li>
                    <span className="font-semibold">Registro:</span>{' '}
                    {activeUser.perfil.fechaRegistro}
                  </li>
                  <li>
                    <span className="font-semibold">Último acceso:</span>{' '}
                    {activeUser.perfil.ultimoAcceso}
                  </li>
                </ul>
              </div>
              {/* Derecha */}
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">
                    Citas realizadas:
                  </h4>
                  <ul className="text-gray-600 text-sm space-y-1 list-disc list-inside">
                    <li>
                      Total de servicios solicitados: {activeUser.perfil.citas.total}
                    </li>
                    <li>
                      Servicios completados:{' '}
                      {activeUser.perfil.citas.completadas}
                    </li>
                    <li>
                      Servicios cancelados: {activeUser.perfil.citas.canceladas}
                    </li>
                    <li>
                      Profesiones más solicitadas:{' '}
                      {Array.isArray(activeUser.perfil.citas.topProfesiones)
                        ? activeUser.perfil.citas.topProfesiones.join(', ')
                        : '-'
                      }
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">
                    Reseñas dejadas:
                  </h4>
                  <ul className="text-gray-600 text-sm space-y-1 list-disc list-inside">
                    <li>
                      Puntualidad promedio:{' '}
                      {activeUser.perfil.reseñas.puntualidad}/5
                    </li>
                    <li>
                      Calidad del servicio: {activeUser.perfil.reseñas.calidad}/5
                    </li>
                    <li>
                      Confianza y trato: {activeUser.perfil.reseñas.confianza}/5
                    </li>
                    <li>
                      Comentarios escritos: {activeUser.perfil.reseñas.comentarios}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsuariosAdmin;