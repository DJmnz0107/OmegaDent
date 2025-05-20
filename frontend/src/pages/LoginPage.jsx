import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí implementaremos la lógica de inicio de sesión
    console.log('Datos de inicio de sesión:', formData);
    // Añadir validaciones y envío al backend
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0A3E59] to-[#19CEB3]">
      <div className="bg-white rounded-3xl shadow-lg p-8 w-full max-w-md">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800">Iniciar sesión con la cuenta de OMEGA</h2>
          <p className="text-gray-600 mt-2">¡Bienvenido de nuevo!</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Campo de correo electrónico */}
          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0E6B96]"
              placeholder="Correo Electrónico"
              required
            />
          </div>

          {/* Campo de contraseña con opción mostrar/ocultar */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0E6B96]"
              placeholder="Contraseña"
              required
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
          </div>

          {/* Casilla de recordar sesión */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="rememberMe"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
              className="h-4 w-4 text-[#0E6B96] focus:ring-[#0E6B96] border-gray-300 rounded"
            />
            <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-800">
              Mantener sesión iniciada
            </label>
          </div>

          {/* Botón de ingreso */}
          <button
            type="submit"
            className="w-full bg-[#0A3A4A] text-white py-3 px-4 rounded-lg hover:bg-[#0E6B96] transition duration-300 font-medium"
          >
            Ingresar
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
