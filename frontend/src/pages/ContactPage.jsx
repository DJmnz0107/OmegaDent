import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ContactPage = () => {
  // Estados para los formularios
  const [clinicForm, setClinicForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [developerForm, setDeveloperForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  // Manejadores de cambios en los formularios
  const handleClinicFormChange = (e) => {
    const { name, value } = e.target;
    setClinicForm({
      ...clinicForm,
      [name]: value
    });
  };

  const handleDeveloperFormChange = (e) => {
    const { name, value } = e.target;
    setDeveloperForm({
      ...developerForm,
      [name]: value
    });
  };

  // Manejadores de envío de formularios
  const handleClinicFormSubmit = (e) => {
    e.preventDefault();
    // Lógica para enviar el formulario de contacto con la clínica
    console.log('Formulario de clínica enviado:', clinicForm);
    // Aquí iría la lógica para enviar el formulario a un API
    
    // Resetear el formulario después del envío
    setClinicForm({
      name: '',
      email: '',
      phone: '',
      message: ''
    });
  };

  const handleDeveloperFormSubmit = (e) => {
    e.preventDefault();
    // Lógica para enviar el formulario de contacto con desarrolladores
    console.log('Formulario de desarrolladores enviado:', developerForm);
    // Aquí iría la lógica para enviar el formulario a un API
    
    // Resetear el formulario después del envío
    setDeveloperForm({
      name: '',
      email: '',
      phone: '',
      message: ''
    });
  };

  return (
    <>
      <Header />
      
      {/* Sección Hero */}
      <section className="bg-gradient-to-r from-[#E6F3F9] to-[#E6F9F6] h-screen max-h-[600px] flex items-center">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row items-center">
            {/* Columna de texto */}
            <div className="w-full md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="text-[#0E6B96]">Cuidamos tu sonrisa</span><br />
                <span className="text-[#0EB19B]">con tecnología de<br />vanguardia</span>
              </h1>
              <p className="text-gray-600 text-sm md:text-base mb-6 max-w-lg">
                Agenda tu cita y conoce nuestra clínica dental a través de la
                aplicación y descubre por qué están transformando la
                atención dental con innovación y tecnología. Disfruta de un
                proceso rápido, cómodo y personalizado desde tu dispositivo
                móvil y vive una nueva forma de cuidar tu salud bucal.
              </p>
              
              <div className="flex items-center">
                <div className="bg-[#0E6B96] text-white p-2 rounded-full mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-[#0E6B96] font-medium">Atención 24/7</span>
              </div>
            </div>
            
            {/* Columna de imagen */}
            <div className="w-full md:w-1/2 flex justify-center relative">
              <img 
                src="/images/div.svg" 
                alt="Cuidado dental de vanguardia" 
                className="rounded-lg shadow-lg max-w-full object-cover z-10"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white pt-16 pb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Sección de contacto con la clínica */}
          <div className="mb-20">
            <h2 className="text-2xl md:text-3xl font-bold text-[#0E6B96] mb-10 text-center">
              Contáctate con la Clínica Dra. Cindy Padilla
            </h2>
            
            <div className="flex flex-col md:flex-row gap-8">
              {/* Columna izquierda - Información de contacto */}
              <div className="w-full md:w-1/2 bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-[#0E6B96] mb-4">
                    Información de Contacto
                  </h3>
                  
                  {/* Dirección */}
                  <div className="flex items-start mb-4">
                    <div className="mr-3 text-[#0E6B96]">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Dirección</p>
                      <p className="text-gray-700">Av. Central 123, Zona 9</p>
                    </div>
                  </div>
                  
                  {/* Teléfono */}
                  <div className="flex items-start mb-4">
                    <div className="mr-3 text-[#0E6B96]">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Teléfono</p>
                      <p className="text-gray-700">+502 1234 5678</p>
                    </div>
                  </div>
                  
                  {/* Email */}
                  <div className="flex items-start">
                    <div className="mr-3 text-[#0E6B96]">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="text-gray-700">clinica@dracindypadilla.com</p>
                    </div>
                  </div>
                </div>
                
                {/* Horario de atención */}
                <div>
                  <h3 className="text-xl font-semibold text-[#0E6B96] mb-4">
                    Horario de Atención
                  </h3>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <p className="text-gray-600">Lunes - Viernes</p>
                      <p className="text-gray-700 font-medium">8:00 am - 5:00 pm</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-gray-600">Sábados</p>
                      <p className="text-gray-700 font-medium">8:00 am - 12:00 pm</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-gray-600">Domingos</p>
                      <p className="text-gray-700 font-medium">Cerrado</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Columna derecha - Formulario */}
              <div className="w-full md:w-1/2 bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                <h3 className="text-xl font-semibold text-[#0E6B96] mb-4">
                  Envía tus inquietudes
                </h3>
                
                <form onSubmit={handleClinicFormSubmit}>
                  {/* Campo nombre */}
                  <div className="mb-4">
                    <label htmlFor="clinic-name" className="block text-sm text-gray-600 mb-1 sr-only">
                      Nombre completo
                    </label>
                    <input
                      type="text"
                      id="clinic-name"
                      name="name"
                      value={clinicForm.name}
                      onChange={handleClinicFormChange}
                      className="w-full px-3 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0E6B96] text-gray-500"
                      placeholder="Nombre completo"
                      required
                    />
                  </div>
                  
                  {/* Campo email */}
                  <div className="mb-4">
                    <label htmlFor="clinic-email" className="block text-sm text-gray-600 mb-1 sr-only">
                      Email
                    </label>
                    <input
                      type="email"
                      id="clinic-email"
                      name="email"
                      value={clinicForm.email}
                      onChange={handleClinicFormChange}
                      className="w-full px-3 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0E6B96] text-gray-500"
                      placeholder="Email"
                      required
                    />
                  </div>
                  
                  {/* Campo teléfono */}
                  <div className="mb-4">
                    <label htmlFor="clinic-phone" className="block text-sm text-gray-600 mb-1 sr-only">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      id="clinic-phone"
                      name="phone"
                      value={clinicForm.phone}
                      onChange={handleClinicFormChange}
                      className="w-full px-3 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0E6B96] text-gray-500"
                      placeholder="Teléfono"
                    />
                  </div>
                  
                  {/* Campo mensaje */}
                  <div className="mb-6">
                    <label htmlFor="clinic-message" className="block text-sm text-gray-600 mb-1 sr-only">
                      Mensaje
                    </label>
                    <textarea
                      id="clinic-message"
                      name="message"
                      value={clinicForm.message}
                      onChange={handleClinicFormChange}
                      rows="4"
                      className="w-full px-3 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0E6B96] text-gray-500"
                      placeholder="Mensaje"
                      required
                    ></textarea>
                  </div>
                  
                  {/* Botón de envío */}
                  <button
                    type="submit"
                    className="w-full bg-[#0EB19B] text-white font-medium py-2 px-4 rounded-lg hover:bg-[#0a9384] transition duration-300"
                  >
                    Enviar mensaje
                  </button>
                </form>
              </div>
            </div>
          </div>
          
          {/* Sección de contacto con desarrolladores */}
          <div className="mb-20">
            <h2 className="text-2xl md:text-3xl font-bold text-[#0E6B96] mb-10 text-center">
              ¿Quieres contactar con los desarrolladores de Omega?
            </h2>
            
            <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Información de contacto */}
                <div className="w-full md:w-1/3 md:col-span-1">
                  <h3 className="text-xl font-semibold text-[#0E6B96] mb-4">
                    Contáctanos
                  </h3>
                  
                  {/* Dirección */}
                  <div className="flex items-start mb-4">
                    <div className="mr-3 text-[#0E6B96]">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-gray-700">Edificio Empresarial, Torre Z, Nivel 10</p>
                    </div>
                  </div>
                  
                  {/* Teléfono */}
                  <div className="flex items-start mb-4">
                    <div className="mr-3 text-[#0E6B96]">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-gray-700">+502 5678 1234</p>
                    </div>
                  </div>
                  
                  {/* Email */}
                  <div className="flex items-start">
                    <div className="mr-3 text-[#0E6B96]">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-gray-700">desarrolladores@omega-dental.com</p>
                    </div>
                  </div>
                </div>
                
                {/* Formulario */}
                <div className="w-full md:w-full md:col-span-1">
                  <form onSubmit={handleDeveloperFormSubmit}>
                    <div className="flex flex-col md:flex-row gap-4 mb-4">
                      {/* Campo nombre */}
                      <div className="w-full md:w-1/2">
                        <input
                          type="text"
                          id="dev-name"
                          name="name"
                          value={developerForm.name}
                          onChange={handleDeveloperFormChange}
                          className="w-full px-3 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0E6B96] text-gray-500"
                          placeholder="Nombre completo"
                          required
                        />
                      </div>
                      
                      {/* Campo email */}
                      <div className="w-full md:w-1/2">
                        <input
                          type="email"
                          id="dev-email"
                          name="email"
                          value={developerForm.email}
                          onChange={handleDeveloperFormChange}
                          className="w-full px-3 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0E6B96] text-gray-500"
                          placeholder="Email"
                          required
                        />
                      </div>
                    </div>
                    
                    {/* Campo teléfono */}
                    <div className="mb-4">
                      <input
                        type="tel"
                        id="dev-phone"
                        name="phone"
                        value={developerForm.phone}
                        onChange={handleDeveloperFormChange}
                        className="w-full px-3 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0E6B96] text-gray-500"
                        placeholder="Teléfono"
                      />
                    </div>
                    
                    {/* Campo mensaje */}
                    <div className="mb-4">
                      <textarea
                        id="dev-message"
                        name="message"
                        value={developerForm.message}
                        onChange={handleDeveloperFormChange}
                        rows="4"
                        className="w-full px-3 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0E6B96] text-gray-500"
                        placeholder="Mensaje"
                        required
                      ></textarea>
                    </div>
                    
                    {/* Botón de envío */}
                    <div className="text-right">
                      <button
                        type="submit"
                        className="bg-[#0EB19B] text-white font-medium py-2 px-8 rounded-lg hover:bg-[#0a9384] transition duration-300"
                      >
                        Enviar mensaje
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          
          {/* Sección del mapa */}
          <div className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-[#0E6B96] mb-10 text-center">
              Encuéntranos aquí
            </h2>
            
            <div className="bg-gray-300 rounded-lg overflow-hidden h-96">
              {/* Mapa de Google Maps */}
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3861.6635539976236!2d-90.5158691!3d14.5894833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTTCsDM1JzIyLjEiTiA5MMKwMzAnNTcuMSJX!5e0!3m2!1ses!2sgt!4v1620134896043!5m2!1ses!2sgt" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy"
                title="Ubicación de la clínica"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </>
  );
};

export default ContactPage;
