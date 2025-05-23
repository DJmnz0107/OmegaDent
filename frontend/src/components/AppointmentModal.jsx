import React from 'react';
import { Link } from 'react-router-dom';

// Modal para agendar cita que aparece cuando el usuario no ha iniciado sesión
const AppointmentModal = ({ isOpen, onClose }) => {
  // Si el modal no está abierto, no renderizar nada
  if (!isOpen) return null;

  // Detener la propagación de clics dentro del modal para evitar cerrar cuando se hace clic en su contenido
  const handleModalContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    // Overlay con fondo semitransparente y z-index alto para estar por encima de todo
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose} // Cerrar el modal al hacer clic en el overlay
    >
      {/* Contenedor del modal */}
      <div 
        className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full mx-4 relative"
        onClick={handleModalContentClick}
      >
        {/* Botón de cerrar (X) en la esquina superior derecha */}
        <button
          onClick={onClose}
          className="absolute right-6 top-6 text-gray-500 hover:text-gray-800 transition-colors focus:outline-none"
          aria-label="Cerrar"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        {/* Icono de advertencia */}
        <div className="flex justify-center mb-6">
          <div className="text-[#0EB19B]">
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M40 0L77.8 65H2.2L40 0Z" fill="#0EB19B"/>
              <path d="M40 22V48" stroke="white" strokeWidth="6" strokeLinecap="round"/>
              <circle cx="40" cy="56" r="3" fill="white"/>
            </svg>
          </div>
        </div>

        {/* Título */}
        <h2 className="text-4xl font-bold text-[#0E6B96] text-center mb-6">
          ¡Espera!
        </h2>

        {/* Texto informativo */}
        <p className="text-gray-600 text-center mb-8">
          Necesitamos que inicies sesión o crees una cuenta si quieres agendar una cita, esto para obtener todos tus datos de forma más precisa.
        </p>

        {/* Botones de acción */}
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Link 
            to="/login" 
            className="bg-[#E6F3F9] text-[#0E6B96] font-medium py-2 px-8 rounded-lg hover:bg-[#d3e9f3] transition duration-300 text-center"
          >
            Iniciar Sesión
          </Link>
          
          <Link 
            to="/signup" 
            className="bg-[#0E6B96] text-white font-medium py-2 px-8 rounded-lg hover:bg-[#095a7d] transition duration-300 text-center"
            onClick={onClose}
          >
            Crear cuenta
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AppointmentModal;
