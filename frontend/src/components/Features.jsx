// Componente para la sección de características "Por qué un software hecho a medida?"
const Features = () => {
  // Lista de características de la columna izquierda
  const leftFeatures = [
    {
      id: 1,
      title: 'Adaptado al funcionamiento real de la clínica',
      description: 'Este sistema fue desarrollado para alinearse al 100% con los procesos internos de la Clínica Dra. Cindy Padilla, sin obligar al equipo a adaptarse a soluciones genéricas.'
    },
    {
      id: 2,
      title: 'Optimiza el trabajo del personal',
      description: 'Desde la recepción hasta el consultorio, cada función está pensada para facilitar el trabajo diario y mejorar la coordinación del equipo.'
    },
    {
      id: 3,
      title: 'Mejora la atención al paciente',
      description: 'El software permite una experiencia más organizada, fluida y profesional para cada paciente, reflejando el compromiso de la clínica con una atención de calidad.'
    }
  ];

  // Lista de características de la columna derecha
  const rightFeatures = [
    {
      id: 4,
      title: 'Elimina lo innecesario',
      description: 'A diferencia de plataformas generales, este sistema contiene solo las herramientas que realmente se usan en el día a día, evitando distracciones y sobrecarga.'
    },
    {
      id: 5,
      title: 'Crecimiento a medida de la clínica',
      description: 'Fue diseñado para acompañar la evolución de la Clínica Dra. Cindy Padilla, permitiendo escalar funciones, integrar nuevas áreas o incorporar mejoras con facilidad.'
    },
    {
      id: 6,
      title: 'Control total y personalización constante',
      description: 'Al ser un desarrollo propio, la Clínica Dra. Cindy Padilla puede ajustar el sistema según sus necesidades operativas y estratégicas en cualquier momento.'
    }
  ];

  // Función para renderizar cada característica
  const renderFeature = (feature) => (
    <div key={feature.id} className="flex items-start mb-16 last:mb-0">
      <div className="flex-shrink-0 mr-4">
        <div className="w-12 h-12 rounded-full bg-[#0EB19B] flex items-center justify-center shadow-md">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
      </div>
      <div className="flex-grow">
        <h3 className="text-white font-medium text-xl mb-2">{feature.title}</h3>
        <p className="text-white text-base">{feature.description}</p>
      </div>
    </div>
  );

  return (
    <section className="bg-[#0E6B96] py-16" id="caracteristicas">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="text-center text-white text-5xl font-bold mb-16">
          ¿Por qué un software hecho a<br />medida?
        </h2>
        
        <div className="relative">
          {/* Línea divisoria vertical */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/20 hidden md:block"></div>
          
          {/* Grid de características */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Columna izquierda */}
            <div className="space-y-12 md:pr-12">
              {leftFeatures.map(renderFeature)}
            </div>
            
            {/* Columna derecha */}
            <div className="space-y-12 md:pl-12">
              {rightFeatures.map(renderFeature)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
