import { useState, useContext } from "react";
import { AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";  // Importa el Link desde react-router-dom
import { UserContext } from "../../../features/auth/context/UserContext";

const Popup = () => {
  const [isHovered, setIsHovered] = useState(false);
  const { user } = useContext(UserContext);

  // Si el usuario es profesionista, no mostrar el popup
  if (user && user.tipo_usuario === "prof") return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`relative bg-[#49568A] text-[#E5A800] shadow-2xl backdrop-blur-md cursor-pointer overflow-hidden
        flex items-center justify-center px-6
        transition-all duration-700 ease-in-out
        ${isHovered ? "w-80 h-48 rounded-3xl" : "w-16 h-16 rounded-full"}`}
      >
        {/* Icono visible solo cuando está cerrado */}
        {!isHovered && (
          <AlertTriangle
            className="absolute text-[#E5A800] transition-opacity duration-500"
            size={28}
          />
        )}

        {/* Contenido visible solo cuando está abierto */}
        {isHovered && (
          <div className="text-center w-full opacity-100 transition-opacity duration-700">
            <p className="text-md font-medium mb-3 leading-snug text-white">
              ¿Quieres formar parte de nuestro equipo?
            </p>
            <Link to="/registro-profesionista">
              <button className="bg-[#E5A800] text-[#49568A] font-semibold py-2 px-4 rounded-full shadow hover:bg-yellow-500 transition duration-300">
                ¡Regístrate ahora!
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Popup;
