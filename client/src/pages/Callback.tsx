import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import { Container, Spinner, Text, VStack } from '@chakra-ui/react';

export default function Callback() {
  const { isAuthenticated, isLoading, error } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        // Successfully authenticated, redirect to dashboard
        navigate('/dashboard');
      } else if (error) {
        // Authentication failed, redirect to login
        console.error('Auth error:', error);
        navigate('/');
      }
    }
  }, [isAuthenticated, isLoading, error, navigate]);

  return (
    <Container centerContent minH="100vh" display="flex" alignItems="center" justifyContent="center">
      <VStack gap={4}>
        <Spinner size="xl" color="blue.500" />
        <Text fontSize="lg" color="gray.600">
          Completing sign in...
        </Text>
      </VStack>
    </Container>
  );
}
