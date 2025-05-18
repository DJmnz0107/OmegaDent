import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

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
      
      {/* Hero Section con gradiente azul */}
      <section className="pt-32 pb-16 bg-gradient-to-r from-[#0A2F43] to-[#0E6B96]">
        <div className="container mx-auto px-4 max-w-6xl text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Nuestros Servicios Dentales
          </h1>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Tecnología avanzada y atención personalizada para tu sonrisa perfecta
          </p>
          
          {/* Call to Action */}
          <div className="mt-8">
            <h3 className="text-xl font-medium mb-4">
              ¿Listo para mejorar tu sonrisa?
            </h3>
            <button className="bg-[#0EB19B] hover:bg-[#0c9e8a] text-white py-2 px-6 rounded-full font-medium">
              Agenda tu cita hoy y descubre la diferencia de nuestro servicio profesional
            </button>
          </div>
        </div>
      </section>
      
      {/* Grid de Servicios */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <div 
                key={service.id}
                className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4">
                    <img 
                      src={service.icon} 
                      alt={service.name} 
                      className="w-12 h-12 text-[#0E6B96]"
                    />
                  </div>
                  <h3 className="text-[#0E6B96] font-semibold mb-2">{service.name}</h3>
                  <p className="text-gray-600 text-sm">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <Footer />
    </>
  );
};

export default ServicesPage;
