import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { LuLayoutDashboard, LuBookOpen, LuSettings, LuLogOut, LuPanelLeftClose, LuPanelLeftOpen, LuSun, LuMoon } from 'react-icons/lu';
import { Box, Flex, Text, Avatar, Icon, Button } from '@chakra-ui/react';
import { useTheme } from '../../theme/ThemeContext';
import { motion } from 'framer-motion';
import { 
  sidebarStyles, 
  getContainerStyle, 
  getToggleStyle, 
  getBrandStyle, 
  getProfileCardStyle 
} from '../../theme/sidebar.styles';

export const Sidebar = () => {
  const { user, logout } = useAuth0();
  const { theme, toggleTheme } = useTheme();
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Helper to get active styles
  const getNavLinkStyle = ({ isActive }: { isActive: boolean }) => ({
    ...sidebarStyles.navItem,
    ...(isActive ? sidebarStyles.activeNavItem : {}),
  });

  return (
    <aside style={getContainerStyle(isCollapsed)}>
      {/* Collapse Toggle */}
      <div 
        role="button"
        onClick={() => setIsCollapsed(!isCollapsed)}
        style={getToggleStyle(isCollapsed)}
      >
        {isCollapsed ? <LuPanelLeftOpen size={20} /> : <LuPanelLeftClose size={20} />}
      </div>

      {/* Brand */}
      <div style={getBrandStyle(isCollapsed)}>
        <div style={sidebarStyles.brandIcon}>
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
      <div style={sidebarStyles.userSection}>
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
          style={getProfileCardStyle(isCollapsed)}
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

