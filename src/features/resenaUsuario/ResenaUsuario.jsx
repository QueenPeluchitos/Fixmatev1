import React, { useState, useEffect } from 'react';
import { Star, Flame } from 'lucide-react';

export default function ReseñaUsuario() {
  const [reviewText, setReviewText] = useState('');
  const [ratings, setRatings] = useState({
    puntualidad: 0,
    confianza: 0,
    limpieza: 0
  });
  const [submitted, setSubmitted] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setFadeIn(true);
  }, []);

  const handleRatingChange = (category, value) => {
    setRatings((prev) => ({
      ...prev,
      [category]: value
    }));
  };

  const handleReviewSubmit = () => {
    const mensajePorDefecto = 'El usuario no escribió comentarios adicionales.';
    const comentarioFinal = reviewText.trim() === '' ? mensajePorDefecto : reviewText;

    console.log('Reseña enviada:', {
      ratings,
      comment: comentarioFinal
    });

    // Mensaje de confirmación nativo del navegador
    window.alert('¡Gracias por tu reseña!\n\nComentario: ' + comentarioFinal);

    // Puedes quitar setSubmitted(true) si no quieres cambiar estado
    setSubmitted(true);
  };

  const handleAddToFavorites = () => {
    console.log('Añadido a favoritos');
  };

  const RatingStars = ({ category, label }) => {
    return (
      <div className="flex items-center justify-between transition-all duration-300">
        <span className="text-gray-700 text-sm font-medium">{label}</span>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => handleRatingChange(category, value)}
              className="focus:outline-none transition-transform duration-200 hover:scale-110"
            >
              <Star
                className={`w-6 h-6 ${
                  ratings[category] >= value ? 'text-yellow-400' : 'text-gray-300'
                } transition-colors duration-300`}
                strokeWidth={1.5}
                fill={ratings[category] >= value ? 'currentColor' : 'none'}
              />
            </button>
          ))}
        </div>
      </div>
    );
  };

  const calcularPromedio = () => {
    const valores = Object.values(ratings);
    const suma = valores.reduce((acc, val) => acc + val, 0);
    return valores.length ? (suma / valores.length).toFixed(1) : '0.0';
  };

  return (
    <div
      className={`max-w-5xl mx-auto p-6 space-y-8 transition-opacity duration-700 ease-out ${
        fadeIn ? 'opacity-100' : 'opacity-0'
      } bg-white`}
    >
      <h1 className="text-3xl font-bold text-[#E5A800] text-center">Reseña del Servicio</h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Columna izquierda - imagen y calificación */}
        <div className="w-full md:w-1/2 space-y-6">
          <div className="relative rounded-xl overflow-hidden shadow-lg transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:translate-y-2">
            <img src="/api/placeholder/600/400" alt="Servicio" className="w-full h-64 object-cover" />
            <div className="absolute bottom-4 left-4 flex gap-1 text-yellow-400 text-xl">
              {[...Array(Math.round(calcularPromedio()))].map((_, i) => (
                <span key={i}>★</span>
              ))}
            </div>
            <div className="absolute bottom-4 right-4 w-12 h-12 rounded-full overflow-hidden border-2 border-white bg-white">
              <img src="/api/placeholder/100/100" alt="Perfil" className="w-full h-full object-cover" />
            </div>
            <div className="absolute top-4 right-4">
              <Flame className="text-[#E5A800] w-6 h-6 animate-pulse" />
            </div>
          </div>

          <div className="bg-[#f9fafb] rounded-lg p-4 space-y-3 shadow-md transition-all duration-300 hover:shadow-2xl hover:scale-105">
            <RatingStars category="puntualidad" label="Puntualidad" />
            <RatingStars category="confianza" label="Confianza" />
            <RatingStars category="limpieza" label="Limpieza" />
            <div className="flex items-center justify-between pt-2 border-t mt-2 text-sm text-gray-600">
              <span>Promedio general</span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      calcularPromedio() >= i ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                    strokeWidth={1.5}
                    fill={calcularPromedio() >= i ? 'currentColor' : 'none'}
                  />
                ))}
                <span className="ml-2 font-semibold">{calcularPromedio()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Columna derecha - reseña */}
        <div className="w-full md:w-1/2">
          <div className="bg-[#e3e8ff] p-6 rounded-xl h-full flex flex-col gap-6 shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:scale-105">
            <textarea
              placeholder="Escribe tu reseña aquí..."
              className="w-full h-48 p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#49568A] resize-none transition-all duration-300"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            ></textarea>

            <div className="flex flex-col gap-3">
              <button
                onClick={handleReviewSubmit}
                className="w-full bg-[#E5A800] hover:bg-[#D98E00] text-white font-semibold py-3 px-6 rounded-lg transition-transform duration-300 hover:scale-105"
              >
                Enviar Reseña
              </button>
              <button
                onClick={handleAddToFavorites}
                className="w-full bg-[#49568A] hover:bg-[#3e4a6b] text-white font-semibold py-3 px-6 rounded-lg transition-transform duration-300 hover:scale-105"
              >
                Añadir a Favoritos
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
