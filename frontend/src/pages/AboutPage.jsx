import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const AboutPage = () => {
  return (
    <>
      <Header />
      
      <section className="bg-white pt-32 pb-16" id="sobre-nosotros">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Primera sección - Historia */}
          <div className="flex flex-col md:flex-row items-center gap-12">
            {/* Columna izquierda - Texto */}
            <div className="w-full md:w-1/2">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                <span className="text-[#0E6B96]">Conoce</span> <span className="text-[#0EB19B]">Nuestra<br />Historia</span>
              </h2>
              <p className="text-gray-600 mb-6 text-sm md:text-base leading-relaxed">
                Con el desarrollo de nuestro software, estamos dando un paso hacia el futuro de la 
                atención dental, enfocándonos en mejorar la eficiencia operativa de la clínica y la 
                experiencia de cada paciente. Buscamos optimizar procesos, reducir tiempos de 
                espera y facilitar la gestión de información médica, todo con el objetivo de ofrecer 
                una atención más ágil, precisa y centrada en el bienestar. Esta transformación 
                tecnológica no solo mejora el presente, sino que prepara el camino para una 
                odontología más conectada, inteligente y humana.
              </p>
            </div>
            
            {/* Columna derecha - Imagen y gráfica */}
            <div className="w-full md:w-1/2 flex items-center justify-center relative">
              {/* Imagen principal */}
              <img 
                src="/images/doctor-atendiendo-paciente.svg" 
                alt="Doctor atendiendo paciente" 
                className="w-full rounded-md z-10"
              />
              
              {/* Imagen de gráfica/ilustración a la derecha */}
              <div className="absolute right-0 bottom-0 w-1/2 z-20">
                <img 
                  src="/images/ilustracion-dental.svg" 
                  alt="Ilustración dental" 
                  className="w-full"
                />
              </div>
            </div>
          </div>
          
          {/* Sección "¿Qué es Omega?" */}
          <div className="mt-24 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-[#0E6B96] mb-12">
              ¿Qué es Omega?
            </h2>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 mb-16">
              <h3 className="text-xl font-semibold text-[#0E6B96] mb-4">
                Sistema Omega
              </h3>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Una solución integral para la gestión dental desarrollada por expertos en
                tecnología y odontología
              </p>
            </div>
            
            {/* Grid de características */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Característica 1 */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="bg-[#EBF7FF] p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <img 
                    src="/images/icon-tech.svg" 
                    alt="Tecnología Avanzada" 
                    className="w-8 h-8" 
                  />
                </div>
                <h3 className="text-[#0E6B96] font-semibold mb-2">Tecnología Avanzada</h3>
                <p className="text-gray-600 text-sm">
                  Desarrollado con las últimas tecnologías para garantizar un rendimiento óptimo y seguridad de datos.
                </p>
              </div>
              
              {/* Característica 2 */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="bg-[#E6F7F5] p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <img 
                    src="/images/icon-code.svg" 
                    alt="Equipo de Desarrollo" 
                    className="w-8 h-8" 
                  />
                </div>
                <h3 className="text-[#0E6B96] font-semibold mb-2">Equipo de Desarrollo</h3>
                <p className="text-gray-600 text-sm">
                  Un equipo de desarrolladores expertos trabajando constantemente en mejoras y nuevas funcionalidades.
                </p>
              </div>
              
              {/* Característica 3 */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="bg-[#EBF7FF] p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <img 
                    src="/images/icon-support.svg" 
                    alt="Soporte 24/7" 
                    className="w-8 h-8" 
                  />
                </div>
                <h3 className="text-[#0E6B96] font-semibold mb-2">Soporte 24/7</h3>
                <p className="text-gray-600 text-sm">
                  Asistencia técnica disponible en todo momento para resolver cualquier inquietud.
                </p>
              </div>
            </div>
          </div>
          
        </div>
      </section>
      
      {/* Sección de la clínica - Ahora fuera del contenedor principal para ocupar todo el ancho */}
      <section className="bg-[#0E6B96] text-white w-full py-28 min-h-[600px]">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row items-center md:items-start justify-between">
            {/* Logo */}
            <div className="w-full md:w-1/3 text-center md:text-left mb-8 md:mb-0">
              <img 
                src="/images/logo-dra-cindy-padilla.svg" 
                alt="Logo Dra. Cindy Padilla" 
                className="h-48 md:h-76 inline-block"
              />
            </div>
            
            {/* Información */}
            <div className="w-full md:w-2/3 md:pl-12">
              <h2 className="text-3xl font-bold mb-4">
                Clínica Dra. Cindy Padilla
              </h2>
              <p className="mb-8 text-[#E6F9F6] text-sm md:text-base">
                Nuestra clínica dental está equipada con la más moderna tecnología y 
                cuenta con profesionales altamente capacitados para brindar el mejor 
                servicio a nuestros pacientes.
              </p>
              
              <ul className="space-y-4">
                <li className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-[#0EB19B] flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <span className="text-sm md:text-base">Tecnología de última generación</span>
                </li>
                <li className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-[#0EB19B] flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <span className="text-sm md:text-base">Profesionales certificados</span>
                </li>
                <li className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-[#0EB19B] flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <span className="text-sm md:text-base">Atención personalizada</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </>
  );
};

export default AboutPage;
