import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// Importamos los componentes que vamos a crear
import Header from './components/Header'
import Hero from './components/Hero'
import Features from './components/Features'
import Services from './components/Services'
import Footer from './components/Footer'

// Importamos las páginas
import ServicesPage from './pages/ServicesPage'
import AboutPage from './pages/AboutPage'

function App() {
  // La función principal del componente App

  return (
    <Router>
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
      </Routes>
    </Router>
  )
}

export default App
