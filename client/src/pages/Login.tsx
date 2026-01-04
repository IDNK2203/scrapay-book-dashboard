import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { LuBookOpen } from 'react-icons/lu';
import { staggerContainer, fadeInUp } from '../theme/animations';

const styles = {
  container: {
    height: '100vh',
    width: '100%',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    background: 'var(--bg-app)',
    color: 'var(--text-primary)',
    position: 'relative' as const,
    overflow: 'hidden',
  },
  brand: {
    position: 'absolute' as const,
    top: '40px',
    left: '40px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    fontSize: '20px',
    fontWeight: 800,
  },
  hero: {
    textAlign: 'center' as const,
    marginBottom: '60px',
  },
  heroText: {
    fontSize: 'var(--font-size-hero)', // Responsive clamp
    fontWeight: 800,
    lineHeight: 1.1,
    letterSpacing: '-0.03em',
    marginBottom: '8px',
  },
  subHero: {
    fontSize: 'var(--font-size-subhero)',
    fontWeight: 300, // Light weight for contrast
    color: 'var(--text-secondary)',
    lineHeight: 1.1,
    letterSpacing: '-0.03em',
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '16px',
    width: '100%',
    maxWidth: '320px',
  },
  button: {
    background: 'transparent',
    border: '1px solid var(--text-primary)',
    color: 'var(--text-primary)',
    padding: '16px',
    fontSize: '16px',
    fontWeight: 600,
    borderRadius: '100px', // Pill shape
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)',
  },
  buttonPrimary: {
    background: 'var(--text-primary)',
    color: 'var(--bg-app)',
    border: '1px solid var(--text-primary)',
  }
};

export default function Login() {
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  if (isLoading) {
    return (
      <div style={styles.container}>
        {/* Simple loader */}
        <div style={{ 
          width: '24px', 
          height: '24px', 
          border: '2px solid var(--text-secondary)', 
          borderTopColor: 'var(--text-primary)', 
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }} />
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  // Animation variants for specific floating books
  const floatingBook: Variants = {
    initial: { y: 0, rotateY: 0, rotateZ: 0 },
    animate: (i: number) => ({
      y: [0, -20, 0],
      rotateY: [0, i % 2 === 0 ? 10 : -10, 0],
      rotateZ: [0, i % 2 === 0 ? 5 : -5, 0],
      transition: {
        duration: 4 + i,
        repeat: Infinity,
        ease: "easeInOut"
      }
    })
  };

  return (
    <div style={styles.container}>
      {/* 3D Background Layer */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        pointerEvents: 'none',
        perspective: '1000px',
        zIndex: 0
      }}>
        {/* Abstract "Books" */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={floatingBook}
            initial="initial"
            animate="animate"
            style={{
              position: 'absolute',
              width: i % 2 === 0 ? '60px' : '80px',
              height: i % 2 === 0 ? '80px' : '110px',
              background: i === 0 ? 'var(--accent-primary)' : 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '4px',
              top: `${20 + (i * 15)}%`,
              left: `${10 + (i * 15)}%`,
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
              zIndex: i === 0 ? 1 : 0,
              filter: 'blur(1px)'
            }}
          />
        ))}
      </div>

      {/* Brand */}
      <motion.div 
        style={{...styles.brand, zIndex: 10}}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <div style={{ 
          width: '32px', 
          height: '32px', 
          background: 'var(--accent-primary)', 
          borderRadius: '8px',
          display: 'grid',
          placeItems: 'center'
        }}>
          <LuBookOpen size={18} color="black" />
        </div>
        <span>Scrapay</span>
      </motion.div>

      <motion.div 
        variants={staggerContainer} 
        initial="hidden" 
        animate="show"
        style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 10 }}
      >
        <div style={styles.hero}>
          <div style={{ overflow: 'hidden' }}>
            <motion.h1 style={styles.heroText} variants={fadeInUp}>
              Manage your library
            </motion.h1>
          </div>
          <div style={{ overflow: 'hidden' }}>
            <motion.h2 style={styles.subHero} variants={fadeInUp}>
              Effortlessly.
            </motion.h2>
          </div>
        </div>

        <motion.div style={styles.buttonGroup} variants={fadeInUp}>
          <motion.button 
            style={styles.button}
            whileHover={{ 
              backgroundColor: 'var(--accent-primary)', 
              borderColor: 'var(--accent-primary)',
              color: 'black',
              scale: 1.05
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => loginWithRedirect({ authorizationParams: { connection: 'google-oauth2' } })}
          >
            Continue with Google
          </motion.button>
          
          <motion.button 
            style={styles.button}
            whileHover={{ 
              scale: 1.05,
              backgroundColor: 'var(--bg-surface)',
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => loginWithRedirect()}
          >
            Sign in with Email
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}

