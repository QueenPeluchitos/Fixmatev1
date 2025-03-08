import { useState } from 'react';
export function ImgC() {
  const images = [
    "https://via.placeholder.com/600x300/FFDD57/000000?text=Imagen+1",
    "https://via.placeholder.com/600x300/FFD700/000000?text=Imagen+2",
    "https://via.placeholder.com/600x300/FFC107/000000?text=Imagen+3",
    "https://via.placeholder.com/600x300/FFA000/000000?text=Imagen+4",
    "https://via.placeholder.com/600x300/FF8F00/000000?text=Imagen+5",
    "https://via.placeholder.com/600x300/FF6F00/000000?text=Imagen+6",
  ];
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto mt-6">
      <img src={images[current]} alt="Carrusel" className="w-full rounded-lg shadow-md" />
      <button
        onClick={prevSlide}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-yellow-500 text-white px-3 py-1 rounded-full shadow-md"
      >
        ◀
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-yellow-500 text-white px-3 py-1 rounded-full shadow-md"
      >
        ▶
      </button>
    </div>
  );
}
export default ImgC;
