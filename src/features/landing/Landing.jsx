import React, { useState } from 'react';

const icons = {
  search: (
    <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
    </svg>
  ),
  home: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500">
      <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    </svg>
  ),
  heart: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500">
      <path d="M13.5 19.5 12 21l-7-7c-1.5-1.45-3-3.2-3-5.5A5.5 5.5 0 0 1 7.5 3c1.76 0 3 .5 4.5 2 1.5-1.5 2.74-2 4.5-2a5.5 5.5 0 0 1 5.402 6.5"/>
      <path d="M15 15h6"/>
      <path d="M18 12v6"/>
    </svg>
  ),
  
  flower: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500">
      <path d="M15 7.13V6a3 3 0 0 0-5.14-2.1L8 2"/><path d="M14.12 3.88 16 2"/><path d="M22 13h-4v-2a4 4 0 0 0-4-4h-1.3"/><path d="M20.97 5c0 2.1-1.6 3.8-3.5 4"/><path d="m2 2 20 20"/><path d="M7.7 7.7A4 4 0 0 0 6 11v3a6 6 0 0 0 11.13 3.13"/><path d="M12 20v-8"/><path d="M6 13H2"/><path d="M3 21c0-2.1 1.7-3.9 3.8-4"/>
    </svg>
  ),
  monitor: (
    <svg className="w-8 h-8 text-amber-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L8.25 21h7.5l-1.5-4M21 16.5V5.25A2.25 2.25 0 0018.75 3h-13.5A2.25 2.25 0 003 5.25v11.25M3 16.5h18" />
    </svg>
  ),
  wrench: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500">
      <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/>
    </svg>
  ),
  award: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500">
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>
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
      image: "https://www.quadratin.com.mx/www/wp-content/uploads/2018/04/WhatsApp-Image-2018-04-09-at-08.48.49-1.jpeg",
      rating: 4,
      hasFireIcon: false,
      providerImage: "https://www.psychologs.com/wp-content/uploads/2024/07/how-to-be-a-nicer-person.jpg"
    },
    {
      title: "Servicio de limpieza",
      description: "Ofrezco mi servicio con experiencia en los últimos 3 años",
      image: "https://www.stesso.com.mx/uploads/_mastheadHd/15578/Contratar-un-servicio-de-limpieza-profesional-vs.-limpieza-interna-de-la-empresa.webp",
      rating: 5,
      hasFireIcon: false,
      providerImage: "https://images.squarespace-cdn.com/content/v1/5c7c30767980b31affc87b09/1602396079712-4JS2RJYHTAP5OXOUQ1SB/image-asset.jpeg"
    },
    {
      title: "Servicio de limpieza",
      description: "Ofrezco mi servicio con experiencia en los últimos 2 años",
      image: "https://irp.cdn-website.com/6e5a8fac/MOBILE/jpg/690.jpg",
      rating: 5,
      hasFireIcon: true,
      providerImage: "https://www.yourtango.com/sites/default/files/image_blog/2024-10/signs-genuinely-kind-person-cant-be-faked.png"
    },
    {
      title: "Servicio de mecánico",
      description: "Ofrezco mi servicio con experiencia en los últimos 10 años",
      image: "https://speed-service.com.mx/wp-content/uploads/2015/12/mecanico_movil_en_miami-1024x682.jpg",
      rating: 5,
      hasFireIcon: false,
      providerImage: "https://a.espncdn.com/combiner/i?img=/i/headshots/college-football/players/full/5152030.png"
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center text-sky-900 mb-2">
        Contrata con confianza
      </h1>
      <h2 className="text-4xl font-bold text-center text-sky-900 mb-8">
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
            className="flex flex-col items-center justify-center p-4 cursor-pointer hover:bg-amber-100 transition-colors rounded-lg"
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
            className={`px-6 py-2 rounded-full text-sm transition-colors duration-200 ${
              category.active

                ? "bg-[#535a75] text-white"
                : "bg-[#9BA8D9] text-white hover:bg-[#606d9c]"
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
                <div className="absolute top-2 right-2 p-1 rounded-full bg-amber-200 text-white">
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
