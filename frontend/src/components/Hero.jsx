// Componente Hero para la sección principal con imagen destacada
const Hero = () => {
  return (
    <section className="pt-32 pb-20 bg-white border-b border-gray-100" id="inicio">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="w-full md:w-1/2 mb-8 md:mb-0 md:pr-8 max-w-lg">
            <h1 className="text-[#0E6B96] font-bold text-4xl md:text-5xl mb-4">
              Bienvenido a<br />OmegaDent
            </h1>
            <h2 className="text-[#0E6B96] font-medium text-xl md:text-2xl mb-5">
              Mejoramos la atención dental para clínicas y pacientes.
            </h2>
            <p className="text-gray-700 mb-8 text-sm md:text-base leading-relaxed max-w-lg">
              Omega es una aplicación pensada para optimizar la experiencia dental 
              desde ambos lados: clínicas y usuarios. Para los profesionales, ofrece 
              herramientas para gestionar citas, historiales clínicos y seguimiento de 
              tratamientos. Para los pacientes, facilita la reserva de turnos, el acceso a 
              su información médica y una comunicación más fluida con su dentista. 
              Todo en un solo lugar, fácil, rápido y seguro.
            </p>
          </div>
          
          <div className="w-full md:w-1/2 relative">
            <img 
              src="/images/dentist-with-patient.jpg" 
              alt="Dentista atendiendo a un paciente" 
              className="rounded-full object-cover w-full max-w-md mx-auto shadow-lg"
            />
            {/* Círculos decorativos idénticos a la primera imagen */}
            <div className="absolute right-0 bottom-0 md:right-[0] md:bottom-0">
              <img
                src="/images/circulo-grande.svg"
                alt="Círculo decorativo grande"
                className="w-[130px] h-[130px]"
                style={{ transform: 'translate(-10%, 50%)' }}
              />
            </div>
            <div className="absolute right-[5px] bottom-[-15px] md:right-[5px] md:bottom-[-15px]">
              <img
                src="/images/circulo-pequeno.svg"
                alt="Círculo decorativo pequeño"
                className="w-[80px] h-[45px]"
                style={{ transform: 'translate(30%, 160%)' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
