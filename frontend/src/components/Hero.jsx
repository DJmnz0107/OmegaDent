// Componente Hero para la sección principal con imagen destacada
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  staggerContainer, 
  staggerItem 
} from '../utils/animations';

const Hero = () => {
  return (
    <motion.section 
      className="pt-36 pb-20 bg-white border-b border-gray-100" 
      id="inicio"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Contenido de texto */}
          <motion.div 
            className="w-full md:w-1/2 mb-8 md:mb-0 md:pr-8 max-w-lg"
            variants={staggerContainer}
            initial="hidden"
            animate="show"
          >
            <motion.h1 
              className="font-bold text-4xl md:text-5xl relative z-10"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ 
                type: "spring", 
                stiffness: 100, 
                damping: 20,
                delay: 0.2 
              }}
            >
              <motion.div 
                className="relative inline-block"
                initial={{ perspective: 1000 }}
                whileHover={{ 
                  rotateY: [0, 5, 0, -5, 0],
                  transition: { duration: 2, repeat: Infinity }
                }}
              >
                <motion.span 
                  className="text-[#0E6B96] inline-block"
                  animate={{
                    color: [
                      "#0E6B96",
                      "#0EB19B",
                      "#0E6B96"
                    ]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  Bienvenido a
                </motion.span>
              </motion.div>
              <br />
              <div className="relative inline-block">
                <span className="text-[#0E6B96] font-bold" style={{ fontFamily: 'Arial, sans-serif' }}>
                  OmegaDent
                </span>
              </div>
            </motion.h1>
            
            <motion.h2 
              className="text-[#0E6B96] font-medium text-xl md:text-2xl mb-5"
              variants={staggerItem}
            >
              Mejoramos la atención dental para clínicas y pacientes.
            </motion.h2>
            
            <motion.p 
              className="text-gray-600 mb-8"
              variants={staggerItem}
            >
              Omega es una aplicación pensada para optimizar la experiencia dental desde ambos lados: clínicas y usuarios. Para los profesionales, ofrece herramientas para gestionar citas, historiales clínicos y seguimiento de tratamientos. Para los pacientes, facilita la reserva de turnos, el acceso a su historial y la comunicación con su dentista.
            </motion.p>
            
            <Link to="/servicios">
              <motion.button 
                className="bg-[#0E6B96] hover:bg-[#0EB19B] text-white py-3 px-8 rounded-full font-medium transition duration-300 focus:outline-none focus:ring-2 focus:ring-[#0EB19B] focus:ring-opacity-50"
                variants={staggerItem}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                Conoce nuestros servicios
              </motion.button>
            </Link>
          </motion.div>
          
          {/* Imagen */}
          <motion.div 
            className="w-full md:w-1/2 relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            <motion.img 
              src="/images/dentist-with-patient.jpg" 
              alt="Dentista atendiendo a un paciente" 
              className="rounded-full object-cover w-full max-w-md mx-auto shadow-lg"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            />
            
            {/* Círculos decorativos con animación */}
            <motion.div 
              className="absolute right-0 bottom-0 md:right-[0] md:bottom-0"
              initial={{ opacity: 0, rotate: -30 }}
              animate={{ opacity: 1, rotate: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <motion.img
                src="/images/circulo-grande.svg"
                alt="Círculo decorativo grande"
                className="w-[130px] h-[130px]"
                style={{ transform: 'translate(-10%, 50%)' }}
                animate={{ 
                  rotate: [0, 10, 0, -10, 0],
                  scale: [1, 1.05, 1, 1.05, 1]
                }}
                transition={{ 
                  repeat: Infinity,
                  duration: 10,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
            
            <motion.div 
              className="absolute right-[5px] bottom-[-15px] md:right-[5px] md:bottom-[-15px]"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.6, type: "spring" }}
            >
              <motion.img
                src="/images/circulo-pequeno.svg"
                alt="Círculo decorativo pequeño"
                className="w-[80px] h-[45px]"
                style={{ transform: 'translate(30%, 160%)' }}
                animate={{ 
                  y: [0, 10, 0, -10, 0]
                }}
                transition={{ 
                  repeat: Infinity,
                  duration: 8,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Indicador de scroll hacia abajo */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <motion.p 
            className="text-[#0E6B96] text-sm mb-2"
            animate={{ y: [0, 5, 0] }}
            transition={{ 
              repeat: Infinity, 
              duration: 1.5, 
              ease: "easeInOut" 
            }}
          >
            Scroll para más
          </motion.p>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ 
              repeat: Infinity, 
              duration: 1.5, 
              ease: "easeInOut" 
            }}
          >
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="text-[#0E6B96]"
            >
              <path 
                d="M7 10L12 15L17 10" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Hero;
