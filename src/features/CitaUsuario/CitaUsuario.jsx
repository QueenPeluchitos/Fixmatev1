import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function CitaUsuario() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [confirmed, setConfirmed] = useState(false);

  const availableDates = [5, 10, 15, 20, 25];

  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDayOfMonth = new Date(year, month, 1);
    const startingDayOfWeek = (firstDayOfMonth.getDay() + 6) % 7;
    const totalDays = new Date(year, month + 1, 0).getDate();
    const days = [];

    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push({ day: null });
    }

    for (let i = 1; i <= totalDays; i++) {
      days.push({
        day: i,
        isAvailable: availableDates.includes(i),
        date: new Date(year, month, i),
      });
    }

    return days;
  };

  const days = generateCalendarDays();

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const isToday = (date) => {
    const today = new Date();
    return date?.toDateString() === today.toDateString();
  };

  const isSelected = (date) => {
    return date?.toDateString() === selectedDate?.toDateString();
  };

  const timeSlots = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'];

  if (confirmed) {
    return (
      <div className="max-w-xl mx-auto p-6 text-center bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-green-600 mb-4">¡Cita confirmada!</h2>
        <p className="text-gray-700 mb-2">Gracias por agendar tu servicio de plomería.</p>
        <p className="text-gray-600">Fecha: <strong>{selectedDate.toLocaleDateString()}</strong></p>
        <p className="text-gray-600">Hora: <strong>{selectedTime}</strong></p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-lg space-y-8">
      {/* Título Agendar cita */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-yellow-500">Agendar Cita</h1>
      </div>

      {/* Descripción del servicio */}
      <div className="flex gap-6 items-center">
        <img src="/api/placeholder/180/140" alt="Servicio" className="rounded-lg w-48 h-36 object-cover" />
        <div className="space-y-3">
          <h2 className="text-2xl font-semibold text-yellow-500">Servicio de plomería a domicilio</h2>
          <p className="text-gray-600 text-base">
            Ofrecemos reparación de fugas, instalación y mantenimiento de grifos, tuberías, WC, regaderas y sistemas hidráulicos completos. Nuestro servicio incluye revisión general del sistema, asesoría técnica y atención el mismo día en la comodidad de tu hogar.
          </p>
          <div>
            <span className="text-blue-500 font-semibold">Costo: </span>
            <span className="text-gray-800">$450 MXN</span>
          </div>
        </div>
      </div>

      {/* Profesional */}
      <div className="flex gap-4 items-center">
        <img src="/api/placeholder/100/100" alt="Profesional" className="rounded-full w-16 h-16 object-cover" />
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-700">Juan Pérez</h3>
          <p className="text-sm text-gray-500">Plomero certificado con más de 10 años de experiencia.</p>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, index) => (
              <svg key={index} className="w-5 h-5 text-yellow-400" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" stroke="currentColor">
                <path d="M10 15l-3.09 1.636 1.182-3.869-2.91-2.31h3.596l1.182-3.869 1.182 3.869h3.595l-2.91 2.31 1.181 3.869z" />
              </svg>
            ))}
          </div>
        </div>
      </div>

      {/* Calendario */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <button onClick={prevMonth} className="text-gray-500 hover:text-gray-700"><ChevronLeft /></button>
          <h3 className="font-bold capitalize text-gray-700">
            {currentMonth.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}
          </h3>
          <button onClick={nextMonth} className="text-gray-500 hover:text-gray-700"><ChevronRight /></button>
        </div>

        <div className="grid grid-cols-7 text-center text-sm font-semibold text-gray-500 mb-2">
          {["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"].map((day) => (
            <div key={day}>{day}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2 mb-6">
          {days.map((d, i) => (
            <div key={i}>
              {d.day ? (
                <button
                  onClick={() => d.isAvailable && setSelectedDate(d.date)}
                  className={`w-full py-2 rounded-lg text-sm font-medium
                    ${isToday(d.date) ? 'bg-blue-100 text-blue-600' : ''}
                    ${isSelected(d.date) ? 'bg-yellow-500 text-white' : ''}
                    ${d.isAvailable && !isSelected(d.date) ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200' : ''}
                    ${!d.isAvailable ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : ''}`}
                >
                  {d.day}
                </button>
              ) : (
                <div></div>
              )}
            </div>
          ))}
        </div>

        {/* Leyenda */}
        <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-8">
          <div className="flex items-center gap-2"><div className="w-4 h-4 bg-yellow-500 rounded"></div> Seleccionado</div>
          <div className="flex items-center gap-2"><div className="w-4 h-4 bg-yellow-100 rounded"></div> Disponible</div>
          <div className="flex items-center gap-2"><div className="w-4 h-4 bg-blue-100 rounded"></div> Hoy</div>
          <div className="flex items-center gap-2"><div className="w-4 h-4 bg-gray-200 rounded"></div> No disponible</div>
        </div>
      </div>

      {/* Horarios disponibles */}
      {selectedDate && (
        <div className="mt-6">
          <h4 className="font-semibold text-gray-700 mb-2">Selecciona un horario:</h4>
          <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
            {timeSlots.map((slot) => (
              <button
                key={slot}
                onClick={() => setSelectedTime(slot)}
                className={`py-2 text-sm rounded-md
                  ${selectedTime === slot ? 'bg-blue-500 text-white' : 'bg-blue-100 text-blue-700 hover:bg-blue-200'}`}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Confirmación */}
      {selectedDate && selectedTime && (
        <div className="mt-8 flex justify-end gap-4">
          <button
            className="px-4 py-2 border border-yellow-300 rounded-md hover:bg-yellow-200"
            onClick={() => {
              setSelectedDate(null);
              setSelectedTime(null);
            }}
          >
            Cancelar
          </button>
          <button
            className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
            onClick={() => setConfirmed(true)}
          >
            Confirmar cita
          </button>
        </div>
      )}
    </div>
  );
}