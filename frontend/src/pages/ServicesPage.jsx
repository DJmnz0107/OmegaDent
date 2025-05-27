import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const ServicesPage = () => {
  // Lista de servicios dentales basada en la imagen
  const services = [
    {
      id: 1,
      name: 'Limpieza Dental',
      description: 'Eliminación de placa y sarro para mantener una higiene oral óptima.',
      icon: '/images/services/limpieza-dental.svg'
    },
    {
      id: 2,
      name: 'Implantes Dentales',
      description: 'Tratamiento profesional para una sonrisa más brillante y blanca.',
      icon: '/images/services/implantes-dentales.svg'
    },
    {
      id: 3,
      name: 'Ortodoncia',
      description: 'Corrección de la alineación dental con brackets tradicionales o invisibles.',
      icon: '/images/services/ortodoncia.svg'
    },
    {
      id: 4,
      name: 'Endodoncia',
      description: 'Tratamiento de conducto para salvar dientes dañados.',
      icon: '/images/services/endodoncia.svg'
    },
    {
      id: 5,
      name: 'Prótesis dentales',
      description: 'Restauraciones completas para dientes dañados o debilitados.',
      icon: '/images/services/protesis-dentales.svg'
    },
    {
      id: 6,
      name: 'Implantes Dentales',
      description: 'Solución permanente para reemplazar dientes perdidos.',
      icon: '/images/services/implantes-dentales2.svg'
    },
    {
      id: 7,
      name: 'Periodoncia',
      description: 'Tratamiento de enfermedades de las encías.',
      icon: '/images/services/periodoncia.svg'
    },
    {
      id: 8,
      name: 'Tratamientos para caries',
      description: 'Mejora estética para dientes frontales u horadados.',
      icon: '/images/services/tratamientos-caries.svg'
    },
    {
      id: 9,
      name: 'Odontopediatría',
      description: 'Cuidado dental especializado para niños.',
      icon: '/images/services/odontopediatria.svg'
    },
    {
      id: 10,
      name: 'Odontología geriátrica',
      description: 'Diagnósticos precisos con tecnología avanzada.',
      icon: '/images/services/odontologia-geriatrica.svg'
    },
    {
      id: 11,
      name: 'Blanqueamiento dental',
      description: 'Restauración de varios dientes ausentes.',
      icon: '/images/services/blanqueamiento-dental.svg'
    },
    {
      id: 12,
      name: 'Cirugía Oral',
      description: 'Extracciones y procedimientos quirúrgicos.',
      icon: '/images/services/cirugia-oral.svg'
    },
    {
      id: 13,
      name: 'Tratamientos para bruxismo',
      description: 'Tratamientos sin anestesia ni dolor.',
      icon: '/images/services/tratamientos-bruxismo.svg'
    },
    {
      id: 14,
      name: 'Atención de urgencias dentales',
      description: 'Resolución rápida para una sonrisa perfecta.',
      icon: '/images/services/urgencias-dentales.svg'
    },
    {
      id: 15,
      name: 'Prótesis Dentales',
      description: 'Soluciones removibles para dientes ausentes.',
      icon: '/images/services/protesis-dentales2.svg'
    },
    {
      id: 16,
      name: 'Tratamiento ATM',
      description: 'Calma y prevención y educación en salud oral.',
      icon: '/images/services/tratamiento-atm.svg'
    },
  ];

  return (
    <>
      <Header />
      
      {/* Hero Section con imagen de fondo */}
      <motion.section 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 0.8 }}
        className="pt-32 pb-16 relative" 
        style={{
          backgroundImage: 'linear-gradient(to right, rgba(10, 47, 67, 0.85), rgba(14, 107, 150, 0.85)), url(/section_1.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}>
        <div className="container mx-auto px-4 max-w-6xl text-center text-white">
          <motion.h1 
            initial={{ y: -50, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Nuestros Servicios Dentales
          </motion.h1>
          <motion.p 
            initial={{ y: 30, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-lg mb-8 max-w-2xl mx-auto"
          >
            Tecnología avanzada y atención personalizada para tu sonrisa perfecta
          </motion.p>
          
          {/* Call to Action */}
          <div className="mt-8">
            <h3 className="text-xl font-medium mb-4">
              ¿Listo para mejorar tu sonrisa?
            </h3>
            <motion.button 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
              initial={{ y: 20, opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.4 }}
              className="bg-[#0EB19B] hover:bg-[#0c9e8a] text-white py-2 px-6 rounded-full font-medium"
            >
              Agenda tu cita hoy y descubre la diferencia de nuestro servicio profesional
            </motion.button>
          </div>
        </div>
      </motion.section>
      
      {/* Grid de Servicios */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
        className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div 
                key={service.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.05,
                  ease: "easeOut" 
                }}
                whileHover={{ 
                  y: -5, 
                  boxShadow: "0 10px 25px -5px rgba(14, 107, 150, 0.1), 0 8px 10px -6px rgba(14, 107, 150, 0.1)" 
                }}
                className="bg-white/90 backdrop-blur-sm rounded-lg shadow-sm border border-gray-100 p-6 transition-all duration-300"
              >
                <div className="flex flex-col items-center text-center">
                  <motion.div 
                    className="mb-4"
                    whileHover={{ rotate: [0, 5, -5, 0], transition: { duration: 0.5 } }}
                  >
                    <motion.img 
                      initial={{ scale: 0.8 }}
                      whileInView={{ scale: 1 }}
                      transition={{ delay: index * 0.05 + 0.2, duration: 0.3 }}
                      src={service.icon} 
                      alt={service.name} 
                      className="w-12 h-12 text-[#0E6B96]"
                    />
                  </motion.div>
                  <h3 className="text-[#0E6B96] font-semibold mb-2">{service.name}</h3>
                  <p className="text-gray-600 text-sm">{service.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
      
      <Footer />
    </>
  );
};

export default ServicesPage;
