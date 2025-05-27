// Componente para la sección de servicios "¿Qué servicios ofrece la clínica?"
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  buttonAnimation,
  rotateAnimation,
  staggerContainer, 
  staggerItem
} from '../utils/animations';

const Services = () => {
  // Lista de servicios que ofrece la clínica
  const servicesList = [
    {
      id: 1,
      title: 'Prevención y diagnóstico',
      description: 'Exámenes completos, radiografías y limpiezas para mantener tu salud bucal en óptimas condiciones.',
      icon: (
        <motion.img 
          src="/images/service-checklist.svg" 
          alt="Lista de verificación" 
          className="w-12 h-12" 
          {...rotateAnimation}
        />
      )
    },
    {
      id: 2,
      title: 'Tratamientos generales y restaurativos',
      description: 'Empastes, endodoncias y tratamientos para devolver la funcionalidad a tus dientes.',
      icon: (
        <motion.img 
          src="/images/tratamientos-generales.svg" 
          alt="tratamientos generales y restaurativos" 
          className="w-12 h-12" 
          {...rotateAnimation}
        />
      )
    },
    {
      id: 3,
      title: 'Estética dental',
      description: 'Blanqueamientos, carillas y procedimientos para mejorar la apariencia de tu sonrisa.',
      icon: (
        <motion.img 
          src="/images/estetica-dental.svg" 
          alt="estética dental" 
          className="w-12 h-12" 
          {...rotateAnimation}
        />
      )
    },
    {
      id: 4,
      title: 'Ortodoncia y corrección funcional',
      description: 'Brackets, alineadores y tratamientos para corregir la posición de tus dientes.',
      icon: (
        <motion.img 
          src="/images/ortodoncia-funcional.svg" 
          alt="Ortodoncia y corrección funcional" 
          className="w-12 h-12" 
          {...rotateAnimation}
        />
      )
    },
    {
      id: 5,
      title: 'Cirugías e implantes',
      description: 'Extracciones, implantes dentales y procedimientos quirúrgicos avanzados.',
      icon: (
        <motion.img 
          src="/images/service-implant.svg" 
          alt="Implante dental" 
          className="w-12 h-12" 
          {...rotateAnimation}
        />
      )
    },
    {
      id: 6,
      title: 'Atención especializada por edad',
      description: 'Tratamientos adaptados para niños, adultos y personas mayores según sus necesidades específicas.',
      icon: (
        <motion.img 
          src="/images/service-child.svg" 
          alt="Niño sonriente" 
          className="w-12 h-12" 
          {...rotateAnimation}
        />
      )
    },
  ];

  return (
    <motion.section 
      className="bg-white py-16" 
      id="servicios"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div 
          className="w-full text-center py-4 px-6 bg-[#E6F7F5] rounded-md mb-12"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2 
            className="text-xl text-[#0E6B96] font-medium"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            ¿Qué servicios ofrece la clínica?
          </motion.h2>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          {servicesList.map((service, index) => (
            <motion.div 
              key={service.id} 
              className="bg-white p-5 rounded-md shadow-sm flex flex-col md:flex-row gap-5 border border-gray-100"
              variants={staggerItem}
              custom={index}
              whileHover={{ 
                y: -5, 
                boxShadow: "0 10px 25px -5px rgba(14, 107, 150, 0.1), 0 8px 10px -6px rgba(14, 107, 150, 0.1)",
                borderColor: "#0EB19B"
              }}
              transition={{ duration: 0.3 }}
            >
              <motion.div 
                className="flex-shrink-0 flex justify-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  delay: index * 0.1 + 0.3,
                  type: "spring",
                  stiffness: 260,
                  damping: 20
                }}
              >
                {service.icon}
              </motion.div>
              <div className="flex-grow">
                <motion.h3 
                  className="text-[#0E6B96] font-semibold mb-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                >
                  {service.title}
                </motion.h3>
                <motion.p 
                  className="text-gray-600 text-sm mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.5, duration: 0.5 }}
                >
                  {service.description}
                </motion.p>
                <motion.button 
                  className="bg-[#E6F7F5] text-[#0EB19B] py-2 px-5 rounded-full text-sm font-medium hover:bg-[#0EB19B] hover:text-white transition-colors"
                  {...buttonAnimation}
                >
                  Conocer más
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Botón de "Ver todos los servicios" */}
        <motion.div 
          className="text-center mt-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <Link to="/servicios">
            <motion.button 
              className="bg-[#0E6B96] text-white py-3 px-8 rounded-full text-sm font-medium hover:bg-[#0c5a80] transition-colors shadow-md"
              whileHover={{ scale: 1.05, boxShadow: "0 15px 25px -5px rgba(14, 107, 150, 0.2)" }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              Ver todos nuestros servicios
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Services;
