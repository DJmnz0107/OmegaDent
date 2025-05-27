import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

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

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [activeForm, setActiveForm] = useState('clinic');

  // Referencias para animaciones basadas en scroll
  const [heroRef, heroInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [clinicFormRef, clinicFormInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [devFormRef, devFormInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [mapRef, mapInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
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
    
    // Mostrar mensaje de éxito
    setFormSubmitted(true);
    
    // Resetear el formulario después del envío
    setTimeout(() => {
      setClinicForm({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
      setFormSubmitted(false);
    }, 3000);
  };

  const handleDeveloperFormSubmit = (e) => {
    e.preventDefault();
    // Lógica para enviar el formulario de contacto con desarrolladores
    console.log('Formulario de desarrolladores enviado:', developerForm);
    // Aquí iría la lógica para enviar el formulario a un API
    
    // Mostrar mensaje de éxito
    setFormSubmitted(true);
    
    // Resetear el formulario después del envío
    setTimeout(() => {
      setDeveloperForm({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
      setFormSubmitted(false);
    }, 3000);
  };

  return (
    <>
      <Header />
      
      {/* Sección Hero */}
      <motion.section 
        ref={heroRef}
        initial={{ opacity: 0 }}
        animate={heroInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-r from-[#E6F3F9] to-[#E6F9F6] h-screen max-h-[600px] flex items-center pt-24 mt-4"
      >
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row items-center">
            {/* Columna de texto */}
            <motion.div 
              className="w-full md:w-1/2 mb-10 md:mb-0"
              initial={{ opacity: 0, x: -50 }}
              animate={heroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <motion.h1 
                className="text-4xl md:text-5xl font-bold mb-4"
                initial={{ opacity: 0, y: 30 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.3 }}
              >
                <motion.span 
                  className="text-[#0E6B96]"
                  initial={{ opacity: 0 }}
                  animate={heroInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  Cuidamos tu sonrisa
                </motion.span>
                <br />
                <motion.span 
                  className="text-[#0EB19B]"
                  initial={{ opacity: 0 }}
                  animate={heroInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  con tecnología de<br />vanguardia
                </motion.span>
              </motion.h1>
              <motion.p 
                className="text-gray-600 text-sm md:text-base mb-6 max-w-lg"
                initial={{ opacity: 0 }}
                animate={heroInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                Agenda tu cita y conoce nuestra clínica dental a través de la
                aplicación y descubre por qué están transformando la
                atención dental con innovación y tecnología. Disfruta de un
                proceso rápido, cómodo y personalizado desde tu dispositivo
                móvil y vive una nueva forma de cuidar tu salud bucal.
              </motion.p>
              
              <motion.div 
                className="flex items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 1 }}
              >
                <motion.div 
                  className="bg-[#0E6B96] text-white p-2 rounded-full mr-2"
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </motion.div>
                <span className="text-[#0E6B96] font-medium">Atención 24/7</span>
              </motion.div>
            </motion.div>
            
            {/* Columna de imagen */}
            <motion.div 
              className="w-full md:w-1/2 flex justify-center relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={heroInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.5, type: "spring" }}
            >
              <motion.img 
                src="/images/div.svg" 
                alt="Cuidado dental de vanguardia" 
                className="rounded-lg shadow-lg max-w-full object-cover z-10"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
              />
            </motion.div>
          </div>
        </div>
      </motion.section>

      <motion.section 
        className="bg-white pt-16 pb-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Sección de contacto con la clínica */}
          <div className="mb-20">
            <motion.h2 
              className="text-2xl md:text-3xl font-bold text-[#0E6B96] mb-10 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Contáctanos
            </motion.h2>
            
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              {/* Tabs de navegación */}
              <div className="flex">
                <motion.button 
                  className={`flex-1 py-4 text-center font-medium ${activeForm === 'clinic' ? 'bg-[#0E6B96] text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                  whileHover={activeForm !== 'clinic' ? { y: -2 } : {}}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveForm('clinic')}
                >
                  Contacto con la Clínica
                </motion.button>
                <motion.button 
                  className={`flex-1 py-4 text-center font-medium ${activeForm === 'developer' ? 'bg-[#0E6B96] text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                  whileHover={activeForm !== 'developer' ? { y: -2 } : {}}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveForm('developer')}
                >
                  Contacto con Desarrolladores
                </motion.button>
              </div>
              
              {/* Contenido de los tabs */}
              <div className="p-6">
                {/* Formulario de contacto con la clínica */}
                {activeForm === 'clinic' && (
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.4 }}
                    ref={clinicFormRef}
                  >
                    <h3 className="text-xl text-[#0E6B96] font-bold mb-6">Contacto con la Clínica Dental</h3>
                    
                    {formSubmitted ? (
                      <motion.div 
                        className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <strong className="font-bold">¡Mensaje enviado con éxito!</strong>
                        <span className="block sm:inline"> Nos pondremos en contacto contigo lo antes posible.</span>
                      </motion.div>
                    ) : (
                      <form onSubmit={handleClinicFormSubmit}>
                        {/* Campos nombre y email */}
                        <div className="flex flex-col md:flex-row gap-4 mb-4">
                          {/* Campo nombre */}
                          <motion.div 
                            className="w-full md:w-1/2"
                            initial={{ opacity: 0, y: 20 }}
                            animate={clinicFormInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.4, delay: 0.1 }}
                          >
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
                          </motion.div>
                          
                          {/* Campo email */}
                          <motion.div 
                            className="w-full md:w-1/2"
                            initial={{ opacity: 0, y: 20 }}
                            animate={clinicFormInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.4, delay: 0.2 }}
                          >
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
                          </motion.div>
                        </div>
                        
                        {/* Campo teléfono */}
                        <motion.div 
                          className="mb-4"
                          initial={{ opacity: 0, y: 20 }}
                          animate={clinicFormInView ? { opacity: 1, y: 0 } : {}}
                          transition={{ duration: 0.4, delay: 0.3 }}
                        >
                          <input
                            type="tel"
                            id="clinic-phone"
                            name="phone"
                            value={clinicForm.phone}
                            onChange={handleClinicFormChange}
                            className="w-full px-3 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0E6B96] text-gray-500"
                            placeholder="Teléfono"
                          />
                        </motion.div>
                        
                        {/* Campo mensaje */}
                        <motion.div 
                          className="mb-4"
                          initial={{ opacity: 0, y: 20 }}
                          animate={clinicFormInView ? { opacity: 1, y: 0 } : {}}
                          transition={{ duration: 0.4, delay: 0.4 }}
                        >
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
                        </motion.div>
                        
                        {/* Botón de envío */}
                        <motion.div 
                          className="text-right"
                          initial={{ opacity: 0, y: 20 }}
                          animate={clinicFormInView ? { opacity: 1, y: 0 } : {}}
                          transition={{ duration: 0.4, delay: 0.5 }}
                        >
                          <motion.button
                            type="submit"
                            className="bg-[#0EB19B] text-white font-medium py-2 px-8 rounded-lg hover:bg-[#0a9384] transition duration-300"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            Enviar mensaje
                          </motion.button>
                        </motion.div>
                      </form>
                    )}
                  </motion.div>
                )}
                
                {/* Formulario de contacto con desarrolladores */}
                {activeForm === 'developer' && (
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4 }}
                    ref={devFormRef}
                  >
                    <h3 className="text-xl text-[#0E6B96] font-bold mb-6">Contacto con Desarrolladores</h3>
                    
                    {formSubmitted ? (
                      <motion.div 
                        className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <strong className="font-bold">¡Mensaje enviado con éxito!</strong>
                        <span className="block sm:inline"> Nos pondremos en contacto contigo lo antes posible.</span>
                      </motion.div>
                    ) : (
                      <form onSubmit={handleDeveloperFormSubmit}>
                        {/* Campos nombre y email */}
                        <div className="flex flex-col md:flex-row gap-4 mb-4">
                          {/* Campo nombre */}
                          <motion.div 
                            className="w-full md:w-1/2"
                            initial={{ opacity: 0, y: 20 }}
                            animate={devFormInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.4, delay: 0.1 }}
                          >
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
                          </motion.div>
                          
                          {/* Campo email */}
                          <motion.div 
                            className="w-full md:w-1/2"
                            initial={{ opacity: 0, y: 20 }}
                            animate={devFormInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.4, delay: 0.2 }}
                          >
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
                          </motion.div>
                        </div>
                        
                        {/* Campo teléfono */}
                        <motion.div 
                          className="mb-4"
                          initial={{ opacity: 0, y: 20 }}
                          animate={devFormInView ? { opacity: 1, y: 0 } : {}}
                          transition={{ duration: 0.4, delay: 0.3 }}
                        >
                          <input
                            type="tel"
                            id="dev-phone"
                            name="phone"
                            value={developerForm.phone}
                            onChange={handleDeveloperFormChange}
                            className="w-full px-3 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0E6B96] text-gray-500"
                            placeholder="Teléfono"
                          />
                        </motion.div>
                        
                        {/* Campo mensaje */}
                        <motion.div 
                          className="mb-4"
                          initial={{ opacity: 0, y: 20 }}
                          animate={devFormInView ? { opacity: 1, y: 0 } : {}}
                          transition={{ duration: 0.4, delay: 0.4 }}
                        >
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
                        </motion.div>
                        
                        {/* Botón de envío */}
                        <motion.div 
                          className="text-right"
                          initial={{ opacity: 0, y: 20 }}
                          animate={devFormInView ? { opacity: 1, y: 0 } : {}}
                          transition={{ duration: 0.4, delay: 0.5 }}
                        >
                          <motion.button
                            type="submit"
                            className="bg-[#0EB19B] text-white font-medium py-2 px-8 rounded-lg hover:bg-[#0a9384] transition duration-300"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            Enviar mensaje
                          </motion.button>
                        </motion.div>
                      </form>
                    )}
                  </motion.div>
                )}
              </div>
            </div>
          </div>
          
          {/* Sección del mapa */}
          <motion.div 
            className="mb-10"
            ref={mapRef}
            initial={{ opacity: 0, y: 50 }}
            animate={mapInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <motion.h2 
              className="text-2xl md:text-3xl font-bold text-[#0E6B96] mb-10 text-center"
              initial={{ opacity: 0 }}
              animate={mapInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Encuéntranos aquí
            </motion.h2>
            
            <motion.div 
              className="bg-gray-300 rounded-lg overflow-hidden h-96"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={mapInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
            >
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
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
      
      <Footer />
    </>
  );
};

export default ContactPage;
