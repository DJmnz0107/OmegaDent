// Componente para la sección de servicios "¿Qué servicios ofrece la clínica?"
const Services = () => {
  // Lista de servicios que ofrece la clínica
  const servicesList = [
    {
      id: 1,
      title: 'Prevención y diagnóstico',
      description: 'Exámenes completos, radiografías y limpiezas para mantener tu salud bucal en óptimas condiciones.',
      icon: (
        <img src="/images/service-checklist.svg" alt="Lista de verificación" className="w-12 h-12" />
      )
    },
    {
      id: 2,
      title: 'Tratamientos generales y restaurativos',
      description: 'Empastes, endodoncias y tratamientos para devolver la funcionalidad a tus dientes.',
      icon: (
        <img src="/images/tratamientos-generales.svg" alt="tratamientos generales y restaurativos" className="w-12 h-12" />
      )
    },
    {
      id: 3,
      title: 'Estética dental',
      description: 'Blanqueamientos, carillas y procedimientos para mejorar la apariencia de tu sonrisa.',
      icon: (
        <img src="/images/estetica-dental.svg" alt="estética dental" className="w-12 h-12" />

      )
    },
    {
      id: 4,
      title: 'Ortodoncia y corrección funcional',
      description: 'Brackets, alineadores y tratamientos para corregir la posición de tus dientes.',
      icon: (
        <img src="/images/ortodoncia-funcional.svg" alt="Ortodoncia y corrección funcional" className="w-12 h-12" />
      )
    },
    {
      id: 5,
      title: 'Cirugías e implantes',
      description: 'Extracciones, implantes dentales y procedimientos quirúrgicos avanzados.',
      icon: (
        <img src="/images/service-implant.svg" alt="Implante dental" className="w-12 h-12" />
      )
    },
    {
      id: 6,
      title: 'Atención especializada por edad',
      description: 'Tratamientos adaptados para niños, adultos y personas mayores según sus necesidades específicas.',
      icon: (
        <img src="/images/service-child.svg" alt="Niño sonriente" className="w-12 h-12" />
      )
    },
  ];

  return (
    <section className="bg-white py-16" id="servicios">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="w-full text-center py-4 px-6 bg-[#E6F7F5] rounded-md mb-12">
          <h2 className="text-xl text-[#0E6B96] font-medium">
            ¿Qué servicios ofrece la clínica?
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {servicesList.map((service) => (
            <div key={service.id} className="bg-white p-5 rounded-md shadow-sm flex flex-col md:flex-row gap-5 border border-gray-100">
              <div className="flex-shrink-0 flex justify-center">
                {service.icon}
              </div>
              <div className="flex-grow">
                <h3 className="text-[#0E6B96] font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                <button className="bg-[#E6F7F5] text-[#0EB19B] py-2 px-5 rounded-full text-sm font-medium hover:bg-[#0EB19B] hover:text-white transition-colors">
                  Conocer más
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
