import React from 'react';

const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-[#49568A]">Panel de administrador</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-sm text-gray-500">Total de usuarios</p>
          <p className="text-2xl font-bold text-[#49568A]">145</p>
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-sm text-gray-500">Servicios activos</p>
          <p className="text-2xl font-bold text-[#49568A]">87</p>
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-sm text-gray-500">Reportes pendientes</p>
          <p className="text-2xl font-bold text-[#49568A]">5</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold text-[#49568A] mb-4">Resumen de actividad</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Se registraron 3 nuevos profesionistas hoy</li>
          <li>2 servicios fueron completados</li>
          <li>Se recibió 1 nueva denuncia</li>
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;