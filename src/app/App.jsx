import PropTypes from 'prop-types';
import Header from '../common/components/layouts/Header';
import Landing from '../features/landing/Landing';
import ImgC from '../features/landing/components/ImgC';
import Footer from '../common/components/layouts/Footer';
const App = ({ children }) => (
  <div className="min-h-screen flex flex-col">

    <main className="flex-grow">
      {children}
      <Header /> {Header}
      <ImgC /> {ImgC}
      <Landing /> {Landing}
      <Footer /> {Footer}
    </main>

  </div>
);

App.propTypes = {
  children: PropTypes.node.isRequired,
};

export default App;