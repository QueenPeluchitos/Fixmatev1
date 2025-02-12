import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from '../app/App';
import Landing from '../features/landing/Landing';


const AppRouter = () => (
  <BrowserRouter>
    <App>
      <Routes>
        <Route path="/landing" element={<Landing />} />
        {/* Otras rutas */}
      </Routes>
    </App>
  </BrowserRouter>
);

export default AppRouter;