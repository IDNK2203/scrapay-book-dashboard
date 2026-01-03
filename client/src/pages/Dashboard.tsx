import { useAuth0 } from '@auth0/auth0-react';
import { useQuery } from '@apollo/client/react';
import { gql } from '@apollo/client';
import { 
  Container, 
  Flex, 
  Heading, 
  Button, 
  VStack, 
  Text,
  Avatar as AvatarNamespace,
  HStack,
  Spinner
} from '@chakra-ui/react';

// Chakra UI v3 Avatar components
const { Root: Avatar, Image: AvatarImage } = AvatarNamespace;

// GraphQL query to fetch books
const GET_BOOKS = gql`
  query GetBooks {
    books {
      id
      name
      author
      description
    }
  }
`;

interface Book {
  id: string;
  name: string;
  author: string;
  description?: string;
}

interface GetBooksData {
  books: Book[];
}

export default function Dashboard() {
  const { user, logout } = useAuth0();
  const { data, loading, error } = useQuery<GetBooksData>(GET_BOOKS);

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
          <Heading size="md">Your Book Collection</Heading>
          
          {loading && (
            <HStack gap={2}>
              <Spinner size="sm" />
              <Text>Loading books...</Text>
            </HStack>
          )}
          
          {error && (
            <Text color="red.500">
              Error loading books: {error.message}
            </Text>
          )}
          
          {data && (
            <Text color="gray.600">
              {data.books.length === 0 
                ? "No books yet. Add your first book!" 
                : `You have ${data.books.length} book(s) in your collection.`
              }
            </Text>
          )}
        </VStack>
      </VStack>
    </Container>
  );
}

