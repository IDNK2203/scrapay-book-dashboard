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
import EditBookModal from '../components/EditBookModal';
import DeleteConfirmDialog from '../components/DeleteConfirmDialog';

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

const UPDATE_BOOK = gql`
  mutation UpdateBook($id: ID!, $input: UpdateBookInput!) {
    updateBook(id: $id, input: $input) {
      id
      name
      author
      description
    }
  }
`;

const DELETE_BOOK = gql`
  mutation DeleteBook($id: ID!) {
    deleteBook(id: $id)
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
  const [updateBook, { loading: updating }] = useMutation(UPDATE_BOOK, {
    refetchQueries: [{ query: GET_BOOKS }],
    awaitRefetchQueries: true,
  });
  const [deleteBook, { loading: deleting }] = useMutation(DELETE_BOOK, {
    refetchQueries: [{ query: GET_BOOKS }],
    awaitRefetchQueries: true,
  });
  
  // Modal states
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [deletingBook, setDeletingBook] = useState<Book | null>(null);
  
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
      console.log("Book added successfully");
    } catch (err) {
      console.error("Failed to add book", err);
    }
  };

  const handleEdit = (book: Book) => {
    setEditingBook(book);
  };

  const handleUpdateBook = async (bookData: any) => {
    if (!editingBook) return;
    try {
      await updateBook({ variables: { id: editingBook.id, input: bookData } });
      console.log("Book updated successfully");
      setEditingBook(null);
    } catch (err) {
      console.error("Failed to update book", err);
    }
  };

  const handleDelete = (bookId: string) => {
    const book = data?.books.find(b => b.id === bookId);
    if (book) {
      setDeletingBook(book);
    }
  };

  const handleConfirmDelete = async () => {
    if (!deletingBook) return;
    try {
      await deleteBook({ variables: { id: deletingBook.id } });
      console.log("Book deleted successfully");
      setDeletingBook(null);
    } catch (err) {
      console.error("Failed to delete book", err);
    }
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
              onClick={() => setIsCreateModalOpen(true)}
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
                      onClick={() => setIsCreateModalOpen(true)}
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
          isOpen={isCreateModalOpen} 
          onClose={() => setIsCreateModalOpen(false)} 
          onSubmit={handleCreateBook}
          isLoading={creating}
        />

        <EditBookModal
          isOpen={!!editingBook}
          onClose={() => setEditingBook(null)}
          onSubmit={handleUpdateBook}
          isLoading={updating}
          book={editingBook}
        />

        <DeleteConfirmDialog
          isOpen={!!deletingBook}
          onClose={() => setDeletingBook(null)}
          onConfirm={handleConfirmDelete}
          isLoading={deleting}
          bookName={deletingBook?.name || ''}
        />
      </Container>
    </Box>
  );
}

