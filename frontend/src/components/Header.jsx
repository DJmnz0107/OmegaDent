// Componente Header con navegación para la landing page
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AppointmentModal from './AppointmentModal';
import { useAuth } from '../contexts/AuthContext';
import LogoutButton from './LogoutButton';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { 
  fadeInDown, 
  fadeIn, 
  buttonAnimation, 
  navItemAnimation, 
  underlineAnimation, 
  mobileMenuAnimation 
} from '../utils/animations';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar la apertura del modal
  const location = useLocation();
  const navigate = useNavigate(); // Inicializar el hook de navegación
  
  // Usar el contexto de autenticación
  const { isAuthenticated, userName, logout } = useAuth();
  // Estado para el menú desplegable de usuario
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  
  // Estado para controlar la visibilidad del header en scroll
  const [isVisible, setIsVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  
  // Efecto para manejar el scroll inteligente
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const threshold = 10; // Umbral de scroll para determinar el cambio
      
      // Determinar si debe ser visible basado en la dirección del scroll
      const visible = (
        prevScrollPos > currentScrollPos || // Scroll hacia arriba
        currentScrollPos < 50 || // Cerca del top de la página
        isMenuOpen || // Menú móvil abierto
        userMenuOpen // Menú de usuario abierto
      );
      
      // Solo actualizar el estado si el cambio de scroll es suficiente
      if (Math.abs(prevScrollPos - currentScrollPos) > threshold) {
        setIsVisible(visible);
        setPrevScrollPos(currentScrollPos);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos, isMenuOpen, userMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  // Manejar clic en agendar cita
  const handleAppointmentClick = (e) => {
    e.preventDefault(); // Prevenir la navegación predeterminada
    
    if (isAuthenticated) {
      // Si el usuario está autenticado, redirigir directamente a la página de citas
      navigate('/appointment');
      console.log('Usuario autenticado, redirigiendo a /appointment');
    } else {
      // Si no está autenticado, mostrar el modal
      setIsModalOpen(true);
      console.log('Usuario no autenticado, mostrando modal');
    }
    
    if (isMenuOpen) {
      setIsMenuOpen(false); // Cerrar el menú móvil si está abierto
    }
  };

  return (
    <motion.header 
      {...fadeInDown}
      className={`bg-white shadow-sm py-4 fixed w-full top-0 z-50 border-b border-gray-100 transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}
    >
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div 
            className="flex-shrink-0"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Link to="/" className="flex items-center">
              <motion.img 
                src="/images/logo.svg" 
                alt="OmegaDent Logo" 
                className="h-8"
                whileHover={{ rotate: 10 }}
                transition={{ type: "spring", stiffness: 200 }}
              />
              <span className="ml-2 text-[#0E6B96] font-bold text-xl">OmegaDent</span>
            </Link>
          </motion.div>

          {/* Navegación - Versión desktop */}
          <motion.nav 
            className="hidden md:block"
            {...fadeIn}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <ul className="flex space-x-10">
              <li>
                <motion.div className="relative py-6" {...navItemAnimation}>
                  <Link 
                    to="/" 
                    className={`text-gray-700 hover:text-[#0EB19B] ${location.pathname === '/' ? 'text-[#0EB19B]' : ''}`}
                  >
                    Inicio
                  </Link>
                  {location.pathname === '/' && (
                    <motion.div 
                      className="absolute bottom-0 left-0 h-0.5 w-full bg-[#0EB19B]"
                      {...underlineAnimation}
                    />
                  )}
                </motion.div>
              </li>
              <li>
                <motion.div className="relative py-6" {...navItemAnimation}>
                  <Link 
                    to="/sobre-nosotros" 
                    className={`text-gray-700 hover:text-[#0EB19B] ${location.pathname === '/sobre-nosotros' ? 'text-[#0EB19B]' : ''}`}
                  >
                    Sobre Nosotros
                  </Link>
                  {location.pathname === '/sobre-nosotros' && (
                    <motion.div 
                      className="absolute bottom-0 left-0 h-0.5 w-full bg-[#0EB19B]"
                      {...underlineAnimation}
                    />
                  )}
                </motion.div>
              </li>
              <li>
                <motion.div className="relative py-6" {...navItemAnimation}>
                  <Link 
                    to="/servicios" 
                    className={`text-gray-700 hover:text-[#0EB19B] ${location.pathname === '/servicios' ? 'text-[#0EB19B]' : ''}`}
                  >
                    Servicios
                  </Link>
                  {location.pathname === '/servicios' && (
                    <motion.div 
                      className="absolute bottom-0 left-0 h-0.5 w-full bg-[#0EB19B]"
                      {...underlineAnimation}
                    />
                  )}
                </motion.div>
              </li>
              <li>
                <motion.div className="relative py-6" {...navItemAnimation}>
                  <Link 
                    to="/contacto" 
                    className={`text-gray-700 hover:text-[#0EB19B] ${location.pathname === '/contacto' ? 'text-[#0EB19B]' : ''}`}
                  >
                    Contacto
                  </Link>
                  {location.pathname === '/contacto' && (
                    <motion.div 
                      className="absolute bottom-0 left-0 h-0.5 w-full bg-[#0EB19B]"
                      {...underlineAnimation}
                    />
                  )}
                </motion.div>
              </li>
            </ul>
          </motion.nav>

          {/* Botones de acción */}
          <motion.div 
            className="hidden md:flex items-center space-x-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {isAuthenticated ? (
              <div className="relative flex items-center space-x-3">
                <button 
                  className="text-[#0E6B96] font-medium flex items-center" 
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                >
                  <svg className="w-5 h-5 mr-1 text-[#0EB19B]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                  <span>{userName}</span>
                  <svg className={`w-4 h-4 ml-1 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>
                
                {/* Menú desplegable de usuario */}
                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div 
                      className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg overflow-hidden z-50"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Link to="/appointment" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                        Mis Citas
                      </Link>
                      <div className="border-t border-gray-100"></div>
                      <LogoutButton className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link to="/login" className="text-gray-600 hover:text-[#0E6B96] py-1 px-3 rounded-lg">
                Iniciar Sesión
              </Link>
            )}
            
            <motion.a 
              href="#" 
              className="bg-[#0EB19B] text-white py-2 px-4 rounded-full flex items-center space-x-1 whitespace-nowrap"
              onClick={handleAppointmentClick}
              {...buttonAnimation}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              <span>Agendar Cita</span>
            </motion.a>
          </motion.div>
          
          {/* Menú hamburguesa - Versión móvil */}
          <motion.div 
            className="md:hidden"
            whileTap={{ scale: 0.9 }}
          >
            <button 
              type="button" 
              className="text-gray-600 hover:text-[#0EB19B] focus:outline-none" 
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                )}
              </svg>
            </button>
          </motion.div>
        </div>
        
        {/* Menú móvil */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              className="absolute top-16 left-0 right-0 bg-white shadow-lg p-4 flex flex-col space-y-4 md:hidden z-50"
              {...mobileMenuAnimation}
            >
              <Link 
                to="/" 
                className={`text-gray-700 hover:text-[#0EB19B] ${location.pathname === '/' ? 'text-[#0EB19B]' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Inicio
              </Link>
              <Link 
                to="/sobre-nosotros" 
                className={`text-gray-700 hover:text-[#0EB19B] ${location.pathname === '/sobre-nosotros' ? 'text-[#0EB19B]' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Sobre Nosotros
              </Link>
              <Link 
                to="/servicios" 
                className={`text-gray-700 hover:text-[#0EB19B] ${location.pathname === '/servicios' ? 'text-[#0EB19B]' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Servicios
              </Link>
              <Link 
                to="/contacto" 
                className={`text-gray-700 hover:text-[#0EB19B] ${location.pathname === '/contacto' ? 'text-[#0EB19B]' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Contacto
              </Link>
              <div className="flex flex-col space-y-2 mt-2 border-t pt-2">
                {isAuthenticated ? (
                  <div className="flex flex-col space-y-2">
                    <div className="text-[#0E6B96] font-medium flex items-center">
                      <svg className="w-5 h-5 mr-1 text-[#0EB19B]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                      </svg>
                      <span>{userName}</span>
                    </div>
                    <button 
                      onClick={async () => {
                        await logout();
                        setIsMenuOpen(false);
                        // Forzar actualización de componente
                        window.dispatchEvent(new Event('storage'));
                      }}
                      className="text-left px-2 py-1 text-red-600 flex items-center text-sm"
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Cerrar sesión
                    </button>
                  </div>
                ) : (
                  <Link to="/login" className="text-gray-600 hover:text-[#0E6B96] py-1 px-3 flex items-center rounded-lg" onClick={() => setIsMenuOpen(false)}>
                    <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                    Iniciar Sesión
                  </Link>
                )}
                <motion.a 
                  href="#" 
                  className="bg-[#0EB19B] text-white py-2 px-4 rounded-full flex items-center hover:bg-[#0c9d8a] transition-colors whitespace-nowrap"
                  onClick={handleAppointmentClick}
                  {...buttonAnimation}
                >
                  <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  Agendar Cita
                </motion.a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Modal de agendar cita */}
      <AppointmentModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </motion.header>
  );
};

export default Header;
