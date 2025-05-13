import { useState } from 'react';
import { Star, ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function FursuitServiceCard() {
  const navigate = useNavigate();

  const reviews = [
    { id: 1, avatar: "👤", text: "Está bien chido", rating: 2 },
    { id: 2, avatar: "👤", text: "La tela es muy suave y es a la medida", rating: 3 },
    { id: 3, avatar: "👤", text: "Excelente calidad y atención", rating: 5 },
    { id: 4, avatar: "👤", text: "Me encantó el resultado final", rating: 4 },
    { id: 5, avatar: "👤", text: "Trabajo impecable y puntual", rating: 5 }
  ];

  const [index, setIndex] = useState(0);
  const reviewsPerPage = 2;
  const maxIndex = Math.floor((reviews.length - 1) / reviewsPerPage);

  const paginatedReviews = reviews.slice(index * reviewsPerPage, (index + 1) * reviewsPerPage);

  const BadgeImage = ({ src, alt }) => (
    <img src={src} alt={alt} className="w-10 h-10 object-contain" />
  );

  const handleHireClick = () => navigate('/cita-usuario');

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 bg-white">
      {/* Servicio */}
      <div className="grid lg:grid-cols-2 gap-10 bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
        {/* Imagen */}
        <div className="relative bg-gray-100 transition-all duration-300 hover:scale-105">
          <img
            src="https://64.media.tumblr.com/582f42c9e8808689ea2b2e99b4203f67/968e19a567dd3e64-af/s1280x1920/38ca4ef88e479ab20d77d288d0b7397e61c7a394.png"
            alt="Fursuit"
            className="object-cover h-[450px] w-full transition-all duration-300 transform hover:scale-110"
          />
          
          {/* Estrellas arriba */}
          <div className="absolute top-4 left-4 flex gap-2 animate-pulse">
            {[...Array(4)].map((_, i) => (
              <Star key={i} size={24} fill="#FFB800" stroke="#FFB800" />
            ))}
            <Star size={24} fill="none" stroke="#D1D5DB" />
          </div>

          {/* Insignias debajo de las estrellas */}
          <div className="absolute bottom-4 left-4 flex gap-2 bg-white bg-opacity-90 p-2 rounded-lg shadow-md">
            {[1, 2, 3, 4, 5].map(i => (
              <BadgeImage key={i} src={`/images/badgesfixmate${i}.png`} alt={`Insignia ${i}`} />
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="p-8 flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold text-yellow-600 mb-2">Servicio de Sastrería</h2>
            <p className="text-gray-700 text-lg mb-6">
              Ofrezco mi servicio para hacer fursuits con experiencia en diseño, confección y acabados de alta calidad.
            </p>
            <div className="bg-blue-50 p-5 rounded-xl space-y-4 shadow-sm">
              <ul className="list-disc list-inside text-gray-700 text-base space-y-1">
                <li>Fursuit completo</li>
                <li>Tela de alta calidad</li>
                <li>Patrones a la medida</li>
              </ul>
              <div>
                <p className="text-sm text-gray-500">Costo del servicio</p>
                <p className="text-3xl font-bold text-gray-900">$00.00</p>
              </div>
            </div>
          </div>

          <button
            onClick={handleHireClick}
            className="mt-8 bg-[#49568A] hover:bg-[#3b476f] text-white py-3 px-6 rounded-lg text-lg flex items-center justify-center transition-all duration-300 transform hover:scale-105"
          >
            <ShoppingCart className="mr-2" size={22} />
            Contratar
          </button>
        </div>
      </div>

      {/* Carrusel de Reseñas */}
      <div className="mt-16 px-4">
        <h3 className="text-3xl font-bold text-center text-gray-800 mb-2">Opiniones de nuestros clientes</h3>
        <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
          Lee lo que otros dicen sobre su experiencia con nuestro servicio.
        </p>

        <div className="relative">
          <div className="grid md:grid-cols-2 gap-6 transition-all duration-300">
            {paginatedReviews.map(review => (
              <div key={review.id} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                <div className="flex items-start gap-4 mb-2">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-xl">
                    {review.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={18}
                          fill={i < review.rating ? "#FFB800" : "none"}
                          stroke={i < review.rating ? "#FFB800" : "#D1D5DB"}
                        />
                      ))}
                    </div>
                    <p className="text-gray-700 italic">"{review.text}"</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Botones de navegación */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={() => setIndex(prev => Math.max(0, prev - 1))}
              disabled={index === 0}
              className="bg-gray-200 hover:bg-gray-300 p-2 rounded-full disabled:opacity-50"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => setIndex(prev => Math.min(maxIndex, prev + 1))}
              disabled={index >= maxIndex}
              className="bg-gray-200 hover:bg-gray-300 p-2 rounded-full disabled:opacity-50"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
