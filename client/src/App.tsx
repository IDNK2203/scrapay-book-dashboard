import { Auth0Provider } from '@auth0/auth0-react';
import { Routes, Route } from 'react-router-dom';
import { Toaster, Toast } from '@chakra-ui/react';
import { toaster } from './theme/toaster';
import { ApolloProvider } from './lib/apollo';
import Login from './pages/Login';
import Callback from './pages/Callback';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
  const audience = import.meta.env.VITE_AUTH0_AUDIENCE;

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin + '/callback',
        audience: audience,
      }}
    >
      <Toaster toaster={toaster}>
        {(toast) => (
          <Toast.Root 
            key={toast.id}
            style={{
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
            }}
          >
            <Toast.Title style={{ fontWeight: 'bold', fontSize: '14px' }}>{toast.title}</Toast.Title>
            <Toast.Description style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{toast.description}</Toast.Description>
            {toast.action && (
              <Toast.ActionTrigger style={{ 
                marginTop: '8px', 
                fontSize: '12px', 
                color: 'var(--accent-primary)',
                textDecoration: 'underline',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0
              }}>
                {toast.action.label}
              </Toast.ActionTrigger>
            )}
            <Toast.CloseTrigger style={{
              position: 'absolute',
              top: '8px',
              right: '8px',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--text-secondary)',
            }} />
          </Toast.Root>
        )}
      </Toaster>
      <ApolloProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/callback" element={<Callback />} />
            <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />
        </Routes>
      </ApolloProvider>
    </Auth0Provider>
  );
}

export default App;

