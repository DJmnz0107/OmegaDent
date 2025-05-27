// Definiciones de animaciones reutilizables para OmegaDent
// Estas animaciones están diseñadas para crear una experiencia coherente en todo el sitio

// Animaciones para elementos que entran en la pantalla desde fuera
export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.5 }
};

export const fadeInUp = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

export const fadeInDown = {
  initial: { opacity: 0, y: -50 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

export const fadeInLeft = {
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6 }
};

export const fadeInRight = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6 }
};

// Animaciones para elementos al hacer hover
export const scaleOnHover = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
  transition: { type: "spring", stiffness: 400, damping: 17 }
};

export const liftUpOnHover = {
  whileHover: { y: -5, boxShadow: "0 10px 25px -5px rgba(14, 107, 150, 0.1), 0 8px 10px -6px rgba(14, 107, 150, 0.1)" },
  transition: { duration: 0.2 }
};

// Animaciones para el menú
export const navItemAnimation = {
  whileHover: { y: -2 },
  transition: { type: "spring", stiffness: 400 }
};

export const mobileMenuAnimation = {
  initial: { opacity: 0, height: 0 },
  animate: { opacity: 1, height: "auto" },
  exit: { opacity: 0, height: 0 },
  transition: { duration: 0.3 }
};

// Animaciones para iconos
export const pulseAnimation = {
  animate: { 
    scale: [1, 1.1, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: "loop"
    }
  }
};

export const rotateAnimation = {
  whileHover: { 
    rotate: [0, 5, -5, 0],
    transition: { duration: 0.5 } 
  }
};

// Animaciones para elementos de UI
export const buttonAnimation = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
  transition: { type: "spring", stiffness: 400, damping: 17 }
};

// Animaciones para tarjetas
export const cardAnimation = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.5 }
};

// Animaciones para secciones completas
export const sectionAnimation = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, amount: 0.1 },
  transition: { duration: 0.8 }
};

// Variantes para animaciones estilo stagger (elementos que aparecen en secuencia)
export const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300
    }
  }
};

// Animaciones específicas para elementos dentales
export const toothAnimation = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { 
    scale: 1, 
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20
    }
  }
};

// Animación de línea indicadora para navegación
export const underlineAnimation = {
  layoutId: "underline",
  initial: false,
  transition: { 
    type: "spring", 
    stiffness: 300, 
    damping: 30 
  }
};
