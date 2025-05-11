import { useState } from 'react';
import { Star, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate de react-router-dom

export default function FursuitServiceCard() {
  const [showAllReviews, setShowAllReviews] = useState(false);
  const navigate = useNavigate(); // Inicializa el navigate

  const reviews = [
    { id: 1, avatar: "👤", text: "Está bien chido", rating: 2 },
    { id: 2, avatar: "👤", text: "La tela es muy suave y es a la medida", rating: 3 },
    { id: 3, avatar: "👤", text: "Excelente calidad y atención", rating: 5 },
    { id: 4, avatar: "👤", text: "Me encantó el resultado final", rating: 4 }
  ];

  const displayedReviews = showAllReviews ? reviews : reviews.slice(0, 2);

  const BadgeImage = ({ src, alt }) => (
    <div className="w-16 h-16 flex items-center justify-center"> {/* Aumentado el tamaño de la caja */}
      <img src={src} alt={alt} className="w-14 h-14 object-contain" /> {/* Aumentado el tamaño de la imagen */}
    </div>
  );

  // Función para manejar el clic en el botón "Contratar"
  const handleHireClick = () => {
    navigate('/cita-usuario'); // Redirige a la ruta /cita-usuario usando React Router
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          {/* Left column with image */}
          <div className="lg:w-2/5 relative">
            <img
              src="https://64.media.tumblr.com/582f42c9e8808689ea2b2e99b4203f67/968e19a567dd3e64-af/s1280x1920/38ca4ef88e479ab20d77d288d0b7397e61c7a394.png"
              alt="Taller de sastrería para fursuits"
              className="w-full h-80 object-cover rounded-lg mt-12" // Agregado mt-12 para darle un margen superior
            />
            <div className="absolute bottom-3 left-3 flex space-x-2">
              <BadgeImage src="/images/badgesfixmate1.png" alt="Insignia 1" />
              <BadgeImage src="/images/badgesfixmate2.png" alt="Insignia 2" />
              <BadgeImage src="/images/badgesfixmate3.png" alt="Insignia 3" />
              <BadgeImage src="/images/badgesfixmate4.png" alt="Insignia 4" />
              <BadgeImage src="/images/badgesfixmate5.png" alt="Insignia 5" />
            </div>
          </div>


          {/* Right column with info */}
          <div className="lg:w-3/5 p-6">
            <h2 className="text-3xl font-bold text-yellow-600 mb-4">Servicio de Sastrería</h2>
            <p className="text-lg text-gray-700 mb-6">
              Ofrezco mi servicio para hacer fursuits con experiencia en diseño, confección y acabados de alta calidad.
            </p>

            <div className="bg-blue-100 p-6 rounded-lg mb-6">
              <ul className="list-disc list-inside text-gray-700 text-lg">
                <li>Fursuit completo</li>
                <li>Tela de alta calidad</li>
                <li>Patrones a la medida</li>
              </ul>

              <div className="mt-6">
                <p className="text-xl text-gray-500">Costo del servicio</p>
                <p className="text-2xl font-bold text-gray-900">$00.00</p>
              </div>

              <button
                className="mt-6 bg-yellow-500 hover:bg-yellow-600 text-white py-3 px-6 rounded-lg w-full flex items-center justify-center text-lg"
                onClick={handleHireClick} // Llama la función al hacer clic
              >
                <ShoppingCart className="mr-3" size={22} />
                Contratar
              </button>
            </div>
          </div>
        </div>

        {/* Reviews section */}
        <div className="p-6 border-t border-gray-200">
          <h3 className="text-2xl font-bold text-center mb-6">Reseñas</h3>

          <div className="bg-blue-50 p-6 rounded-lg">
            {displayedReviews.map(review => (
              <div key={review.id} className="flex items-center mb-6 pb-4 border-b border-gray-200 last:border-b-0">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                  {review.avatar}
                </div>
                <div className="flex-1">
                  <p className="text-lg text-gray-700">{review.text}</p>
                  <div className="flex mt-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={20}
                        fill={i < review.rating ? "#FFB800" : "none"}
                        stroke={i < review.rating ? "#FFB800" : "#D1D5DB"}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}

            {reviews.length > 2 && (
              <button
                className="text-blue-500 hover:text-blue-700 text-lg w-full text-center mt-4"
                onClick={() => setShowAllReviews(!showAllReviews)}
              >
                {showAllReviews ? "Ver menos" : "Ver más"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
