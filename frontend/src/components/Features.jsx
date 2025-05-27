// Componente para la sección de características "Por qué un software hecho a medida?"
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { fadeIn, staggerContainer } from '../utils/animations';

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

  // Referencias para animaciones basadas en scroll
  const [titleRef, titleInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [leftColumnRef, leftColumnInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [rightColumnRef, rightColumnInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [lineRef, lineInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  // Función para renderizar cada característica con animaciones
  const renderFeature = (feature, index) => {
    const delay = 0.2 + (index * 0.1);
    
    return (
      <motion.div 
        key={feature.id} 
        className="flex items-start mb-16 last:mb-0"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
        whileHover={{ scale: 1.02 }}
      >
        <motion.div 
          className="flex-shrink-0 mr-4"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20, delay: delay + 0.1 }}
        >
          <motion.div 
            className="w-12 h-12 rounded-full bg-[#0EB19B] flex items-center justify-center shadow-md"
            whileHover={{ 
              scale: 1.1, 
              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" 
            }}
          >
            <motion.svg 
              className="w-6 h-6 text-white" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, delay: delay + 0.3 }}
            >
              <motion.path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M5 13l4 4L19 7"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, delay: delay + 0.3 }}
              />
            </motion.svg>
          </motion.div>
        </motion.div>
        <div className="flex-grow">
          <motion.h3 
            className="text-white font-medium text-xl mb-2"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: delay + 0.2 }}
          >
            {feature.title}
          </motion.h3>
          <motion.p 
            className="text-white text-base"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: delay + 0.3 }}
          >
            {feature.description}
          </motion.p>
        </div>
      </motion.div>
    );
  };

  return (
    <motion.section 
      className="bg-[#0E6B96] py-16 overflow-hidden" 
      id="caracteristicas"
      {...fadeIn}
    >
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.h2 
          className="text-center text-white text-5xl font-bold mb-16"
          ref={titleRef}
          initial={{ opacity: 0, y: -30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            ¿Por qué un software hecho a
          </motion.span>
          <br />
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            medida?
          </motion.span>
        </motion.h2>
        
        <div className="relative">
          {/* Línea divisoria vertical animada */}
          <motion.div 
            ref={lineRef}
            className="absolute left-1/2 top-0 bottom-0 w-px bg-white/20 hidden md:block"
            initial={{ height: "0%", opacity: 0 }}
            animate={lineInView ? { height: "100%", opacity: 1 } : {}}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />
          
          {/* Grid de características */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Columna izquierda */}
            <motion.div 
              className="space-y-12 md:pr-12"
              ref={leftColumnRef}
              variants={staggerContainer}
              initial="hidden"
              animate={leftColumnInView ? "show" : "hidden"}
            >
              {leftFeatures.map((feature, index) => renderFeature(feature, index))}
            </motion.div>
            
            {/* Columna derecha */}
            <motion.div 
              className="space-y-12 md:pl-12"
              ref={rightColumnRef}
              variants={staggerContainer}
              initial="hidden"
              animate={rightColumnInView ? "show" : "hidden"}
              transition={{ delay: 0.3 }}
            >
              {rightFeatures.map((feature, index) => renderFeature(feature, index + 3))}
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Features;
