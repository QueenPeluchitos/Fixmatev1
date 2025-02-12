import PropTypes from 'prop-types';
const App = ({ children }) => (
  <div className="min-h-screen flex flex-col">

    <main className="flex-grow">
      {children}
    </main>

  </div>
);

App.propTypes = {
  children: PropTypes.node.isRequired,
};

export default App;