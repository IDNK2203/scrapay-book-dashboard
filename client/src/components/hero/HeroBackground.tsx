import { motion } from 'framer-motion';
import { 
  floatingBookVariants, 
  particleVariants,
  gradientMeshVariants,
  auroraVariants 
} from '../../theme/hero.animations';

interface HeroBackgroundProps {
  children?: React.ReactNode;
}

// Book configurations for 3D floating effect - fixed positions
const bookConfigs = [
  { width: 80, height: 110, top: '15%', left: '8%', color: 'var(--accent-primary)', blur: 0, zIndex: 3 },
  { width: 60, height: 85, top: '25%', right: '10%', color: 'rgba(255,255,255,0.04)', blur: 1, zIndex: 1 },
  { width: 70, height: 95, top: '55%', left: '12%', color: 'rgba(255,255,255,0.03)', blur: 1, zIndex: 1 },
  { width: 50, height: 70, top: '65%', right: '15%', color: 'rgba(255,255,255,0.05)', blur: 0, zIndex: 2 },
  { width: 65, height: 90, top: '35%', right: '20%', color: 'var(--accent-secondary)', blur: 0, zIndex: 2, opacity: 0.5 },
  { width: 55, height: 75, bottom: '15%', left: '45%', color: 'rgba(255,255,255,0.02)', blur: 2, zIndex: 0 },
];

// Particle configurations
const particles = Array.from({ length: 12 }, (_, i) => ({
  left: `${15 + (i * 6)}%`,
  bottom: `${5 + (i % 4) * 10}%`,
  size: 2 + (i % 3),
}));

export const HeroBackground = ({ children }: HeroBackgroundProps) => {
  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      pointerEvents: 'none',
      perspective: '1200px',
      zIndex: 0,
    }}>
      {/* Gradient Mesh Background - subtle glow */}
      <motion.div
        variants={gradientMeshVariants}
        initial="initial"
        animate="animate"
        style={{
          position: 'absolute',
          top: '-30%',
          left: '-10%',
          width: '120%',
          height: '120%',
          background: 'radial-gradient(ellipse at center, var(--accent-primary) 0%, transparent 60%)',
          opacity: 0.06,
          filter: 'blur(80px)',
        }}
      />

      {/* Aurora Wave Effect */}
      <motion.div
        variants={auroraVariants}
        initial="initial"
        animate="animate"
        style={{
          position: 'absolute',
          top: '40%',
          width: '100%',
          height: '30%',
          background: 'linear-gradient(90deg, transparent, var(--accent-secondary), var(--accent-primary), transparent)',
          filter: 'blur(100px)',
          opacity: 0.1,
        }}
      />

      {/* Floating 3D Books - NO mouse tracking */}
      {bookConfigs.map((book, i) => (
        <motion.div
          key={i}
          custom={i}
          variants={floatingBookVariants(i)}
          initial="initial"
          animate="animate"
          style={{
            position: 'absolute',
            width: book.width,
            height: book.height,
            background: book.color,
            border: book.color.includes('var') ? 'none' : '1px solid rgba(255,255,255,0.08)',
            borderRadius: '4px',
            top: book.top,
            left: book.left,
            right: (book as any).right,
            bottom: (book as any).bottom,
            boxShadow: book.color.includes('accent') 
              ? '0 20px 50px rgba(255, 121, 0, 0.2), inset 0 0 20px rgba(255,255,255,0.05)'
              : '0 10px 40px rgba(0,0,0,0.15)',
            zIndex: book.zIndex,
            filter: book.blur ? `blur(${book.blur}px)` : 'none',
            opacity: book.opacity || 1,
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Book spine detail */}
          <div style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: '4px',
            height: '100%',
            background: 'rgba(0,0,0,0.2)',
            borderRadius: '4px 0 0 4px',
          }} />
          {/* Book page lines */}
          <div style={{
            position: 'absolute',
            right: '8px',
            top: '15%',
            width: '60%',
            height: '70%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-evenly',
            opacity: 0.15,
          }}>
            {[...Array(4)].map((_, j) => (
              <div key={j} style={{
                height: '2px',
                background: book.color.includes('accent') ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.3)',
                borderRadius: '1px',
                width: `${80 - (j * 10)}%`,
              }} />
            ))}
          </div>
        </motion.div>
      ))}

      {/* Floating Particles - subtle */}
      {particles.map((particle, i) => (
        <motion.div
          key={i}
          variants={particleVariants(i)}
          initial="initial"
          animate="animate"
          style={{
            position: 'absolute',
            left: particle.left,
            bottom: particle.bottom,
            width: particle.size,
            height: particle.size,
            borderRadius: '50%',
            background: i % 3 === 0 ? 'var(--accent-primary)' : 'rgba(255,255,255,0.5)',
            opacity: 0.4,
          }}
        />
      ))}

      {/* Subtle Grid Pattern */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)
        `,
        backgroundSize: '80px 80px',
        opacity: 0.5,
      }} />

      {children}
    </div>
  );
};

export default HeroBackground;
