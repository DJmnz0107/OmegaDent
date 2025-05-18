import './App.css'

// Importamos los componentes que vamos a crear
import Header from './components/Header'
import Hero from './components/Hero'
import Features from './components/Features'
import Services from './components/Services'
import Footer from './components/Footer'

function App() {
  // La función principal del componente App

  return (
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
  )
}

export default App
