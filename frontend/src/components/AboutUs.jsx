// Componente para la sección "Conoce Nuestra Historia"
const AboutUs = () => {
  return (
    <section className="bg-white py-16" id="sobre-nosotros">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Columna izquierda - Texto */}
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0EB19B] mb-6">
              Conoce Nuestra<br />Historia
            </h2>
            <p className="text-gray-600 mb-6 text-sm md:text-base leading-relaxed">
              Con el desarrollo de nuestro software, entramos donde un piloto hacia el futuro de la 
              atención dental, enfocándonos en mejorar la eficiencia operativa mientras nos 
              apoyamos en el calor humano. Inspirados por las necesidades reales de clínicas y 
              pacientes, este sistema aprovecha al máximo los recursos disponibles, mejora tiempos de 
              respuesta, optimiza procesos internos y elimina duplicaciones de tareas. Todo 
              desarrollado desde cero, pensado y diseñado en la localidad y sus características, 
              entendiendo que cada sonrisa tiene una historia única y que cada persona merece una 
              odontología más conectada, inteligente y humana.
            </p>
          </div>
          
          {/* Columna derecha - Imagen y gráfica */}
          <div className="w-full md:w-1/2 flex items-center justify-center relative">
            {/* Imagen principal */}
            <img 
              src="/images/doctor-atendiendo-paciente.jpg" 
              alt="Doctor atendiendo paciente" 
              className="w-full md:w-3/4 rounded-md shadow-md z-10"
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
          <h2 className="text-3xl md:text-4xl font-bold text-[#0E6B96] mb-10">
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
                Tecnología con las últimas tecnologías para garantizar un rendimiento óptimo y seguidad de datos.
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
                Un equipo de desarrolladores expertos trabajan constantemente en mejoras y nuevas funcionalidades.
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
  );
};

export default AboutUs;
