// Componente Header con navegación para la landing page
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AppointmentModal from './AppointmentModal';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('inicio');
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar la apertura del modal
  const location = useLocation();

  // Detectar la sección actual basada en el scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['inicio', 'sobre-nosotros', 'servicios', 'contacto'];
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Si la sección está visible en el viewport
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveItem(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Llamar al inicio para establecer la sección inicial
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const handleItemClick = (item) => {
    setActiveItem(item);
    setIsMenuOpen(false);
  };
  
  // Abrir modal de agendar cita
  const handleAppointmentClick = (e) => {
    e.preventDefault(); // Prevenir la navegación predeterminada
    setIsModalOpen(true); // Abrir el modal
    if (isMenuOpen) {
      setIsMenuOpen(false); // Cerrar el menú móvil si está abierto
    }
  };

  return (
    <header className="bg-white shadow-sm py-4 fixed w-full top-0 z-50 border-b border-gray-100">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <img src="/images/logo.svg" alt="OmegaDent Logo" className="h-8" />
              <span className="ml-2 text-[#0E6B96] font-bold text-xl">OmegaDent</span>
            </Link>
          </div>

          {/* Navegación - Versión desktop */}
          <nav className="hidden md:block">
            <ul className="flex space-x-10">
              <li>
                {location.pathname === '/' ? (
                  <a 
                    href="#inicio" 
                    className={`text-gray-700 hover:text-[#0EB19B] relative py-6 ${activeItem === 'inicio' ? 'text-[#0EB19B] after:content-[\'\'] after:bg-[#0EB19B] after:h-0.5 after:w-full after:absolute after:left-0 after:bottom-0' : ''}`}
                    onClick={() => handleItemClick('inicio')}
                  >
                    Inicio
                  </a>
                ) : (
                  <Link 
                    to="/" 
                    className="text-gray-700 hover:text-[#0EB19B] relative py-6"
                  >
                    Inicio
                  </Link>
                )}
              </li>
              <li>
                <Link 
                  to="/sobre-nosotros" 
                  className={`text-gray-700 hover:text-[#0EB19B] relative py-6 ${location.pathname === '/sobre-nosotros' ? 'text-[#0EB19B] after:content-[\'\'] after:bg-[#0EB19B] after:h-0.5 after:w-full after:absolute after:left-0 after:bottom-0' : ''}`}
                >
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link 
                  to="/servicios" 
                  className={`text-gray-700 hover:text-[#0EB19B] relative py-6 ${location.pathname === '/servicios' ? 'text-[#0EB19B] after:content-[\'\'] after:bg-[#0EB19B] after:h-0.5 after:w-full after:absolute after:left-0 after:bottom-0' : ''}`}
                >
                  Servicios
                </Link>
              </li>
              <li>
                <Link 
                  to="/contacto" 
                  className={`text-gray-700 hover:text-[#0EB19B] relative py-6 ${location.pathname === '/contacto' ? 'text-[#0EB19B] after:content-[\'\'] after:bg-[#0EB19B] after:h-0.5 after:w-full after:absolute after:left-0 after:bottom-0' : ''}`}
                >
                  Contacto
                </Link>
              </li>
            </ul>
          </nav>

          {/* Botón "Iniciar Sesión" y "Agendar Cita" */}
          <div className="hidden md:flex items-center ml-6 space-x-4">
            <Link to="/login" className="text-gray-600 flex items-center hover:text-[#0EB19B]">
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
              Iniciar Sesión
            </Link>
            <a 
              href="#" 
              onClick={handleAppointmentClick}
              className="bg-[#0EB19B] text-white py-2 px-4 rounded-full flex items-center hover:bg-[#0c9d8a] transition-colors whitespace-nowrap"
            >
              <svg className="w-5 h-5 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              Agendar Cita
            </a>
          </div>
          
          {/* Menú hamburguesa - Versión móvil */}
          <div className="md:hidden">
            <button 
              type="button" 
              className="text-gray-600 hover:text-[#0EB19B] focus:outline-none" 
              onClick={toggleMenu}
            >
              {isMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                </svg>
              )}
            </button>
          </div>
        </div>
        
        {/* Menú móvil */}
        {isMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-white shadow-lg p-4 flex flex-col space-y-4 md:hidden z-50">
            {location.pathname === '/' ? (
              <a 
                href="#inicio" 
                className={`text-gray-700 hover:text-[#0EB19B] ${activeItem === 'inicio' ? 'text-[#0EB19B]' : ''}`}
                onClick={() => handleItemClick('inicio')}
              >
                Inicio
              </a>
            ) : (
              <Link 
                to="/" 
                className="text-gray-700 hover:text-[#0EB19B]"
                onClick={() => setIsMenuOpen(false)}
              >
                Inicio
              </Link>
            )}
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
              <Link to="/login" className="text-gray-600 flex items-center py-1" onClick={() => setIsMenuOpen(false)}>
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
                Iniciar Sesión
              </Link>
              <a 
                href="#" 
                className="bg-[#0EB19B] text-white py-2 px-4 rounded-full flex items-center hover:bg-[#0c9d8a] transition-colors whitespace-nowrap"
                onClick={handleAppointmentClick}
              >
                <svg className="w-5 h-5 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                Agendar Cita
              </a>
            </div>
          </div>
        )}
      </div>
      
      {/* Modal de agendar cita */}
      <AppointmentModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </header>
  );
};

export default Header;
