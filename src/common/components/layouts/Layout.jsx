import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import SidebarAdmin from './sidebar_admin';
import Footer from './Footer';
import Popup from './Popup';
import { useContext } from 'react';
import { UserContext } from '../../../features/auth/context/UserContext';

const Layout = () => {
  const { user } = useContext(UserContext);
  // Si el usuario es admin, mostrar SidebarAdmin, si no Sidebar normal
  const isAdmin = user?.tipo_usuario === 'adm';

  return (
    <div className="flex flex-col min-h-screen">
      {/* Contenedor de Sidebar + Contenido */}
      <div className="flex flex-1">
        {/* Sidebar dinámico según rol */}
        {isAdmin ? <SidebarAdmin /> : <Sidebar />}

        {/* Contenido principal con scroll si es necesario */}
        <main className="flex-1 p-4 overflow-y-auto bg-gray-100">
          <Outlet />
        </main>
      </div>

      {/* Footer que se mantiene al fondo */}
      <Footer />

      {/* Popup flotante si es necesario */}
      <Popup />
    </div>
  );
};

export default Layout;
