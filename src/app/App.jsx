import PropTypes from 'prop-types';
import Sidebar from '../common/components/layouts/Sidebar';
const App = ({ children }) => (
  <div className="min-h-screen flex flex-col">
    <div className="flex flex-1">
      {/* Sidebar */}
      <Sidebar />
      {/* Main Content */}
      <main className="flex-1 overflow-x-hidden p-4">
        {children}
      </main>
    </div>
    {/* Footer */}
    <Footer />
  </div>
);

App.propTypes = {
  children: PropTypes.node.isRequired,
};

export default App;
