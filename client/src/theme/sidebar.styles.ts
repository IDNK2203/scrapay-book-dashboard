import type { CSSProperties } from 'react';

export const sidebarStyles = {
  container: {
    height: '100vh',
    position: 'sticky' as const,
    top: 0,
    backgroundColor: 'var(--bg-panel)',
    borderRight: '1px solid rgba(255,255,255,0.05)',
    display: 'flex',
    flexDirection: 'column' as const,
    padding: '24px',
    zIndex: 50,
    transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    overflow: 'hidden',
  } as CSSProperties,

  brand: {
    marginBottom: '40px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    fontSize: '20px',
    fontWeight: 800,
    letterSpacing: '-0.02em',
    color: 'var(--text-primary)',
    whiteSpace: 'nowrap' as const,
    overflow: 'hidden',
  } as CSSProperties,

  navItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 16px',
    borderRadius: 'var(--radius-sm)',
    color: 'var(--text-secondary)',
    textDecoration: 'none',
    marginBottom: '4px',
    transition: 'all var(--duration-fast) var(--ease-smooth)',
    fontSize: '14px',
    fontWeight: 500,
    whiteSpace: 'nowrap' as const,
    overflow: 'hidden',
  } as CSSProperties,

  activeNavItem: {
    backgroundColor: 'rgba(255,255,255,0.03)',
    color: 'var(--text-primary)',
    boxShadow: '0 0 0 1px rgba(255,255,255,0.05)',
  } as CSSProperties,

  userSection: {
    marginTop: 'auto',
    paddingTop: '20px',
    borderTop: '1px solid rgba(255,255,255,0.05)',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '12px',
  } as CSSProperties,

  toggleButton: {
    position: 'absolute' as const,
    top: '24px',
    right: '-12px',
    cursor: 'pointer',
    background: 'var(--bg-panel)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '50%',
    width: '24px',
    height: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--text-secondary)',
    zIndex: 51,
  } as CSSProperties,

  brandIcon: {
    width: '32px',
    height: '32px',
    minWidth: '32px',
    background: 'var(--accent-primary)',
    borderRadius: '8px',
    display: 'grid',
    placeItems: 'center',
  } as CSSProperties,
};

// Helper to get container style based on collapsed state
export const getContainerStyle = (isCollapsed: boolean): CSSProperties => ({
  ...sidebarStyles.container,
  width: isCollapsed ? '80px' : '280px',
  padding: isCollapsed ? '24px 12px' : '24px',
});

// Helper to get toggle button position based on collapsed state
export const getToggleStyle = (isCollapsed: boolean): CSSProperties => ({
  position: 'absolute',
  top: '28px',
  right: isCollapsed ? 'auto' : '20px',
  left: isCollapsed ? '50%' : 'auto',
  transform: isCollapsed ? 'translateX(-50%)' : 'none',
  cursor: 'pointer',
  color: 'var(--text-secondary)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

// Helper for brand container based on collapsed state
export const getBrandStyle = (isCollapsed: boolean): CSSProperties => ({
  ...sidebarStyles.brand,
  justifyContent: isCollapsed ? 'center' : 'flex-start',
  marginTop: '40px',
});

// Helper for profile card based on collapsed state
export const getProfileCardStyle = (isCollapsed: boolean): CSSProperties => ({
  padding: isCollapsed ? '8px 0' : '12px',
  background: isCollapsed ? 'transparent' : 'rgba(255,255,255,0.02)',
  borderRadius: 'var(--radius-md)',
  border: isCollapsed ? 'none' : '1px solid rgba(255,255,255,0.05)',
});
