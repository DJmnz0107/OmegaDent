import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const AboutPage = () => {
  // Referencias para las animaciones basadas en scroll
  const [historyRef, historyInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [historyImgRef, historyImgInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [omegaRef, omegaInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [featuresRef, featuresInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [clinicRef, clinicInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const featureAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.3 + (i * 0.1),
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  const listItemAnimation = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.2 + (i * 0.15),
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  return (
    <>
      <Header />
      
      <motion.section 
        className="bg-white pt-32 pb-16" 
        id="sobre-nosotros"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Primera sección - Historia */}
          <div className="flex flex-col md:flex-row items-center gap-12">
            {/* Columna izquierda - Texto */}
            <motion.div 
              className="w-full md:w-1/2"
              ref={historyRef}
              initial={{ opacity: 0, x: -50 }}
              animate={historyInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7 }}
            >
              <motion.h2 
                className="text-3xl md:text-5xl font-bold mb-6"
                initial={{ opacity: 0, y: 30 }}
                animate={historyInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <motion.span 
                  className="text-[#0E6B96]"
                  initial={{ opacity: 0 }}
                  animate={historyInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  Conoce
                </motion.span>{" "}
                <motion.span 
                  className="text-[#0EB19B]"
                  initial={{ opacity: 0 }}
                  animate={historyInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  Nuestra<br />Historia
                </motion.span>
              </motion.h2>
              <motion.p 
                className="text-gray-600 mb-6 text-sm md:text-base leading-relaxed"
                initial={{ opacity: 0 }}
                animate={historyInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                Con el desarrollo de nuestro software, estamos dando un paso hacia el futuro de la 
                atención dental, enfocándonos en mejorar la eficiencia operativa de la clínica y la 
                experiencia de cada paciente. Buscamos optimizar procesos, reducir tiempos de 
                espera y facilitar la gestión de información médica, todo con el objetivo de ofrecer 
                una atención más ágil, precisa y centrada en el bienestar. Esta transformación 
                tecnológica no solo mejora el presente, sino que prepara el camino para una 
                odontología más conectada, inteligente y humana.
              </motion.p>
            </motion.div>
            
            {/* Columna derecha - Imagen y gráfica */}
            <motion.div 
              className="w-full md:w-1/2 flex items-center justify-center relative"
              ref={historyImgRef}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={historyImgInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              {/* Imagen principal */}
              <motion.img 
                src="/images/doctor-atendiendo-paciente.svg" 
                alt="Doctor atendiendo paciente" 
                className="w-full rounded-md z-10"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
              />
              
              {/* Imagen de gráfica/ilustración a la derecha */}
              <motion.div 
                className="absolute right-0 bottom-0 w-1/2 z-20"
                initial={{ opacity: 0, y: 50, rotate: -5 }}
                animate={historyImgInView ? { opacity: 1, y: 0, rotate: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.6, type: "spring" }}
              >
                <motion.img 
                  src="/images/ilustracion-dental.svg" 
                  alt="Ilustración dental" 
                  className="w-full"
                  whileHover={{ 
                    rotate: 5, 
                    transition: { duration: 0.5, type: "spring", stiffness: 300 } 
                  }}
                />
              </motion.div>
            </motion.div>
          </div>
          
          {/* Sección "¿Qué es Omega?" */}
          <motion.div 
            className="mt-24 text-center"
            ref={omegaRef}
            initial={{ opacity: 0, y: 50 }}
            animate={omegaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-bold text-[#0E6B96] mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={omegaInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              ¿Qué es Omega?
            </motion.h2>
            
            <motion.div 
              className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={omegaInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ 
                boxShadow: "0 10px 25px -5px rgba(14, 107, 150, 0.1), 0 8px 10px -6px rgba(14, 107, 150, 0.1)",
                y: -5
              }}
            >
              <motion.h3 
                className="text-xl font-semibold text-[#0E6B96] mb-4"
                initial={{ opacity: 0 }}
                animate={omegaInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                Sistema Omega
              </motion.h3>
              <motion.p 
                className="text-gray-600 max-w-3xl mx-auto"
                initial={{ opacity: 0 }}
                animate={omegaInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                Una solución integral para la gestión dental desarrollada por expertos en
                tecnología y odontología
              </motion.p>
            </motion.div>
            
            {/* Grid de características */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
              ref={featuresRef}
              initial={{ opacity: 0 }}
              animate={featuresInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5 }}
            >
              {/* Característica 1 */}
              <motion.div 
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
                custom={0}
                variants={featureAnimation}
                initial="hidden"
                animate={featuresInView ? "visible" : "hidden"}
                whileHover={{ 
                  y: -10, 
                  boxShadow: "0 10px 25px -5px rgba(14, 107, 150, 0.1), 0 8px 10px -6px rgba(14, 107, 150, 0.1)" 
                }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
              >
                <motion.div 
                  className="bg-[#EBF7FF] p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.8 }}
                >
                  <motion.img 
                    src="/images/icon-tech.svg" 
                    alt="Tecnología Avanzada" 
                    className="w-8 h-8" 
                    initial={{ scale: 0 }}
                    animate={featuresInView ? { scale: 1 } : {}}
                    transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
                  />
                </motion.div>
                <motion.h3 
                  className="text-[#0E6B96] font-semibold mb-2"
                  initial={{ opacity: 0 }}
                  animate={featuresInView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.7 }}
                >
                  Tecnología Avanzada
                </motion.h3>
                <motion.p 
                  className="text-gray-600 text-sm"
                  initial={{ opacity: 0 }}
                  animate={featuresInView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.8 }}
                >
                  Desarrollado con las últimas tecnologías para garantizar un rendimiento óptimo y seguridad de datos.
                </motion.p>
              </motion.div>
              
              {/* Característica 2 */}
              <motion.div 
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
                custom={1}
                variants={featureAnimation}
                initial="hidden"
                animate={featuresInView ? "visible" : "hidden"}
                whileHover={{ 
                  y: -10, 
                  boxShadow: "0 10px 25px -5px rgba(14, 107, 150, 0.1), 0 8px 10px -6px rgba(14, 107, 150, 0.1)" 
                }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
              >
                <motion.div 
                  className="bg-[#EBF7FF] p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.8 }}
                >
                  <motion.img 
                    src="/images/icon-experience.svg" 
                    alt="Experiencia Intuitiva" 
                    className="w-8 h-8" 
                    initial={{ scale: 0 }}
                    animate={featuresInView ? { scale: 1 } : {}}
                    transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
                  />
                </motion.div>
                <motion.h3 
                  className="text-[#0E6B96] font-semibold mb-2"
                  initial={{ opacity: 0 }}
                  animate={featuresInView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.8 }}
                >
                  Experiencia Intuitiva
                </motion.h3>
                <motion.p 
                  className="text-gray-600 text-sm"
                  initial={{ opacity: 0 }}
                  animate={featuresInView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.9 }}
                >
                  Interfaz fácil de usar diseñada pensando en la experiencia del usuario.
                </motion.p>
              </motion.div>
              
              {/* Característica 3 */}
              <motion.div 
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
                custom={2}
                variants={featureAnimation}
                initial="hidden"
                animate={featuresInView ? "visible" : "hidden"}
                whileHover={{ 
                  y: -10, 
                  boxShadow: "0 10px 25px -5px rgba(14, 107, 150, 0.1), 0 8px 10px -6px rgba(14, 107, 150, 0.1)" 
                }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
              >
                <motion.div 
                  className="bg-[#EBF7FF] p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.8 }}
                >
                  <motion.img 
                    src="/images/icon-support.svg" 
                    alt="Soporte 24/7" 
                    className="w-8 h-8" 
                    initial={{ scale: 0 }}
                    animate={featuresInView ? { scale: 1 } : {}}
                    transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
                  />
                </motion.div>
                <motion.h3 
                  className="text-[#0E6B96] font-semibold mb-2"
                  initial={{ opacity: 0 }}
                  animate={featuresInView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.9 }}
                >
                  Soporte 24/7
                </motion.h3>
                <motion.p 
                  className="text-gray-600 text-sm"
                  initial={{ opacity: 0 }}
                  animate={featuresInView ? { opacity: 1 } : {}}
                  transition={{ delay: 1 }}
                >
                  Asistencia técnica disponible en todo momento para resolver cualquier inquietud.
                </motion.p>
              </motion.div>
            </motion.div>
          </motion.div>
          
        </div>
      </motion.section>
      
      {/* Sección de la clínica - Ahora fuera del contenedor principal para ocupar todo el ancho */}
      <motion.section 
        className="bg-[#0E6B96] text-white w-full py-28 min-h-[600px]"
        ref={clinicRef}
        initial={{ opacity: 0 }}
        animate={clinicInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row items-center md:items-start justify-between">
            {/* Logo */}
            <motion.div 
              className="w-full md:w-1/3 text-center md:text-left mb-8 md:mb-0"
              initial={{ opacity: 0, x: -50 }}
              animate={clinicInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <motion.img 
                src="/images/logo-dra-cindy-padilla.svg" 
                alt="Logo Dra. Cindy Padilla" 
                className="h-48 md:h-76 inline-block"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
              />
            </motion.div>
            
            {/* Información */}
            <motion.div 
              className="w-full md:w-2/3 md:pl-12"
              initial={{ opacity: 0, x: 50 }}
              animate={clinicInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              <motion.h2 
                className="text-3xl font-bold mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={clinicInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                Clínica Dra. Cindy Padilla
              </motion.h2>
              <motion.p 
                className="mb-8 text-[#E6F9F6] text-sm md:text-base"
                initial={{ opacity: 0 }}
                animate={clinicInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                Nuestra clínica dental está equipada con la más moderna tecnología y 
                cuenta con profesionales altamente capacitados para brindar el mejor 
                servicio a nuestros pacientes.
              </motion.p>
              
              <motion.ul className="space-y-4">
                <motion.li 
                  className="flex items-center"
                  custom={0}
                  variants={listItemAnimation}
                  initial="hidden"
                  animate={clinicInView ? "visible" : "hidden"}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                >
                  <motion.div 
                    className="w-6 h-6 rounded-full bg-[#0EB19B] flex items-center justify-center mr-3"
                    whileHover={{ scale: 1.2 }}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                  >
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </motion.div>
                  <span className="text-sm md:text-base">Tecnología de última generación</span>
                </motion.li>
                <motion.li 
                  className="flex items-center"
                  custom={1}
                  variants={listItemAnimation}
                  initial="hidden"
                  animate={clinicInView ? "visible" : "hidden"}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                >
                  <motion.div 
                    className="w-6 h-6 rounded-full bg-[#0EB19B] flex items-center justify-center mr-3"
                    whileHover={{ scale: 1.2 }}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                  >
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </motion.div>
                  <span className="text-sm md:text-base">Profesionales certificados</span>
                </motion.li>
                <motion.li 
                  className="flex items-center"
                  custom={2}
                  variants={listItemAnimation}
                  initial="hidden"
                  animate={clinicInView ? "visible" : "hidden"}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                >
                  <motion.div 
                    className="w-6 h-6 rounded-full bg-[#0EB19B] flex items-center justify-center mr-3"
                    whileHover={{ scale: 1.2 }}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                  >
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </motion.div>
                  <span className="text-sm md:text-base">Atención personalizada</span>
                </motion.li>
              </motion.ul>
            </motion.div>
          </div>
        </div>
      </motion.section>
      
      <Footer />
    </>
  );
};

export default AboutPage;
