import { NavLink } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { LuLayoutDashboard, LuBookOpen, LuSettings, LuLogOut } from 'react-icons/lu';
import { Box, Flex, Text, Avatar, Icon, Button } from '@chakra-ui/react';

// Quick inline styles for the "Antigravity" look using our variables
const styles = {
  container: {
    width: '280px',
    height: '100vh',
    position: 'sticky' as const,
    top: 0,
    backgroundColor: 'var(--bg-panel)',
    borderRight: '1px solid rgba(255,255,255,0.05)',
    display: 'flex',
    flexDirection: 'column' as const,
    padding: '24px',
    zIndex: 50,
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
  }
};

export const Sidebar = () => {
  const { user, logout } = useAuth0();

  // Helper to get active styles
  const getNavLinkStyle = ({ isActive }: { isActive: boolean }) => ({
    ...styles.navItem,
    ...(isActive ? styles.activeNavItem : {}),
  });

  return (
    <aside style={styles.container}>
      {/* Brand */}
      <div style={styles.brand}>
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
      </div>

      {/* Navigation */}
      <nav>
        <NavLink to="/dashboard" style={getNavLinkStyle}>
          <LuLayoutDashboard size={20} />
          Dashboard
        </NavLink>
        <NavLink to="/settings" style={getNavLinkStyle}>
          <LuSettings size={20} />
          Settings
        </NavLink>
      </nav>

      {/* User Section */}
      <div style={styles.userSection}>
        <Flex align="center" gap="3" mb="4">
          <Avatar.Root size="sm">
            <Avatar.Fallback name={user?.name} bg="gray.700" color="white" />
            <Avatar.Image src={user?.picture} />
          </Avatar.Root>
          <Box flex="1" overflow="hidden">
            <Text fontSize="sm" fontWeight="600" color="var(--text-primary)" truncate>
              {user?.name}
            </Text>
            <Text fontSize="xs" color="var(--text-secondary)" truncate>
              {user?.email}
            </Text>
          </Box>
        </Flex>
        
        <Button 
          size="sm" 
          variant="ghost" 
          width="full" 
          justifyContent="flex-start" 
          color="var(--text-muted)"
          _hover={{ color: 'var(--accent-primary)', bg: 'rgba(255,255,255,0.02)' }}
          onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
        >
          <Icon as={LuLogOut} mr="2" />
          Sign Out
        </Button>
      </div>
    </aside>
  );
};
