import type { CSSProperties } from 'react';

export const toastStyles = {
  root: {
    width: '340px',
    background: 'var(--bg-panel)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 'var(--radius-sm)',
    padding: '16px',
    boxShadow: 'var(--shadow-card)',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    color: 'var(--text-primary)',
  } as CSSProperties,

  title: {
    fontWeight: 'bold',
    fontSize: '14px',
  } as CSSProperties,

  description: {
    fontSize: '13px',
    color: 'var(--text-secondary)',
  } as CSSProperties,

  actionTrigger: {
    marginTop: '8px',
    fontSize: '12px',
    color: 'var(--accent-primary)',
    textDecoration: 'underline',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: 0,
  } as CSSProperties,

  closeTrigger: {
    position: 'absolute',
    top: '8px',
    right: '8px',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    color: 'var(--text-secondary)',
  } as CSSProperties,
};
