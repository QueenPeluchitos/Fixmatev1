import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Footer from './Footer';
import Popup from './Popup';

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Contenedor de Sidebar + Contenido */}
      <div className="flex flex-1">
        {/* Sidebar que se ajusta automáticamente a la altura del contenido, incluido el footer */}
        <Sidebar />

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
