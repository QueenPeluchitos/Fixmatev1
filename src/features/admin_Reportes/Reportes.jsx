import { useState } from "react";

const adminReportes = () => {
  const [reporteSeleccionado, setReporteSeleccionado] = useState(null);

  const reportes = [
    {
      id: 1,
      fecha: "Hoy, 2:00 PM",
      cliente: "Katie G.",
      profesionista: "Katie",
      direccion: "123 Main St",
      estatus: "Completado",
      detalles: "Servicio de plomería a domicilio",
      usuario: "Juan Pérez",
      email: "JuanP@gmail.com",
      profesionistaNombre: "Sarah Johnson",
      categorias: ["Impuntualidad", "Servicio incompleto"],
      comentario: "Comentario placeholder sobre el reporte del servicio.",
      costo: "$450 MXN"
    },
    {
      id: 2,
      fecha: "Hoy, 3:00 PM",
      cliente: "Sara H.",
      profesionista: "Sara",
      direccion: "234 Elm St",
      estatus: "Completado",
      detalles: "Servicio eléctrico",
      usuario: "Luis Rojas",
      email: "LuisR@gmail.com",
      profesionistaNombre: "Carlos Méndez",
      categorias: ["Trabajo incompleto"],
      comentario: "No finalizó la instalación correctamente.",
      costo: "$300 MXN"
    },
    {
      id: 3,
      fecha: "Mañana, 11:00 AM",
      cliente: "Mike J.",
      profesionista: "Mike",
      direccion: "345 Oak St",
      estatus: "Completado",
      detalles: "Servicio de limpieza",
      usuario: "Ana López",
      email: "AnaL@gmail.com",
      profesionistaNombre: "Martha Ruiz",
      categorias: ["Falta de insumos"],
      comentario: "No trajo los materiales necesarios.",
      costo: "$250 MXN"
    }
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto transition-opacity duration-500 ease-in-out">
      <h1 className="text-3xl font-bold text-center mb-6">Reportes</h1>

      {/* Lista de reportes */}
      <div className={`${reporteSeleccionado ? 'hidden' : 'block'} transition-all duration-500`}>
        <h2 className="text-xl font-semibold mb-4">Lista de reportes recibidos</h2>
        <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-md">
          <table className="min-w-full text-left">
            <thead className="bg-gray-50">
              <tr className="text-gray-700">
                <th className="px-6 py-3 font-medium">Fecha</th>
                <th className="px-6 py-3 font-medium">Cliente</th>
                <th className="px-6 py-3 font-medium">Profesionista</th>
                <th className="px-6 py-3 font-medium">Dirección</th>
                <th className="px-6 py-3 font-medium">Estatus</th>
                <th className="px-6 py-3 font-medium">Acción</th>
              </tr>
            </thead>
            <tbody>
              {reportes.map((reporte) => (
                <tr key={reporte.id} className="border-b hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm">{reporte.fecha}</td>
                  <td className="px-6 py-4 text-sm">{reporte.cliente}</td>
                  <td className="px-6 py-4 text-sm">{reporte.profesionista}</td>
                  <td className="px-6 py-4 text-sm">{reporte.direccion}</td>
                  <td className="px-6 py-4">
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                      {reporte.estatus}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      className="text-indigo-600 text-sm font-medium hover:underline"
                      onClick={() => setReporteSeleccionado(reporte)}
                    >
                      Ver detalles
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detalles del reporte */}
      <div
        className={`transition-all duration-500 ${reporteSeleccionado ? 'block opacity-100' : 'hidden opacity-0'} mt-6`}
      >
        {reporteSeleccionado && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <button
              onClick={() => setReporteSeleccionado(null)}
              className="mb-4 text-indigo-600 hover:underline"
            >
              ← Volver a la lista
            </button>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex flex-col items-center">
                <img
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  alt="Usuario"
                  className="w-24 h-24 rounded-full"
                />
                <h3 className="mt-2 font-semibold">{reporteSeleccionado.usuario}</h3>
                <p className="text-sm text-gray-600">{reporteSeleccionado.email}</p>
                <button className="mt-2 bg-yellow-300 hover:bg-yellow-400 px-3 py-1 rounded text-sm">
                  Contactar
                </button>
              </div>
              <div className="flex-1">
                <div className="mb-4">
                  <span className="text-sm font-semibold text-indigo-600">Reporte</span>
                  <span className="ml-2 px-3 py-1 bg-yellow-200 rounded-full text-xs">Pendiente</span>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-lg font-bold text-yellow-600">{reporteSeleccionado.detalles}</h4>
                  <p className="text-sm text-gray-700 mt-2">
                    Ofrecemos reparación de fugas, instalación y mantenimiento de grifos y sistemas hidráulicos.
                  </p>
                  <p className="text-sm text-gray-700 mt-1">
                    <span className="font-semibold">Costo:</span> {reporteSeleccionado.costo}
                  </p>
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold">Realizado por:</span> {reporteSeleccionado.usuario}
                  </p>
                </div>
                <div className="mt-4">
                  <h5 className="font-semibold text-purple-700">Reporte</h5>
                  <div className="flex gap-2 mt-2 flex-wrap">
                    {reporteSeleccionado.categorias.map((cat, i) => (
                      <span
                        key={i}
                        className="bg-purple-200 text-purple-700 px-3 py-1 rounded-full text-xs font-medium"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4">
                    <textarea
                      value={reporteSeleccionado.comentario}
                      readOnly
                      className="w-full p-4 border border-gray-300 rounded-lg"
                      rows={4}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default adminReportes;
