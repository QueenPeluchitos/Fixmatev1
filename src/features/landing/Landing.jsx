import React, { useState } from 'react';

const icons = {
  search: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
    </svg>
  ),
  home: (
    <svg className="w-8 h-8 text-amber-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l9-9 9 9M4 10v10a1 1 0 001 1h3m10-11v11a1 1 0 001 1h3m-10-1v-5a1 1 0 011-1h2a1 1 0 011 1v5" />
    </svg>
  ),
  heart: (
    <svg className="w-8 h-8 text-amber-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 010 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 6.364l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  ),
  flower: (
    <svg className="w-8 h-8 text-amber-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M12 2a7.5 7.5 0 00-6.5 11.25A7.5 7.5 0 0012 22a7.5 7.5 0 006.5-8.75A7.5 7.5 0 0012 2z" />
    </svg>
  ),
  monitor: (
    <svg className="w-8 h-8 text-amber-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L8.25 21h7.5l-1.5-4M21 16.5V5.25A2.25 2.25 0 0018.75 3h-13.5A2.25 2.25 0 003 5.25v11.25M3 16.5h18" />
    </svg>
  ),
  wrench: (
    <svg className="w-8 h-8 text-amber-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.7 13.35a9 9 0 01-12.05-12.05 5 5 0 107.07 7.07 5 5 0 005 5z" />
    </svg>
  ),
  award: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <circle cx="12" cy="8" r="6" />
      <path d="M15.5 14l1.5 6-5-3-5 3 1.5-6" />
    </svg>
  ),
};

const Landing = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const mainCategories = [
    { icon: icons.home, name: "Hogar y mantenimiento" },
    { icon: icons.heart, name: "Cuidado personal y moda" },
    { icon: icons.flower, name: "Cuidado de exteriores" },
    { icon: icons.monitor, name: "Tecnología y electrónica" },
    { icon: icons.wrench, name: "Transporte y mecánica" },
    { icon: icons.award, name: "Destacados" },
  ];

  const secondaryCategories = [
    { name: "Tapicería", active: false },
    { name: "Plagas", active: false },
    { name: "Plomería", active: false },
    { name: "Sastrería", active: true },
    { name: "Cerrajero", active: false },
    { name: "Coches", active: false },
  ];

  const services = [
    {
      title: "Servicio de cerrajero",
      description: "Ofrezco mi servicio con experiencia en los últimos 5 años",
      image: "/api/placeholder/220/160",
      rating: 4,
      hasFireIcon: false,
      providerImage: "/api/placeholder/40/40"
    },
    {
      title: "Servicio de limpieza",
      description: "Ofrezco mi servicio con experiencia en los últimos 3 años",
      image: "/api/placeholder/220/160",
      rating: 5,
      hasFireIcon: false,
      providerImage: "/api/placeholder/40/40"
    },
    {
      title: "Servicio de limpieza",
      description: "Ofrezco mi servicio con experiencia en los últimos 2 años",
      image: "/api/placeholder/220/160",
      rating: 5,
      hasFireIcon: true,
      providerImage: "/api/placeholder/40/40"
    },
    {
      title: "Servicio de mecánico",
      description: "Ofrezco mi servicio con experiencia en los últimos 10 años",
      image: "/api/placeholder/220/160",
      rating: 5,
      hasFireIcon: false,
      providerImage: "/api/placeholder/40/40"
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center text-purple-600 mb-2">
        Contrata con confianza
      </h1>
      <h2 className="text-4xl font-bold text-center text-purple-600 mb-8">
        desde casa
      </h2>

      <div className="relative max-w-xl mx-auto mb-10">
        <input
          type="text"
          placeholder="¿En qué te podemos ayudar?"
          className="w-full py-3 px-6 bg-amber-100 rounded-full text-gray-700 focus:outline-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="absolute right-3 top-3 text-gray-400">
          {icons.search}
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {mainCategories.map((category, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center p-4 cursor-pointer hover:bg-amber-50 transition-colors rounded-lg"
          >
            {category.icon}
            <p className="text-center text-xs mt-2 text-gray-600">{category.name}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-2 mb-16">
        {secondaryCategories.map((category, index) => (
          <button
            key={index}
            className={`px-6 py-2 rounded-full text-sm ${
              category.active
                ? "bg-blue-500 text-white"
                : "bg-purple-100 text-purple-800 hover:bg-purple-200"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service, index) => (
          <div key={index} className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="relative">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-44 object-cover"
              />
              <div className="absolute bottom-2 left-2 flex gap-1">
                {[...Array(service.rating)].map((_, i) => (
                  <span key={i} className="text-amber-400">★</span>
                ))}
              </div>
              {service.hasFireIcon && (
                <div className="absolute top-2 right-2 p-1 rounded-full bg-amber-500 text-white">
                  {icons.award}
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="text-lg font-bold text-amber-500">{service.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{service.description}</p>
              <div className="mt-4 flex justify-end">
                <img
                  src={service.providerImage}
                  alt="Proveedor"
                  className="w-8 h-8 rounded-full border-2 border-white"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Landing;
