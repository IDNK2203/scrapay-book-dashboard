import { useAuth0 } from '@auth0/auth0-react';
import { 
  Container, 
  Flex, 
  Heading, 
  Button, 
  VStack, 
  Text,
  Avatar as AvatarNamespace,
  HStack
} from '@chakra-ui/react';

// Chakra UI v3 Avatar components
const { Root: Avatar, Image: AvatarImage } = AvatarNamespace;

export default function Dashboard() {
  const { user, logout } = useAuth0();

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  return (
    <Container maxW="container.xl" py={8}>
      <VStack gap={8} align="stretch">
        {/* Header */}
        <Flex justify="space-between" align="center">
          <Heading size="lg">Dashboard</Heading>
          <HStack gap={4}>
            <HStack gap={2}>
              <Avatar size="sm">
                <AvatarImage src={user?.picture} alt={user?.name} />
              </Avatar>
              <Text fontSize="sm" fontWeight="medium">
                {user?.name || user?.email}
              </Text>
            </HStack>
            <Button onClick={handleLogout} variant="outline" colorScheme="red">
              Sign Out
            </Button>
          </HStack>
        </Flex>

        {/* Content */}
        <VStack gap={4} align="start">
          <Heading size="md">Welcome to Your Book Collection</Heading>
          <Text color="gray.600">
            Book management features will be available in Story 3.1
          </Text>
        </VStack>
      </VStack>
    </Container>
  );
}
