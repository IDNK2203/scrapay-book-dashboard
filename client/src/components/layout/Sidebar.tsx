import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { LuLayoutDashboard, LuBookOpen, LuSettings, LuLogOut, LuPanelLeftClose, LuPanelLeftOpen, LuSun, LuMoon } from 'react-icons/lu';
import { Box, Flex, Text, Avatar, Icon, Button } from '@chakra-ui/react';
import { useTheme } from '../../theme/ThemeContext';
import { motion } from 'framer-motion';

// Quick inline styles for the "Antigravity" look using our variables
const styles = {
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
  },
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
  },
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
  },
  activeNavItem: {
    backgroundColor: 'rgba(255,255,255,0.03)',
    color: 'var(--text-primary)',
    boxShadow: '0 0 0 1px rgba(255,255,255,0.05)',
  },
  userSection: {
    marginTop: 'auto',
    paddingTop: '20px',
    borderTop: '1px solid rgba(255,255,255,0.05)',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '12px',
  },
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
  }
};

export const Sidebar = () => {
  const { user, logout } = useAuth0();
  const { theme, toggleTheme } = useTheme();
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Helper to get active styles
  const getNavLinkStyle = ({ isActive }: { isActive: boolean }) => ({
    ...styles.navItem,
    ...(isActive ? styles.activeNavItem : {}),
  });

  return (
    <aside style={{ ...styles.container, width: isCollapsed ? '80px' : '280px', padding: isCollapsed ? '24px 12px' : '24px' }}>
      {/* Collapse Toggle */}
      <div 
        role="button"
        onClick={() => setIsCollapsed(!isCollapsed)}
        style={{
          position: 'absolute',
          top: '28px',
          right: isCollapsed ? 'auto' : '20px',
          left: isCollapsed ? '50%' : 'auto',
          transform: isCollapsed ? 'translateX(-50%)' : 'none',
          cursor: 'pointer',
          color: 'var(--text-secondary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {isCollapsed ? <LuPanelLeftOpen size={20} /> : <LuPanelLeftClose size={20} />}
      </div>

      {/* Brand */}
      <div style={{ ...styles.brand, justifyContent: isCollapsed ? 'center' : 'flex-start', marginTop: '40px' }}>
        <div style={{ 
          width: '32px', 
          height: '32px', 
          minWidth: '32px',
          background: 'var(--accent-primary)', 
          borderRadius: '8px',
          display: 'grid',
          placeItems: 'center'
        }}>
          <LuBookOpen size={18} color="black" />
        </div>
        {!isCollapsed && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>Scrapay</motion.span>}
      </div>

      {/* Navigation */}
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <NavLink to="/dashboard" style={getNavLinkStyle} title="Dashboard">
          <LuLayoutDashboard size={20} style={{ minWidth: '20px' }} />
          {!isCollapsed && <span>Dashboard</span>}
        </NavLink>
        <NavLink to="/settings" style={getNavLinkStyle} title="Settings">
          <LuSettings size={20} style={{ minWidth: '20px' }} />
          {!isCollapsed && <span>Settings</span>}
        </NavLink>
      </nav>

      {/* User Section & Theme Toggle */}
      <div style={styles.userSection}>
        {/* Theme Toggle */}
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={toggleTheme}
          color="var(--text-secondary)"
          width={isCollapsed ? '100%' : 'auto'}
          justifyContent={isCollapsed ? 'center' : 'flex-start'}
          _hover={{ color: 'var(--text-primary)', bg: 'rgba(255,255,255,0.02)' }}
          mb={2}
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {theme === 'dark' ? <LuSun size={18} /> : <LuMoon size={18} />}
          {!isCollapsed && <span style={{ marginLeft: '12px' }}>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>}
        </Button>

        {/* Sign Out */}
        <Button 
          size="sm" 
          variant="ghost" 
          width="full" 
          justifyContent={isCollapsed ? 'center' : 'flex-start'} 
          color="var(--text-muted)"
          _hover={{ color: 'red.400', bg: 'rgba(255,68,68,0.05)' }}
          onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
          mb={4}
          title="Sign Out"
        >
          <Icon as={LuLogOut} mr={isCollapsed ? 0 : 2} />
          {!isCollapsed && 'Sign Out'}
        </Button>

        {/* Profile Card */}
        <Flex 
          align="center" 
          gap="3" 
          direction={isCollapsed ? 'column' : 'row'}
          style={{
            padding: isCollapsed ? '8px 0' : '12px',
            background: isCollapsed ? 'transparent' : 'rgba(255,255,255,0.02)',
            borderRadius: 'var(--radius-md)',
            border: isCollapsed ? 'none' : '1px solid rgba(255,255,255,0.05)'
          }}
        >
          <Avatar.Root size="sm">
            <Avatar.Fallback name={user?.name} bg="var(--accent-primary)" color="black" fontWeight="bold" />
            <Avatar.Image src={user?.picture} />
          </Avatar.Root>
          {!isCollapsed && (
            <Box flex="1" overflow="hidden">
              <Text fontSize="sm" fontWeight="700" color="var(--text-primary)" truncate>
                {user?.name}
              </Text>
              <Text fontSize="xs" color="var(--text-secondary)" truncate>
                {user?.email}
              </Text>
            </Box>
          )}
        </Flex>
      </div>
    </aside>
  );
};
