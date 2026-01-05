import { Auth0Provider } from '@auth0/auth0-react';
import { Routes, Route } from 'react-router-dom';
import { Toaster, Toast } from '@chakra-ui/react';
import { toaster } from './theme/toaster';
import { toastStyles } from './theme/toast.styles';
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
          <Toast.Root key={toast.id} style={toastStyles.root}>
            <Toast.Title style={toastStyles.title}>{toast.title}</Toast.Title>
            <Toast.Description style={toastStyles.description}>{toast.description}</Toast.Description>
            {toast.action && (
              <Toast.ActionTrigger style={toastStyles.actionTrigger}>
                {toast.action.label}
              </Toast.ActionTrigger>
            )}
            <Toast.CloseTrigger style={toastStyles.closeTrigger} />
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

