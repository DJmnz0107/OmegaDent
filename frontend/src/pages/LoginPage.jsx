import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../contexts/AuthContext'; // Importamos el hook del contexto

const LoginPage = () => {
  // Estado para mostrar/ocultar la contraseña
  const [showPassword, setShowPassword] = useState(false);
  
  // Utilizamos nuestro hook personalizado de autenticación
  const { login, loading } = useAuth();
  
  // Inicializar react-hook-form con las validaciones requeridas
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false
    },
    mode: 'onBlur' // Validar cuando el campo pierde el foco
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Obtenemos la función para actualizar el estado de autenticación
  const { updateAuthState } = useAuth();
  
  // Función para manejar el envío del formulario con react-hook-form
  const onSubmit = async (data) => {
    try {
      // Usamos la función login del hook personalizado
      // La función login en el contexto de autenticación ya se encarga de mostrar
      // el mensaje de éxito y la redirección
      await login({
        email: data.email,
        password: data.password
      }, data.rememberMe);
      
      // Solo actualizamos el estado de autenticación inmediatamente
      updateAuthState();
      
      // No necesitamos mostrar un mensaje ni hacer redirección aquí
      // porque ya se maneja en el contexto de autenticación
    } catch (err) {
      // Mostrar un mensaje de error claro
      toast.error(err.message || "Error al iniciar sesión. Verifica tus credenciales.", {
        position: "top-center"
      });
      console.error('Error en el formulario de login:', err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0A3E59] to-[#19CEB3]">
      {/* Contenedor de notificaciones Toast */}
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop closeOnClick />  
      
      <div className="bg-white rounded-3xl shadow-lg p-8 w-full max-w-md relative">
        {/* Botón de cerrar/volver */}
        <Link to="/" className="absolute right-6 top-6 text-gray-500 hover:text-gray-800 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </Link>
        
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800">Iniciar sesión con la cuenta de OMEGA</h2>
          <p className="text-gray-600 mt-2">¡Bienvenido de nuevo!</p>
        </div>

        {/* Formulario con react-hook-form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Campo de correo electrónico */}
          <div>
            <input
              type="email"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0E6B96] ${errors.email ? 'border-red-500' : 'border-gray-200'}`}
              placeholder="Correo Electrónico"
              {...register('email', { 
                required: 'El correo electrónico es obligatorio', 
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Formato de correo electrónico inválido'
                }
              })}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          {/* Campo de contraseña con opción mostrar/ocultar */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0E6B96] ${errors.password ? 'border-red-500' : 'border-gray-200'}`}
              placeholder="Contraseña"
              {...register('password', { 
                required: 'La contraseña es obligatoria',
                minLength: {
                  value: 6,
                  message: 'La contraseña debe tener al menos 6 caracteres'
                }
              })}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>

          {/* Casilla de recordar sesión */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="rememberMe"
              className="h-4 w-4 text-[#0E6B96] focus:ring-[#0E6B96] border-gray-300 rounded"
              {...register('rememberMe')}
            />
            <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-800">
              Mantener sesión iniciada
            </label>
          </div>

          {/* Botón de ingreso */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full text-white py-3 px-4 rounded-lg transition duration-300 font-medium ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#0A3A4A] hover:bg-[#0E6B96]'}`}
          >
            {loading ? 'Iniciando sesión...' : 'Ingresar'}
          </button>

          {/* Enlace para registrarse */}
          <div className="text-center mt-4">
            <p className="text-sm text-[#0E6B96]">
              ¿No tienes una cuenta? <Link to="/signup" className="font-semibold">Regístrate</Link>.
            </p>
          </div>

          {/* Enlace para recuperar contraseña */}
          <div className="text-center">
            <Link to="/recovery" className="text-sm text-gray-600 hover:text-[#0E6B96]">
              ¿Has olvidado la contraseña?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
