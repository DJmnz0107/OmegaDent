import React, { useState, useRef, useEffect } from 'react';

// Modal para verificación de código enviado al correo electrónico - basado exactamente en la imagen 3
const CodeVerificationModal = ({ onVerify, onClose }) => {
  // Crear referencias individuales para cada campo de entrada
  const inputRef0 = useRef(null);
  const inputRef1 = useRef(null);
  const inputRef2 = useRef(null);
  const inputRef3 = useRef(null);
  const inputRef4 = useRef(null);
  
  // Array estático de referencias para fácil acceso
  const inputRefs = [inputRef0, inputRef1, inputRef2, inputRef3, inputRef4];

  // Estado para almacenar el código de 5 dígitos
  const [code, setCode] = useState(['', '', '', '', '']);

  // Enfocar el primer input cuando se muestra el modal
  useEffect(() => {
    if (inputRef0.current) {
      inputRef0.current.focus();
    }
  }, []);

  // Manejar cambio en los campos de código
  const handleCodeChange = (index, value) => {
    // Actualizar el valor del código en el índice proporcionado
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Si el valor no está vacío y no es el último input, mover el foco al siguiente input
    if (value !== '' && index < 4) {
      inputRefs[index + 1].current.focus();
    }

    // Si todos los campos están llenos, verificar automáticamente
    if (newCode.every(digit => digit !== '')) {
      // No verificamos automáticamente para permitir corregir errores
    }
  };

  // Manejar evento de tecla para navegación entre inputs
  const handleKeyDown = (index, e) => {
    // Si se presiona Backspace y el campo está vacío, mover el foco al input anterior
    if (e.key === 'Backspace' && code[index] === '' && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  // Manejar clic en el botón "Verificar código"
  const handleVerifyClick = () => {
    // Verificar que todos los campos estén llenos
    if (code.some(digit => digit === '')) {
      alert('Por favor, complete todos los dígitos del código.');
      return;
    }

    // Llamar a la función de verificación proporcionada por el componente padre
    onVerify(code.join(''));
  };

  // Manejar clic en "Reenviar código"
  const handleResendCode = () => {
    // Aquí iría la lógica para reenviar el código
    alert('Se ha enviado un nuevo código a su correo electrónico.');
  };

  // Detener la propagación de clics dentro del modal
  const handleModalContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    // Overlay de fondo oscuro - Fondo gradiente idéntico a la imagen
    <div 
      className="fixed inset-0 bg-gradient-to-br from-[#0A3E59] to-[#19CEB3] flex items-center justify-center z-50"
      onClick={onClose}
    >
      {/* Logo OmegaDent en la esquina superior izquierda */}
      <div className="absolute top-8 left-8">
        <div className="flex items-center">
          <img src="/images/logo.svg" alt="OmegaDent Logo" className="h-6" />
          <span className="text-white text-xl font-bold ml-2">OmegaDent</span>
        </div>
      </div>
      
      {/* Contenedor del modal */}
      <div 
        className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full mx-4"
        onClick={handleModalContentClick}
      >
        {/* Título del modal - exactamente como en la imagen 3 */}
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">
          Verificación de código
        </h2>
        
        {/* Instrucciones - exactamente como en la imagen 3 */}
        <p className="text-center text-gray-600 text-sm mb-6">
          Ingresa el código de 5 dígitos enviado a tu correo electrónico
        </p>
        
        {/* Campos de entrada para el código - pixel perfect como en la imagen 3 */}
        <div className="flex justify-center space-x-3 mb-6">
          {inputRefs.map((ref, index) => (
            <input
              key={index}
              ref={ref}
              type="text"
              maxLength={1}
              className="w-12 h-12 border border-gray-200 rounded-lg text-center text-lg focus:outline-none focus:ring-1 focus:ring-[#0E6B96]"
              value={code[index]}
              onChange={(e) => handleCodeChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
            />
          ))}
        </div>
        
        {/* Botón de verificación - pixel perfect como en la imagen 3 */}
        <button
          type="button"
          className="w-full bg-[#0A3A4A] text-white py-3 px-4 rounded-lg hover:bg-[#0E6B96] transition duration-300 mb-4 font-medium"
          onClick={handleVerifyClick}
        >
          Verificar código
        </button>
        
        {/* Enlace para reenviar código - exactamente como en la imagen 3 */}
        <div className="text-center">
          <p className="text-gray-600 text-sm mb-1">¿No recibiste el código?</p>
          <button 
            type="button" 
            className="text-[#0E6B96] text-sm font-medium flex items-center justify-center mx-auto hover:underline"
            onClick={handleResendCode}
          >
            Reenviar código
            <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
        
        {/* Indicadores de paso - exactamente como en la imagen 3 */}
        <div className="flex justify-center mt-6 space-x-2">
          <div className="h-2 w-2 rounded-full bg-gray-300"></div>
          <div className="h-2 w-2 rounded-full bg-gray-300"></div>
          <div className="h-2 w-2 rounded-full bg-[#0E6B96]"></div>
        </div>
      </div>
    </div>
  );
};

export default CodeVerificationModal;
