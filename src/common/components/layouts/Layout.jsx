import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Footer from './Footer';
import Popup from './Popup';

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1">
        {/* Sidebar fijo y alto completo */}
        <div className="h-full">
          <Sidebar />
        </div>

        {/* Contenido principal */}
        <main className="flex-grow p-4 overflow-y-auto">
          <Outlet />
        </main>
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
          <Popup />
        </div>
      </div>

      {/* Footer fuera del scroll principal */}
      <Footer />
    </div>


  );
};

export default Layout;