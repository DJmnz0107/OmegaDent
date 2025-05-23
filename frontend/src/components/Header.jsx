// Componente Header con navegación para la landing page
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AppointmentModal from './AppointmentModal';
import { useAuth } from '../contexts/AuthContext';
import LogoutButton from './LogoutButton';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('inicio');
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar la apertura del modal
  const location = useLocation();
  const navigate = useNavigate(); // Inicializar el hook de navegación
  
  // Usar el contexto de autenticación
  const { isAuthenticated, userName, logout } = useAuth();
  // Estado para el menú desplegable de usuario
  const [userMenuOpen, setUserMenuOpen] = useState(false);

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
  
  // Manejar clic en agendar cita
  const handleAppointmentClick = (e) => {
    e.preventDefault(); // Prevenir la navegación predeterminada
    
    if (isAuthenticated) {
      // Si el usuario está autenticado, redirigir directamente a la página de citas
      // Usar navigate en lugar de window.location para mantener el estado de React
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

          {/* Botones de acción */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="relative flex items-center space-x-3">
                <button 
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="text-[#0E6B96] font-medium flex items-center py-2 px-3 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <svg className="w-5 h-5 mr-1 text-[#0EB19B]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                  <span>{userName}</span>
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={userMenuOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
                  </svg>
                </button>
                
                {/* Menú desplegable del usuario */}
                {userMenuOpen && (
                  <div className="absolute top-full right-0 mt-1 w-48 bg-white shadow-md rounded-lg overflow-hidden z-50">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm text-gray-500">Conectado como</p>
                      <p className="text-sm font-medium">{userName}</p>
                    </div>
                    <button 
                      onClick={() => {
                        logout();
                        setUserMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Cerrar sesión
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="text-gray-600 hover:text-[#0E6B96] py-1 px-3 flex items-center rounded-lg">
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
                Iniciar Sesión
              </Link>
            )}
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
              {isAuthenticated ? (
                <div className="flex flex-col space-y-2">
                  <div className="text-[#0E6B96] font-medium flex items-center">
                    <svg className="w-5 h-5 mr-1 text-[#0EB19B]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                    <span>{userName}</span>
                  </div>
                  <button 
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
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
