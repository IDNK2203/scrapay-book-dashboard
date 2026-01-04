import React, { useState, useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { motion, AnimatePresence } from 'framer-motion';
import { LuMenu, LuX } from 'react-icons/lu';

interface AppShellProps {
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false); // Reset on desktop
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-app)' }}>
      {/* Mobile Hamburger Button */}
      {isMobile && (
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          style={{
            position: 'fixed', // Fixed to stay visible
            top: '16px',
            left: '16px',
            zIndex: 90,
            background: 'var(--bg-panel)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '8px',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-primary)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}
        >
          <LuMenu size={24} />
        </button>
      )}

      {/* Sidebar Wrapper */}
      {isMobile ? (
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMobileMenuOpen(false)}
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'rgba(0,0,0,0.6)',
                  zIndex: 99,
                  backdropFilter: 'blur(2px)'
                }}
              />
              {/* Drawer */}
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  bottom: 0,
                  zIndex: 100,
                  height: '100%',
                  boxShadow: 'var(--shadow-xl)'
                }}
              >
                <div style={{ position: 'relative', height: '100%' }}>
                  <Sidebar />
                  {/* Close Button Inside Drawer */}
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    style={{
                      position: 'absolute',
                      top: '16px',
                      right: '-48px', // Float outside lightly or just rely on backdrop? Let's put it inside Sidebar generally, but Sidebar is sticky.
                      // Actually, let's just rely on the existing Sidebar toggle or backdrop.
                      // Or better, add a close button absolutely positioned if needed.
                      // For now, backdrop click is standard.
                      display: 'none'
                    }}
                  >
                   <LuX size={24} />
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      ) : (
        <div style={{ flexShrink: 0 }}>
          <Sidebar />
        </div>
      )}

      {/* Main Content Area */}
      <main style={{
        flex: 1,
        overflowY: 'auto',
        position: 'relative',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        paddingTop: isMobile ? '72px' : '0' // Space for hamburger
      }}>

        <div style={{
          maxWidth: '1180px',
          width: '100%',
          margin: '0 auto',
          padding: isMobile ? '16px' : '32px 24px',
          flex: 1,
        }}>
          {children}
        </div>
      </main>
    </div>
  );
};
