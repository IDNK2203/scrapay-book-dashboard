import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import { Container, VStack, Heading, Button, Text, Spinner } from '@chakra-ui/react';

export default function Login() {
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  if (isLoading) {
    return (
      <Container centerContent minH="100vh" display="flex" alignItems="center" justifyContent="center">
        <Spinner size="xl" />
      </Container>
    );
  }

  const handleGoogleLogin = () => {
    loginWithRedirect({
      authorizationParams: {
        connection: 'google-oauth2',
      },
    });
  };

  const handleEmailLogin = () => {
    loginWithRedirect();
  };

  return (
    <Container maxW="md" centerContent minH="100vh" display="flex" alignItems="center" justifyContent="center">
      <VStack gap={8} w="full">
        <VStack gap={2}>
          <Heading size="2xl">Book Dashboard</Heading>
          <Text color="gray.600">Manage your book collection</Text>
        </VStack>

        <VStack gap={4} w="full">
          <Button
            w="full"
            size="lg"
            onClick={handleGoogleLogin}
            colorScheme="gray"
            variant="outline"
          >
            Continue with Google
          </Button>

          <Text color="gray.500">or</Text>

          <Button
            w="full"
            size="lg"
            onClick={handleEmailLogin}
            colorScheme="blue"
          >
            Sign in with Email
          </Button>
        </VStack>
      </VStack>
    </Container>
  );
}
