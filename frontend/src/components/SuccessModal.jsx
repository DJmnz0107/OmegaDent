import React from 'react';
import { Link } from 'react-router-dom';

// Modal para mostrar mensaje de éxito después del registro
const SuccessModal = ({ onClose }) => {
  // Detener la propagación de clics dentro del modal
  const handleModalContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    // Overlay de fondo oscuro
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      {/* Contenedor del modal */}
      <div 
        className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full mx-4"
        onClick={handleModalContentClick}
      >
        {/* Icono de éxito */}
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 p-3 rounded-full">
            <svg className="w-16 h-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
        </div>
        
        {/* Título y mensaje */}
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
          ¡Registro Exitoso!
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Tu cuenta ha sido creada correctamente. Ahora puedes iniciar sesión y disfrutar de todos nuestros servicios.
        </p>
        
        {/* Botones de acción */}
        <div className="flex flex-col space-y-3">
          <Link 
            to="/login" 
            className="w-full bg-[#0A3A4A] text-white py-3 px-4 rounded-md hover:bg-[#0E6B96] transition duration-300 text-center"
          >
            Iniciar Sesión
          </Link>
          <button
            type="button"
            onClick={onClose}
            className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-md hover:bg-gray-200 transition duration-300"
          >
            Volver a la página principal
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
