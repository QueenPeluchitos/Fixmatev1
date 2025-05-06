import { useState } from 'react';
import { Star, ShoppingCart } from 'lucide-react';

export default function ServicioUsuario() {
  const [showAllReviews, setShowAllReviews] = useState(false);
  
  const reviews = [
    { id: 1, avatar: "👤", text: "Está bien chido", rating: 2 },
    { id: 2, avatar: "👤", text: "La tela es muy suave y es a la medida", rating: 3 },
    { id: 3, avatar: "👤", text: "Excelente calidad y atención", rating: 5 },
    { id: 4, avatar: "👤", text: "Me encantó el resultado final", rating: 4 }
  ];

  const displayedReviews = showAllReviews ? reviews : reviews.slice(0, 2);

  const BadgeIcon = ({ color }) => (
    <div className={`w-8 h-10 flex items-center justify-center ${color}`}>
      <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
        <span className="text-xs">🐾</span>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Left column with image */}
          <div className="md:w-2/5 relative">
            <img 
              src="/api/placeholder/400/320" 
              alt="Taller de sastrería para fursuits" 
              className="w-full h-64 object-cover"
            />
            <div className="absolute bottom-2 left-2 flex space-x-1">
              <div className="w-8 h-10 bg-red-500 rounded-t-full flex items-center justify-center">
                <div className="w-6 h-6 bg-yellow-400 rounded-full"></div>
              </div>
              <div className="w-8 h-10 bg-blue-500 rounded-t-full flex items-center justify-center">
                <div className="w-6 h-6 bg-yellow-400 rounded-full"></div>
              </div>
              <div className="w-8 h-10 bg-red-500 rounded-t-full flex items-center justify-center">
                <div className="w-6 h-6 bg-yellow-400 rounded-full"></div>
              </div>
              <div className="w-8 h-10 bg-yellow-500 rounded-t-full flex items-center justify-center">
                <div className="w-6 h-6 bg-yellow-400 rounded-full"></div>
              </div>
              <div className="w-8 h-10 bg-pink-300 rounded-t-full flex items-center justify-center">
                <div className="w-6 h-6 bg-yellow-400 rounded-full"></div>
              </div>
            </div>
          </div>
          
          {/* Right column with info */}
          <div className="md:w-3/5 p-4">
            <h2 className="text-2xl font-bold text-yellow-600 mb-2">Servicio de sastrería</h2>
            
            <p className="text-gray-600 mb-4">
              Ofrezco mi servicio para hacer fursuits con experiencia en 
              diseño, confección y acabados de alta calidad.
            </p>
            
            <div className="bg-blue-100 p-4 rounded-md mb-4">
              <ul className="list-disc list-inside text-gray-700">
                <li>Fursuit completo</li>
                <li>Tela de alta calidad</li>
                <li>Patrones a la medida</li>
              </ul>
              
              <div className="mt-4">
                <p className="text-gray-500">Costo del servicio</p>
                <p className="text-xl font-bold">$00.00</p>
              </div>
              
              <button className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-md w-full flex items-center justify-center">
                <ShoppingCart className="mr-2" size={20} />
                Contratar
              </button>
            </div>
          </div>
        </div>
        
        {/* Reviews section */}
        <div className="p-4 border-t">
          <h3 className="text-xl font-bold text-center mb-4">Reseñas</h3>
          
          <div className="bg-blue-50 p-4 rounded-md">
            {displayedReviews.map(review => (
              <div key={review.id} className="flex items-center mb-3 pb-3 border-b border-gray-200 last:border-b-0">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                  {review.avatar}
                </div>
                <div className="flex-1">
                  <p className="text-gray-700">{review.text}</p>
                  <div className="flex mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
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
                className="text-blue-500 hover:text-blue-700 text-sm w-full text-center mt-2"
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