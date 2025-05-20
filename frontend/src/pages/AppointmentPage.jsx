import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const AppointmentPage = () => {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    problem: ''
  });
  
  // Esta variable se usará para mostrar u ocultar dinámicamente el mensaje de confirmación
  // cuando se implemente la funcionalidad completa
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar los datos al backend
    // Cuando se implemente la funcionalidad completa, aquí se mostraría la confirmación
    
    console.log('Datos de la cita a enviar:', formData);
    
    // Mostrar notificación temporal
    alert('Cita enviada correctamente. Espere confirmación.');
  };
  
  // Función de formateo para la fecha seleccionada en el resumen
  const formatDate = (dateString) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    const day = date.getDate();
    const month = new Intl.DateTimeFormat('es', { month: 'long' }).format(date);
    return `${day} de ${month.charAt(0).toUpperCase() + month.slice(1)}`;
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-10">
            <span className="text-[#0A3E59]">Agenda</span>
            <span className="text-[#0EB19B]"> una cita</span>
          </h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Formulario de cita - Primeras 2 columnas en desktop */}
            <div className="lg:col-span-2 bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <form onSubmit={handleSubmit}>
                {/* Sección de Fecha */}
                <div className="mb-6">
                  <label className="block text-[#0A3E59] font-medium text-lg mb-3">
                    Fecha de la cita
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md px-4 py-2 w-full sm:w-64"
                    required
                  />
                </div>
                
                {/* Resumen de la cita - Aparece si se selecciona fecha */}
                {formData.date && (
                  <div className="bg-[#F2F8FB] p-4 rounded-md mb-6">
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#0A3E59] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-[#0A3E59] font-medium">Resumen de tu cita</span>
                    </div>
                    <p className="mt-2 text-[#0A3E59]">
                      {`${formatDate(formData.date)} ${formData.time ? formData.time : '10:00 AM'}`}
                    </p>
                  </div>
                )}
                
                {/* Sección de Hora */}
                <div className="mb-6">
                  <label className="block text-[#0A3E59] font-medium text-lg mb-3">
                    Hora de la cita
                  </label>
                  <select
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md px-4 py-2 w-full sm:w-64 appearance-none bg-white"
                    required
                  >
                    <option value="">00:00</option>
                    <option value="08:00 AM">08:00 AM</option>
                    <option value="09:00 AM">09:00 AM</option>
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="11:00 AM">11:00 AM</option>
                    <option value="12:00 PM">12:00 PM</option>
                    <option value="01:00 PM">01:00 PM</option>
                    <option value="02:00 PM">02:00 PM</option>
                    <option value="03:00 PM">03:00 PM</option>
                    <option value="04:00 PM">04:00 PM</option>
                    <option value="05:00 PM">05:00 PM</option>
                    <option value="06:00 PM">06:00 PM</option>
                    <option value="07:00 PM">07:00 PM</option>
                  </select>
                </div>
                
                {/* Sección de Descripción del problema */}
                <div className="mb-6">
                  <label className="block text-[#0A3E59] font-medium text-lg mb-3">
                    Descripción del problema
                  </label>
                  <textarea
                    name="problem"
                    value={formData.problem}
                    onChange={handleChange}
                    rows="4"
                    className="border border-gray-300 rounded-md px-4 py-2 w-full"
                    placeholder="Descríbanos qué molestias o necesidades presenta"
                  ></textarea>
                </div>
                
                {/* Botón de enviar */}
                <button
                  type="submit"
                  className="w-full bg-[#0A3A4A] text-white py-3 px-4 rounded-lg hover:bg-[#0E6B96] transition duration-300"
                >
                  Enviar datos
                </button>
              </form>
            </div>
            
            {/* Sección de confirmación - Tercera columna en desktop */}
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-[#0A3E59] mb-4">
                  Confirmación de cita
                </h2>
                
                <div className="bg-gray-50 p-4 rounded-md border border-gray-100">
                  <div className="flex items-center mb-2">
                    <div className="h-5 w-5 rounded-full bg-[#0A3E59] mr-3 flex items-center justify-center">
                      <span className="text-white text-xs">!</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Tu cita está en espera de confirmación
                    </p>
                  </div>
                </div>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold text-[#0A3E59] mb-4">
                  Citas confirmadas
                </h2>
                
                {/* Cita confirmada de ejemplo (esto podría ser dinámico) */}
                <div className="bg-white p-4 rounded-md border border-gray-200 mb-2">
                  <div className="flex items-center mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#0A3E59] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="text-[#0A3E59] font-medium">8 de Octubre 10:00 AM</span>
                  </div>
                  
                  <div className="bg-[#0EB19B] text-white text-xs font-medium py-1 px-3 rounded-full inline-block mb-3">
                    Estado de la cita: Finalizada
                  </div>
                  
                  {/* Estrellas de calificación */}
                  <div className="flex mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg 
                        key={star}
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-5 w-5 text-yellow-400" 
                        viewBox="0 0 20 20" 
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500 mb-3">¿Cómo fue tu experiencia?</p>
                    <button className="bg-[#0A3A4A] text-white text-sm py-2 px-4 rounded-md hover:bg-[#0E6B96] transition duration-300">
                      Enviar valoración
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AppointmentPage;
