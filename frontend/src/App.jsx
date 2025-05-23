import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AuthProvider } from './contexts/AuthContext'
import { useEffect } from 'react'

// Importamos los componentes que vamos a crear
import Header from './components/Header'
import Hero from './components/Hero'
import Features from './components/Features'
import Services from './components/Services'
import Footer from './components/Footer'

// Importamos las páginas
import ServicesPage from './pages/ServicesPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import RecoveryPage from './pages/RecoveryPage'
import CodeVerificationPage from './pages/CodeVerificationPage'
import NewPasswordPage from './pages/NewPasswordPage'
import AppointmentPage from './pages/AppointmentPage'

// Componente para mostrar mensajes guardados en localStorage
function ToastMessageHandler() {
  useEffect(() => {
    // Implementar un pequeño retraso para asegurar que el componente se monte completamente
    const timer = setTimeout(() => {
      // Verificar si hay un mensaje toast guardado en localStorage
      const savedToastMessage = localStorage.getItem('omegadent_toast_message');
      
      if (savedToastMessage) {
        try {
          const parsedMessage = JSON.parse(savedToastMessage);
          const { type, message } = parsedMessage;
          
          // Siempre mostrar el mensaje, sin importar cuándo fue creado
          if (type === 'success') {
            toast.success(message, {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              style: { backgroundColor: "#0E6B96", color: "white", fontWeight: "bold", fontSize: "16px" }
            });
            console.log('Mostrando mensaje de éxito:', message);
          } else if (type === 'error') {
            toast.error(message);
            console.log('Mostrando mensaje de error:', message);
          }
          
          // Eliminar el mensaje después de mostrarlo
          localStorage.removeItem('omegadent_toast_message');
        } catch (error) {
          console.error('Error al procesar mensaje toast:', error);
          localStorage.removeItem('omegadent_toast_message');
        }
      } else {
        // Verificar si venimos de un registro exitoso
        const justRegistered = sessionStorage.getItem('just_registered');
        if (justRegistered === 'true') {
          toast.success("¡Registro exitoso! Se ha iniciado sesión automáticamente", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            style: { backgroundColor: "#0E6B96", color: "white", fontWeight: "bold", fontSize: "16px" }
          });
          sessionStorage.removeItem('just_registered');
        }
      }
    }, 800); // Esperar 800ms para asegurar que todo esté cargado
    
    return () => clearTimeout(timer);
  }, []);
  
  return null; // Este componente no renderiza nada visible
}

function App() {
  // La función principal del componente App

  return (
    <Router>
      {/* Proveedor de autenticación que envuelve toda la aplicación */}
      <AuthProvider>
        {/* Contenedor de notificaciones Toast global */}
        <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop closeOnClick />
        
        {/* Componente que maneja la visualización de mensajes toast guardados */}
        <ToastMessageHandler />
        
        <Routes>
        {/* Ruta principal - Landing Page */}
        <Route path="/" element={
          <>
            {/* Header principal con menú de navegación */}
            <Header />
            
            {/* Sección Hero con imagen destacada */}
            <Hero />
            
            {/* Sección "¿Por qué un software hecho a medida?" */}
            <Features />
            
            {/* Sección "¿Qué servicios ofrece la clínica?" */}
            <Services />
            
            {/* Footer con información de contacto */}
            <Footer />
          </>
        } />
        
        {/* Ruta para la página de servicios */}
        <Route path="/servicios" element={<ServicesPage />} />
        
        {/* Ruta para la página de sobre nosotros */}
        <Route path="/sobre-nosotros" element={<AboutPage />} />
        
        {/* Ruta para la página de contacto */}
        <Route path="/contacto" element={<ContactPage />} />
        
        {/* Ruta para la página de registro */}
        <Route path="/signup" element={<SignupPage />} />
        
        {/* Ruta para la página de inicio de sesión */}
        <Route path="/login" element={<LoginPage />} />
        
        {/* Rutas para el flujo de recuperación de contraseña */}
        <Route path="/recovery" element={<RecoveryPage />} />
        <Route path="/verify-code" element={<CodeVerificationPage />} />
        <Route path="/new-password" element={<NewPasswordPage />} />
        
        {/* Ruta para la página de citas */}
        <Route path="/appointment" element={<AppointmentPage />} />
      </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App
