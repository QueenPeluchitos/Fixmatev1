import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from '../app/App';
import Landing from '../features/landing/Landing';
import ImgC from '../features/landing/components/ImgC';


const AppRouter = () => (
  <BrowserRouter>
    <App>
      <Routes>
        <Route path="/landing" element={<Landing />} />
        <Route path="/ImgC" element={<ImgC />} />
        {/* Otras rutas */}
      </Routes>
    </App>
  </BrowserRouter>
);

export default AppRouter;