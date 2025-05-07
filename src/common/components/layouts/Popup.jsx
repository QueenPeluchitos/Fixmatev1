const Popup = () => {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <div className="w-64 p-4 rounded-xl bg-indigo-800 text-center text-yellow-400 shadow-lg">
          <p className="font-semibold mb-3">
            ¿Quieres ser parte de nuestra empresa?
          </p>
          <button className="bg-yellow-400 text-indigo-800 font-semibold py-2 px-4 rounded-full hover:bg-yellow-500 transition">
            Regístrate ahora
          </button>
        </div>
      </div>
    );
  };
  
  export default Popup;
  