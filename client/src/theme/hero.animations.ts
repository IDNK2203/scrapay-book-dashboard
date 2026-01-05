import type { Variants, Transition } from 'framer-motion';

// Premium spring physics for smooth, natural motion
export const springTransition: Transition = {
  type: 'spring',
  stiffness: 100,
  damping: 15,
  mass: 1,
};

// Elastic bounce for playful elements
export const elasticTransition: Transition = {
  type: 'spring',
  stiffness: 300,
  damping: 10,
  mass: 0.5,
};

// Smooth easing for subtle movements
export const smoothTransition: Transition = {
  type: 'tween',
  ease: [0.25, 0.1, 0.25, 1],
  duration: 0.6,
};

// Hero text reveal with dramatic entrance
export const heroTextReveal: Variants = {
  hidden: { 
    y: 100, 
    opacity: 0,
    filter: 'blur(10px)',
  },
  visible: { 
    y: 0, 
    opacity: 1,
    filter: 'blur(0px)',
    transition: {
      type: 'spring',
      stiffness: 50,
      damping: 20,
      mass: 1.2,
    }
  }
};

// Staggered container for children animations
export const heroContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    }
  }
};

// 3D floating book animation with parallax
export const floatingBookVariants = (index: number): Variants => ({
  initial: { 
    y: 0, 
    x: 0,
    rotateY: 0, 
    rotateZ: 0, 
    rotateX: 0,
    scale: 1,
  },
  animate: {
    y: [0, -30 - (index * 5), 0],
    x: [0, index % 2 === 0 ? 15 : -15, 0],
    rotateY: [0, index % 2 === 0 ? 15 : -15, 0],
    rotateZ: [0, index % 2 === 0 ? 8 : -8, 0],
    rotateX: [0, index % 3 === 0 ? 5 : -5, 0],
    scale: [1, 1.02, 1],
    transition: {
      duration: 6 + (index * 0.5),
      repeat: Infinity,
      ease: 'easeInOut',
    }
  },
  hover: {
    scale: 1.1,
    rotateY: 20,
    transition: { duration: 0.3 }
  }
});

// Particle floating animation
export const particleVariants = (index: number): Variants => ({
  initial: { 
    opacity: 0.3, 
    scale: 0.5,
    y: 0,
  },
  animate: {
    opacity: [0.2, 0.6, 0.2],
    scale: [0.5, 1, 0.5],
    y: [0, -100 - (index * 20), -200],
    transition: {
      duration: 8 + (index * 2),
      repeat: Infinity,
      ease: 'easeInOut',
      delay: index * 0.5,
    }
  }
});

// Gradient mesh animation
export const gradientMeshVariants: Variants = {
  initial: { 
    opacity: 0,
    scale: 0.8,
  },
  animate: {
    opacity: [0.3, 0.5, 0.3],
    scale: [0.8, 1.2, 0.8],
    rotate: [0, 360],
    transition: {
      duration: 20,
      repeat: Infinity,
      ease: 'linear',
    }
  }
};

// Aurora wave effect
export const auroraVariants: Variants = {
  initial: { 
    x: '-100%',
    opacity: 0,
  },
  animate: {
    x: ['100%', '-100%'],
    opacity: [0, 0.15, 0],
    transition: {
      duration: 15,
      repeat: Infinity,
      ease: 'linear',
    }
  }
};

// Button hover glow
export const buttonGlow: Variants = {
  rest: {
    boxShadow: '0 0 0 rgba(255, 121, 0, 0)',
  },
  hover: {
    boxShadow: '0 0 40px rgba(255, 121, 0, 0.5)',
    transition: { duration: 0.3 }
  }
};

// Mouse follow animation helper
export const getMouseFollowStyle = (
  mouseX: number, 
  mouseY: number, 
  intensity: number = 0.02
) => ({
  x: mouseX * intensity,
  y: mouseY * intensity,
});
