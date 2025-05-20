import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CodeVerificationPage = () => {
  const navigate = useNavigate();
  const [currentStep] = useState(2);
  
  // Referencias para los 5 campos de entrada
  const inputRef0 = useRef(null);
  const inputRef1 = useRef(null);
  const inputRef2 = useRef(null);
  const inputRef3 = useRef(null);
  const inputRef4 = useRef(null);
  
  // Array estático de referencias para fácil acceso
  const inputRefs = [inputRef0, inputRef1, inputRef2, inputRef3, inputRef4];
  
  // Estado para almacenar el código de 5 dígitos
  const [code, setCode] = useState(['', '', '', '', '']);

  // Enfocar el primer input cuando se muestra la página
  useEffect(() => {
    if (inputRef0.current) {
      inputRef0.current.focus();
    }
  }, []);

  // Manejar cambio en los campos de código
  const handleCodeChange = (index, value) => {
    // Permitir solo dígitos
    const newValue = value.replace(/[^0-9]/g, '');

    // Actualizar el valor del código en el índice proporcionado
    const newCode = [...code];
    newCode[index] = newValue;
    setCode(newCode);

    // Si el valor no está vacío y no es el último input, mover el foco al siguiente input
    if (newValue !== '' && index < 4) {
      inputRefs[index + 1].current.focus();
    }
  };

  // Manejar evento de tecla para navegación entre inputs
  const handleKeyDown = (index, e) => {
    // Si se presiona Backspace y el campo está vacío, mover el foco al input anterior
    if (e.key === 'Backspace' && !code[index] && index > 0) {
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

    // Aquí se verificaría el código con el backend
    console.log('Código a verificar:', code.join(''));
    
    // Navegar a la página de cambio de contraseña
    navigate('/new-password');
  };

  // Manejar clic en "Reenviar código"
  const handleResendCode = () => {
    // Aquí iría la lógica para reenviar el código
    console.log('Reenviar código solicitado');
    alert('Se ha enviado un nuevo código a tu correo electrónico');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0A3E59] to-[#19CEB3]">
      <div className="bg-white rounded-3xl shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-2">Verificación de código</h2>
        <p className="text-center text-gray-600 mb-8">
          Ingresa el código de 5 dígitos enviado a tu dispositivo
        </p>

        {/* Campos para el código de 5 dígitos */}
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

        {/* Botón de verificación */}
        <button
          onClick={handleVerifyClick}
          className="w-full bg-[#0A3A4A] text-white py-3 px-4 rounded-lg hover:bg-[#0E6B96] transition duration-300 font-medium mb-4"
        >
          Verificar código
        </button>

        {/* Opción para reenviar el código */}
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-1">¿No recibiste el código?</p>
          <button 
            onClick={handleResendCode}
            className="text-[#0E6B96] font-medium text-sm flex items-center justify-center mx-auto"
          >
            Reenviar código
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
            </svg>
          </button>
        </div>

        {/* Indicador de pasos */}
        <div className="flex justify-center space-x-2 mt-6">
          <div className={`h-2 w-2 rounded-full ${currentStep === 1 ? 'bg-[#0A3A4A]' : 'bg-gray-300'}`}></div>
          <div className={`h-2 w-2 rounded-full ${currentStep === 2 ? 'bg-[#0A3A4A]' : 'bg-gray-300'}`}></div>
          <div className={`h-2 w-2 rounded-full ${currentStep === 3 ? 'bg-[#0A3A4A]' : 'bg-gray-300'}`}></div>
        </div>
      </div>
    </div>
  );
};

export default CodeVerificationPage;
