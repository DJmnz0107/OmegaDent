import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const AppointmentPage = () => {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    problem: ''
  });
  
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
    console.log('Datos de la cita a enviar:', formData);
    
    // Mostrar notificación temporal
    alert('Cita enviada correctamente. Espere confirmación.');
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-[76px] bg-white">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-center text-3xl lg:text-4xl font-bold mb-10">
            <span className="text-[#0E6B96]">Agenda</span>
            <span className="text-[#0EB19B]"> una cita</span>
          </h1>
          
          <div className="max-w-6xl mx-auto">
            {/* Formulario de cita - Diseño idéntico a la imagen 1 */}
            <div className="bg-white p-6 rounded-md border border-gray-200 shadow-sm mb-8">
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col md:flex-row md:space-x-6">
                  {/* Columna izquierda - Fecha y hora */}
                  <div className="md:w-1/2">
                    {/* Fecha de la cita */}
                    <div className="mb-6">
                      <label className="block text-[#0E6B96] font-medium mb-2">
                        Fecha de la cita
                      </label>
                      <input
                        type="text"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md px-4 py-2 w-full" 
                        placeholder="DD/MM/YYYY"
                        required
                      />
                    </div>
                    
                    {/* Hora de la cita */}
                    <div className="mb-6">
                      <label className="block text-[#0E6B96] font-medium mb-2">
                        Hora de la cita
                      </label>
                      <div className="relative">
                        <select
                          name="time"
                          value={formData.time}
                          onChange={handleChange}
                          className="border border-gray-300 rounded-md px-4 py-2 w-full appearance-none bg-white"
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
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <svg className="w-5 h-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Columna derecha - Resumen de cita */}
                  <div className="md:w-1/2">
                    <div className="bg-[#EEF6FC] p-4 rounded-md">
                      <div className="flex items-center mb-2">
                        <svg className="h-5 w-5 text-[#0E6B96] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-[#0E6B96] font-medium">Resumen de tu cita</span>
                      </div>
                      <p className="text-[#0E6B96]">
                        8 de Octubre 10:00 AM
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Descripción del problema */}
                <div className="mt-6 mb-6">
                  <label className="block text-[#0E6B96] font-medium mb-2">
                    Descripción del problema
                  </label>
                  <textarea
                    name="problem"
                    value={formData.problem}
                    onChange={handleChange}
                    rows="6"
                    className="border border-gray-300 rounded-md px-4 py-2 w-full"
                    placeholder="Descríbanos qué molestias o necesidades presenta"
                  ></textarea>
                </div>
                
                {/* Botón de enviar */}
                <button
                  type="submit"
                  className="w-full bg-[#0A3E59] text-white font-medium py-3 px-4 rounded-md hover:bg-[#0E6B96] transition duration-300"
                >
                  Enviar datos
                </button>
              </form>
            </div>
            
            {/* Columna derecha - Confirmación y citas */}
            <div className="bg-white p-6 rounded-md border border-gray-200 shadow-sm">
              {/* Confirmación de cita */}
              <div className="mb-6">
                <h2 className="text-[#0E6B96] text-xl font-medium mb-4">
                  Confirmación de cita
                </h2>
                
                <div className="border border-gray-200 rounded-md p-4">
                  <div className="flex items-center">
                    <div className="h-6 w-6 rounded-full bg-[#0E6B96] mr-2 flex items-center justify-center text-white text-xs font-bold">i</div>
                    <p className="text-sm text-[#0E6B96]">
                      Tu cita está en espera de confirmación
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Citas confirmadas */}
              <div>
                <h2 className="text-[#0E6B96] text-xl font-medium mb-4">
                  Citas confirmadas
                </h2>
                
                {/* Cita confirmada de ejemplo */}
                <div className="border border-gray-200 rounded-md p-4">
                  <div className="flex items-center mb-2">
                    <svg className="h-5 w-5 text-[#0E6B96] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="text-[#0E6B96] font-medium">8 de Octubre 10:00 AM</span>
                  </div>
                  
                  <div className="bg-[#0EB19B] text-white text-xs py-1 px-3 rounded-full inline-block mb-2">
                    Estado de la cita: Finalizada
                  </div>
                  
                  {/* Estrellas de calificación */}
                  <div className="flex mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg 
                        key={star}
                        className="h-5 w-5 text-yellow-400" 
                        viewBox="0 0 20 20" 
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500 mb-2">¿Cómo fue tu experiencia?</p>
                    <button className="bg-[#0A3E59] text-white text-sm py-2 px-4 rounded-md hover:bg-[#0E6B96] transition duration-300">
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
