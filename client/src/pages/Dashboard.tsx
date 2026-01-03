import { useAuth0 } from '@auth0/auth0-react';
import { useQuery, useMutation } from '@apollo/client/react';
import { gql } from '@apollo/client';
import { useState } from 'react';
import { 
  Container, 
  Flex, 
  Heading, 
  Button, 
  VStack, 
  Text,
  Avatar as AvatarNamespace,
  HStack,
  Box,
  Skeleton,
  Stack,
  Icon,
} from '@chakra-ui/react';
import { FiBookOpen } from 'react-icons/fi';
import BookTable, { type Book } from '../components/BookTable';
import CreateBookModal from '../components/CreateBookModal';
// Actually, let's stick to standard Chakra Toaster if possible or custom one.
// The user has a "components/ui" folder? No, I found it didn't exist earlier.
// So I will avoid importing from components/ui/toaster and use whatever mechanism is standard or just console log for now if Toaster is complex.
// Wait, Chakra v3 uses an imported `toaster` object usually. I'll rely on global toaster if configured, or just skip it for now and add basic console logs/alerts to be safe, then refine.
// BUT, better user experience is crucial.
// Let's try to find where Toaster is defined. If not, I'll assume standard setup or just use basic alert/console for this iteration to avoid import errors.
// REVISION: I will use standard console methods for now to ensure functionality first, then refine UI polish in Story 4.2 (Error Handling & Polish).

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

const CREATE_BOOK = gql`
  mutation CreateBook($input: CreateBookInput!) {
    createBook(input: $input) {
      id
      name
      author
      description
    }
  }
`;

interface GetBooksData {
  books: Book[];
}

export default function Dashboard() {
  const { user, logout } = useAuth0();
  const { data, loading, error } = useQuery<GetBooksData>(GET_BOOKS);
  const [createBook, { loading: creating }] = useMutation(CREATE_BOOK, {
    refetchQueries: [{ query: GET_BOOKS }],
    awaitRefetchQueries: true,
  });
  
  // Use local state for open/close
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  const handleCreateBook = async (bookData: any) => {
    try {
      await createBook({ variables: { input: bookData } });
      // toaster.create({ title: "Book added", type: "success" }) // Commented out until toaster setup verified
      console.log("Book added successfully");
    } catch (err) {
      console.error("Failed to add book", err);
      // toaster.create({ title: "Error adding book", type: "error" })
    }
  };

  const handleEdit = (book: Book) => {
    console.log('Edit book:', book);
  };

  const handleDelete = (bookId: string) => {
    console.log('Delete book:', bookId);
  };

  return (
    <Box minH="100vh" bg="gray.50">
      {/* Navbar */}
      <Box bg="white" shadow="sm" py={4} mb={8}>
        <Container maxW="container.xl">
          <Flex justify="space-between" align="center">
            <HStack gap={2}>
              <Icon as={FiBookOpen} boxSize={6} color="purple.500" />
              <Heading size="md" color="purple.600">Scrapay Books</Heading>
            </HStack>
            <HStack gap={4}>
              <HStack gap={2}>
                <Avatar size="sm">
                  <AvatarImage src={user?.picture} alt={user?.name} />
                </Avatar>
                <Text fontSize="sm" fontWeight="medium">
                  {user?.name || user?.email}
                </Text>
              </HStack>
              <Button onClick={handleLogout} variant="ghost" size="sm" colorPalette="gray">
                Sign Out
              </Button>
            </HStack>
          </Flex>
        </Container>
      </Box>

      <Container maxW="container.xl" pb={12}>
        <VStack gap={8} align="stretch">
          <Flex justify="space-between" align="center">
            <Box>
              <Heading size="lg" mb={2}>My Collection</Heading>
              <Text color="gray.600">
                Manage your personal library using the Scrapay dashboard.
              </Text>
            </Box>
            <Button 
              colorPalette="purple" 
              onClick={() => setIsModalOpen(true)}
            >
              <Icon as={FiBookOpen} />
              Add Book
            </Button>
          </Flex>

          {/* Error State */}
          {error && (
            <Box p={4} bg="red.50" color="red.500" borderRadius="md" borderWidth="1px" borderColor="red.200">
               <Text fontWeight="bold">Error loading books:</Text>
               <Text>{error.message}</Text>
            </Box>
          )}

          {/* Loading State */}
          {loading && (
            <Box borderWidth="1px" borderRadius="lg" bg="white" p={6} boxShadow="sm">
              <Stack gap={4}>
                <Skeleton height="40px" />
                <Skeleton height="60px" />
                <Skeleton height="60px" />
                <Skeleton height="60px" />
              </Stack>
            </Box>
          )}
          
          {/* Data State */}
          {!loading && data && (
            <>
              {data.books.length === 0 ? (
                <Box 
                  textAlign="center" 
                  py={16} 
                  bg="white" 
                  borderRadius="lg" 
                  borderWidth="1px" 
                  borderStyle="dashed"
                  boxShadow="sm"
                >
                  <VStack gap={4}>
                    <Box p={4} bg="purple.50" borderRadius="full">
                      <Icon as={FiBookOpen} boxSize={8} color="purple.500" />
                    </Box>
                    <Heading size="md" color="gray.700">No books yet</Heading>
                    <Text color="gray.500">Get started by adding your first book to the collection.</Text>
                    <Button 
                      colorPalette="purple" 
                      variant="outline" 
                      mt={2}
                      onClick={() => setIsModalOpen(true)}
                    >
                      Add First Book
                    </Button>
                  </VStack>
                </Box>
              ) : (
                <BookTable 
                  books={data.books} 
                  onEdit={handleEdit} 
                  onDelete={handleDelete}
                />
              )}
            </>
          )}
        </VStack>

        <CreateBookModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          onSubmit={handleCreateBook}
          isLoading={creating}
        />
      </Container>
    </Box>
  );
}

