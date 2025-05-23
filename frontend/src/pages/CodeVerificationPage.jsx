import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import usePatientRegistration from '../hooks/usePatientRegistration';

const CodeVerificationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentStep] = useState(2);
  
  // Obtener el token de verificación de la URL o state
  const token = new URLSearchParams(location.search).get('token') || 
               (location.state && location.state.verificationToken);
  
  // Usar el hook de registro de pacientes
  const { verifyCode, loading, error, success, resetStates } = usePatientRegistration();
  
  // Al montar el componente, verificar si tenemos el token necesario
  useEffect(() => {
    const storedToken = localStorage.getItem('omegadent_verification_token');
    if (!token && !storedToken) {
      toast.error('No se encontró un token de verificación válido');
      setTimeout(() => {
        navigate('/signup', { replace: true });
      }, 2000);
    }
    
    // Limpiar al desmontar el componente
    return () => {
      resetStates();
    };
  }, [token, navigate, resetStates]);
  
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
  const handleVerifyClick = async (e) => {
    e.preventDefault();
    
    // Verificar que todos los campos estén llenos
    if (code.some(digit => digit === '')) {
      toast.error('Por favor, complete todos los dígitos del código.');
      return;
    }

    try {
      console.log('Código a verificar:', code.join(''));
      
      // Verificar el código con el backend usando el token (o el almacenado en localStorage)
      const storedToken = localStorage.getItem('omegadent_verification_token');
      const tokenToUse = token || storedToken;
      
      console.log('Verificando código con token:', tokenToUse);
      const response = await verifyCode(code.join(''), tokenToUse);
      
      // Verificar si la respuesta incluye un token de autenticación
      if (response && response.token) {
        console.log('Verificación exitosa, iniciando sesión...');
        
        // Mostrar mensaje de éxito
        toast.success('¡Registro completado con éxito! Iniciando sesión...');
        
        // Limpiar el token de verificación ya que ya no se necesita
        localStorage.removeItem('omegadent_verification_token');
        
        // Redireccionar a la página principal
        setTimeout(() => {
          navigate('/', { replace: true });
        }, 1500);
      } else {
        console.error('Verificación exitosa pero no se recibió token de autenticación');
        toast.warning('Verificación completada, pero hubo un problema al iniciar sesión automáticamente');
        
        // Redireccionar a la página de login
        setTimeout(() => {
          navigate('/login', { replace: true });
        }, 2000);
      }
    } catch (error) {
      console.error('Error al verificar el código:', error);
      toast.error(error.message || 'Error al verificar el código');
    }
  };

  // Manejar clic en "Reenviar código"
  const handleResendCode = () => {
    // Aquí iría la lógica para reenviar el código
    console.log('Reenviar código solicitado');
    toast.info('Se ha enviado un nuevo código a tu correo electrónico');
  };
  
  // Mostrar errores
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (success) {
      toast.success(success);
    }
  }, [error, success]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0A3E59] to-[#19CEB3]">
      <div className="bg-white rounded-3xl shadow-lg p-8 w-full max-w-md relative">
        {/* Botón de cerrar/volver */}
        <button 
          onClick={() => navigate(-1)} 
          className="absolute right-6 top-6 text-gray-500 hover:text-gray-800 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <h2 className="text-2xl font-bold text-center mb-2">Verificación de código</h2>
        <p className="text-center text-gray-600 mb-8">
          Ingresa el código de 5 dígitos enviado a tu dispositivo
        </p>

        {/* Formulario de verificación de código */}
        <form onSubmit={handleVerifyClick} className="mb-4">
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
                required
              />
            ))}
          </div>

          {/* Botón de verificación */}
          <button
            type="submit"
            className="w-full bg-[#0A3A4A] text-white py-3 px-4 rounded-lg hover:bg-[#0E6B96] transition duration-300 font-medium"
            disabled={loading}
          >
            {loading ? "Verificando..." : "Verificar código"}
          </button>
        </form>

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
