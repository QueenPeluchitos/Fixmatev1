import { useState } from 'react';
import { ChevronLeft, ChevronRight, ChevronUp, ChevronDown } from 'lucide-react';

export default function CitaUsuario() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const [availabilityStatus, setAvailabilityStatus] = useState('disponible');

  // Generar el array de días del mes actual
  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    // Primer día del mes
    const firstDayOfMonth = new Date(year, month, 1);
    const startingDayOfWeek = firstDayOfMonth.getDay(); // 0 = Domingo
    
    // Último día del mes
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const totalDays = lastDayOfMonth.getDate();
    
    // Días del mes anterior para completar la primera semana
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    
    const days = [];
    
    // Días del mes anterior
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      days.push({
        day: prevMonthLastDay - i,
        isCurrentMonth: false,
        date: new Date(year, month - 1, prevMonthLastDay - i)
      });
    }
    
    // Días del mes actual
    for (let i = 1; i <= totalDays; i++) {
      days.push({
        day: i,
        isCurrentMonth: true,
        date: new Date(year, month, i)
      });
    }
    
    // Días del mes siguiente para completar la última semana
    const remainingDays = 42 - days.length; // 6 semanas x 7 días = 42 celdas
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        day: i,
        isCurrentMonth: false,
        date: new Date(year, month + 1, i)
      });
    }
    
    return days;
  };

  const days = generateCalendarDays();
  
  // Avanzar al siguiente mes
  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };
  
  // Retroceder al mes anterior
  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };
  
  // Verificar si un día es el seleccionado
  const isSelected = (date) => {
    return date.toDateString() === selectedDate.toDateString();
  };
  
  // Verificar si un día es hoy
  const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  // Obtener nombre del mes y año
  const getMonthYearString = () => {
    const options = { month: 'long', year: 'numeric' };
    return currentMonth.toLocaleDateString('es-ES', options);
  };

  // Array de horas disponibles
  const timeSlots = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
      {/* Header con información del servicio */}
      <div className="mb-8">
        <div className="flex items-start">
          <div className="w-1/3">
            <img 
              src="/api/placeholder/250/200" 
              alt="Servicio de sastrería"
              className="rounded-lg"
            />
            <div className="flex mt-1">
              {[1, 2, 3].map((star) => (
                <svg key={star} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              ))}
            </div>
          </div>
          
          <div className="w-2/3 pl-6">
            <h2 className="text-xl font-bold text-yellow-500">Servicio de sastrería</h2>
            
            <div className="mt-4 bg-blue-100 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-800">Incluye</h3>
              <ul className="list-disc pl-5 text-blue-700">
                <li>Fursuit completo</li>
                <li>Tela de alta calida</li>
                <li>Patrones a la medida</li>
              </ul>
            </div>
            
            <div className="mt-4 text-blue-400">
              <p className="font-medium">Costo del servicio</p>
              <p className="text-lg">$00.00</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Calendario y selección de horarios */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Calendario */}
        <div className="w-full md:w-2/3">
          <div className="flex justify-between items-center mb-4">
            <button 
              onClick={prevMonth}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <ChevronLeft size={20} />
            </button>
            
            <h3 className="font-bold text-gray-700 capitalize">
              {getMonthYearString()}
            </h3>
            
            <button 
              onClick={nextMonth}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <ChevronRight size={20} />
            </button>
          </div>
          
          {/* Días de la semana */}
          <div className="grid grid-cols-7 gap-1 text-center mb-2">
            {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map((day) => (
              <div key={day} className="text-xs font-medium text-gray-500">
                {day}
              </div>
            ))}
          </div>
          
          {/* Días del mes */}
          <div className="grid grid-cols-7 gap-1">
            {days.map((day, index) => (
              <button
                key={index}
                onClick={() => setSelectedDate(day.date)}
                className={`
                  py-2 rounded-md text-sm
                  ${!day.isCurrentMonth ? 'text-gray-300' : ''}
                  ${isToday(day.date) ? 'bg-blue-50 text-blue-600 font-bold' : ''}
                  ${isSelected(day.date) && !isToday(day.date) ? 'bg-blue-500 text-white' : ''}
                  ${!isSelected(day.date) && day.isCurrentMonth ? 'hover:bg-gray-100' : ''}
                `}
              >
                {day.day}
              </button>
            ))}
          </div>
          
          {/* Accesos rápidos a fechas */}
          <div className="mt-4 space-y-2">
            <div className="flex justify-between items-center px-2 py-1 hover:bg-gray-100 rounded cursor-pointer">
              <span className="text-sm">Today</span>
              <span className="text-xs text-gray-500">
                {new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long' })}
              </span>
            </div>
            <div className="flex justify-between items-center px-2 py-1 hover:bg-gray-100 rounded cursor-pointer">
              <span className="text-sm">Tomorrow</span>
              <span className="text-xs text-gray-500">
                {new Date(Date.now() + 86400000).toLocaleDateString('es-ES', { day: 'numeric', month: 'long' })}
              </span>
            </div>
            <div className="flex justify-between items-center px-2 py-1 hover:bg-gray-100 rounded cursor-pointer">
              <span className="text-sm">Yesterday</span>
              <span className="text-xs text-gray-500">
                {new Date(Date.now() - 86400000).toLocaleDateString('es-ES', { day: 'numeric', month: 'long' })}
              </span>
            </div>
            <div className="flex justify-between items-center px-2 py-1 hover:bg-gray-100 rounded cursor-pointer">
              <span className="text-sm">This Week</span>
            </div>
            <div className="flex justify-between items-center px-2 py-1 hover:bg-gray-100 rounded cursor-pointer">
              <span className="text-sm">Next Week</span>
            </div>
            <div className="flex justify-between items-center px-2 py-1 hover:bg-gray-100 rounded cursor-pointer">
              <span className="text-sm">This Month</span>
            </div>
            <div className="flex justify-between items-center px-2 py-1 hover:bg-gray-100 rounded cursor-pointer">
              <span className="text-sm">Last Month</span>
            </div>
          </div>
          
          {/* Selección de tiempo */}
          <div className="mt-4">
            <div className="flex justify-between items-center border-t pt-4">
              <div className="flex items-center">
                <button className="p-1 hover:bg-gray-100 rounded-full mr-2">
                  <ChevronUp size={16} />
                </button>
                <span className="text-sm font-medium">9</span>
                <button className="p-1 hover:bg-gray-100 rounded-full ml-2">
                  <ChevronDown size={16} />
                </button>
              </div>
              <div className="text-lg">:</div>
              <div className="flex items-center">
                <button className="p-1 hover:bg-gray-100 rounded-full mr-2">
                  <ChevronUp size={16} />
                </button>
                <span className="text-sm font-medium">30</span>
                <button className="p-1 hover:bg-gray-100 rounded-full ml-2">
                  <ChevronDown size={16} />
                </button>
              </div>
              <div className="flex">
                <button className={`px-3 py-1 text-xs rounded ${selectedTime === 'AM' ? 'bg-blue-500 text-white' : 'bg-gray-100'}`} onClick={() => setSelectedTime('AM')}>AM</button>
                <button className={`px-3 py-1 text-xs rounded ml-1 ${selectedTime === 'PM' ? 'bg-blue-500 text-white' : 'bg-gray-100'}`} onClick={() => setSelectedTime('PM')}>PM</button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Estado de disponibilidad */}
        <div className="w-full md:w-1/3 space-y-2">
          <button 
            className={`w-full py-2 px-4 rounded-md text-center ${availabilityStatus === 'disponible' ? 'bg-blue-500 text-white' : 'bg-blue-100 text-blue-700'}`}
            onClick={() => setAvailabilityStatus('disponible')}
          >
            Disponible
          </button>
          
          <button 
            className={`w-full py-2 px-4 rounded-md text-center ${availabilityStatus === 'sin-disponibilidad' ? 'bg-red-500 text-white' : 'bg-red-100 text-red-700'}`}
            onClick={() => setAvailabilityStatus('sin-disponibilidad')}
          >
            Sin disponibilidad
          </button>
          
          <button 
            className={`w-full py-2 px-4 rounded-md text-center ${availabilityStatus === 'sin-servicio' ? 'bg-orange-500 text-white' : 'bg-orange-100 text-orange-700'}`}
            onClick={() => setAvailabilityStatus('sin-servicio')}
          >
            Día sin servicio
          </button>
          
          <button 
            className={`w-full py-2 px-4 rounded-md text-center ${availabilityStatus === 'sin-cita' ? 'bg-purple-500 text-white' : 'bg-purple-100 text-purple-700'}`}
            onClick={() => setAvailabilityStatus('sin-cita')}
          >
            Día sin disponibilidad de cita
          </button>
          
          <div className="pt-6 flex justify-between">
            <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
              Clear
            </button>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}