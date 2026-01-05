import type { CSSProperties } from 'react';

export const loginStyles = {
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
  } as CSSProperties,

  brand: {
    position: 'absolute' as const,
    top: '40px',
    left: '40px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    fontSize: '20px',
    fontWeight: 800,
  } as CSSProperties,

  hero: {
    textAlign: 'center' as const,
    marginBottom: '60px',
  } as CSSProperties,

  heroText: {
    fontSize: 'var(--font-size-hero)',
    fontWeight: 800,
    lineHeight: 1.1,
    letterSpacing: '-0.03em',
    marginBottom: '8px',
  } as CSSProperties,

  subHero: {
    fontSize: 'var(--font-size-subhero)',
    fontWeight: 300,
    color: 'var(--text-secondary)',
    lineHeight: 1.1,
    letterSpacing: '-0.03em',
  } as CSSProperties,

  buttonGroup: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '16px',
    width: '100%',
    maxWidth: '320px',
  } as CSSProperties,

  button: {
    background: 'transparent',
    border: '1px solid var(--text-primary)',
    color: 'var(--text-primary)',
    padding: '16px',
    fontSize: '16px',
    fontWeight: 600,
    borderRadius: '100px',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)',
  } as CSSProperties,

  buttonPrimary: {
    background: 'var(--text-primary)',
    color: 'var(--bg-app)',
    border: '1px solid var(--text-primary)',
  } as CSSProperties,

  brandIcon: {
    width: '32px',
    height: '32px',
    background: 'var(--accent-primary)',
    borderRadius: '8px',
    display: 'grid',
    placeItems: 'center',
  } as CSSProperties,

  loader: {
    width: '24px',
    height: '24px',
    border: '2px solid var(--text-secondary)',
    borderTopColor: 'var(--text-primary)',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  } as CSSProperties,

  backgroundLayer: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    pointerEvents: 'none' as const,
    perspective: '1000px',
    zIndex: 0,
  } as CSSProperties,
};

// Button hover states for Framer Motion
export const buttonHoverStates = {
  google: {
    backgroundColor: 'var(--accent-primary)',
    borderColor: 'var(--accent-primary)',
    color: 'black',
    scale: 1.05,
  },
  email: {
    scale: 1.05,
    backgroundColor: 'var(--bg-surface)',
  },
  tap: {
    scale: 0.95,
  },
};
