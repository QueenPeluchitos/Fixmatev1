import React, { useState } from 'react';
import { Star } from 'lucide-react';

export default function ServiceReview() {
  const [reviewText, setReviewText] = useState('');
  const [ratings, setRatings] = useState({
    punctuality: 2,
    trust: 3,
    cleanliness: 1
  });
  
  const handleReviewSubmit = () => {
    console.log('Reseña enviada:', {
      ratings,
      comment: reviewText
    });
    // Aquí iría la lógica para enviar la reseña
  };
  
  const handleAddToFavorites = () => {
    console.log('Añadido a favoritos');
    // Aquí iría la lógica para añadir a favoritos
  };
  
  // Componente para mostrar estrellas de calificación
  const RatingStars = ({ category, rating }) => {
    return (
      <div className="flex items-center justify-between">
        <span className="text-gray-700">{category}</span>
        <div className="flex">
          {[1, 2, 3].map((star) => (
            <span key={star} className="mx-0.5">
              {star <= rating ? (
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ) : (
                <Star className="w-5 h-5 fill-blue-200 text-blue-200" />
              )}
            </span>
          ))}
        </div>
      </div>
    );
  };
  
  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Columna izquierda - Imagen y calificaciones */}
        <div className="w-full md:w-1/2 space-y-8">
          {/* Imagen del servicio */}
          <div className="relative rounded-lg overflow-hidden">
            <img 
              src="/api/placeholder/600/400" 
              alt="Servicio de costura" 
              className="w-full h-64 object-cover"
            />
            
            {/* Estrellas en la esquina inferior izquierda */}
            <div className="absolute bottom-4 left-4 flex">
              <span className="text-yellow-400 text-2xl">★</span>
              <span className="text-yellow-400 text-2xl">★</span>
              <span className="text-yellow-400 text-2xl">★</span>
            </div>
            
            {/* Icono circular en la esquina inferior derecha */}
            <div className="absolute bottom-4 right-4">
              <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center overflow-hidden border-2 border-white">
                <img 
                  src="/api/placeholder/100/100" 
                  alt="Perfil"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            {/* Ícono de fuego en la esquina superior derecha */}
            <div className="absolute top-4 right-4">
              <div className="text-orange-500 text-2xl">🔥</div>
            </div>
          </div>
          
          {/* Calificaciones */}
          <div className="space-y-4 px-4">
            <RatingStars category="Puntualidad" rating={ratings.punctuality} />
            <RatingStars category="Confianza" rating={ratings.trust} />
            <RatingStars category="Limpieza" rating={ratings.cleanliness} />
          </div>
        </div>
        
        {/* Columna derecha - Formulario de reseña */}
        <div className="w-full md:w-1/2">
          <div className="bg-blue-100 p-6 rounded-lg h-full flex flex-col justify-between">
            {/* Área de texto para la reseña */}
            <div className="mb-6 flex-grow">
              <textarea
                placeholder="Escribe tu reseña aquí..."
                className="w-full h-48 p-4 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
              ></textarea>
            </div>
            
            {/* Botones de acción */}
            <div className="space-y-3">
              <button
                onClick={handleReviewSubmit}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-3 px-6 rounded-lg transition duration-300"
              >
                Reseña
              </button>
              
              <button
                onClick={handleAddToFavorites}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition duration-300"
              >
                Añadir a favoritos
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}