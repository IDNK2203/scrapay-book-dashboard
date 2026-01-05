import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LuBookOpen } from 'react-icons/lu';
import { loginStyles, buttonHoverStates } from '../theme/login.styles';
import { heroTextReveal, heroContainer } from '../theme/hero.animations';
import { HeroBackground } from '../components/hero/HeroBackground';

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
      <div style={loginStyles.container}>
        <div style={loginStyles.loader} />
      </div>
    );
  }

  return (
    <div style={loginStyles.container}>
      {/* Premium 3D Background with Parallax */}
      <HeroBackground />

      {/* Brand */}
      <motion.div 
        style={{...loginStyles.brand, zIndex: 10}}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <motion.div 
          style={loginStyles.brandIcon}
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <LuBookOpen size={18} color="black" />
        </motion.div>
        <span>Scrapay</span>
      </motion.div>

      <motion.div 
        variants={heroContainer} 
        initial="hidden" 
        animate="visible"
        style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 10 }}
      >
        <div style={loginStyles.hero}>
          <div style={{ overflow: 'hidden' }}>
            <motion.h1 style={loginStyles.heroText} variants={heroTextReveal}>
              Manage your library
            </motion.h1>
          </div>
          <div style={{ overflow: 'hidden' }}>
            <motion.h2 style={loginStyles.subHero} variants={heroTextReveal}>
              Effortlessly.
            </motion.h2>
          </div>
        </div>

        <motion.div 
          style={loginStyles.buttonGroup} 
          variants={heroTextReveal}
        >
          <motion.button 
            style={loginStyles.button}
            whileHover={{
              ...buttonHoverStates.google,
              boxShadow: '0 0 30px rgba(255, 121, 0, 0.4)',
            }}
            whileTap={buttonHoverStates.tap}
            onClick={() => loginWithRedirect({ authorizationParams: { connection: 'google-oauth2' } })}
          >
            Continue with Google
          </motion.button>
          
          <motion.button 
            style={loginStyles.button}
            whileHover={{
              ...buttonHoverStates.email,
              boxShadow: '0 0 20px rgba(255, 255, 255, 0.1)',
            }}
            whileTap={buttonHoverStates.tap}
            onClick={() => loginWithRedirect()}
          >
            Sign in with Email
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}



