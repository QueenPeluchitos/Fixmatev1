import { useState } from "react";
import { AlertTriangle } from "lucide-react";

const Popup = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Icono o trigger */}
      <div
        className="bg-indigo-800 rounded-full p-3 cursor-pointer shadow-md"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <AlertTriangle className="text-yellow-400" />
      </div>

      {/* Popup */}
      {isHovered && (
        <div
          className="mt-2 w-64 p-4 rounded-xl bg-indigo-800 text-center text-yellow-400 shadow-lg transition-all duration-300"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <p className="font-semibold mb-3">¿Quieres ser parte de nuestra empresa?</p>
          <button className="bg-yellow-400 text-indigo-800 font-semibold py-2 px-4 rounded-full hover:bg-yellow-500 transition">
            Regístrate ahora
          </button>
        </div>
      )}
    </div>
  );
};

export default Popup;
