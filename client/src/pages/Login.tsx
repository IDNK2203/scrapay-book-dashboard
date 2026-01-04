import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
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
    fontSize: '64px', // Big hero text
    fontWeight: 800,
    lineHeight: 1.1,
    letterSpacing: '-0.03em',
    marginBottom: '8px',
  },
  subHero: {
    fontSize: '64px',
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

  return (
    <div style={styles.container}>
      {/* Brand */}
      <motion.div 
        style={styles.brand}
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
        style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
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

