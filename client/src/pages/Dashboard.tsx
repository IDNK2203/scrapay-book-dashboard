import { useQuery, useMutation } from '@apollo/client/react';
import { gql } from '@apollo/client';
import { useState } from 'react';
import { Heading, Text, VStack, Button, Icon, Box } from '@chakra-ui/react';
import { FiPlus } from 'react-icons/fi'; // Using simple plus icon
import { AppShell } from '../components/layout/AppShell';
import { BookGrid } from '../components/ui/BookGrid';
import { SearchBar } from '../components/ui/SearchBar';
import CreateBookModal from '../components/CreateBookModal';
import EditBookModal from '../components/EditBookModal';
import DeleteConfirmDialog from '../components/DeleteConfirmDialog';

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
  
  // Local state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [deletingBook, setDeletingBook] = useState<Book | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Handlers
  const handleCreateBook = async (bookData: any) => {
    try {
      await createBook({ variables: { input: bookData } });
      setIsCreateModalOpen(false);
    } catch (err) {
      console.error("Failed to add book", err);
    }
  };

  const handleUpdateBook = async (bookData: any) => {
    if (!editingBook) return;
    try {
      await updateBook({ variables: { id: editingBook.id, input: bookData } });
      setEditingBook(null);
    } catch (err) {
      console.error("Failed to update book", err);
    }
  };

  const handleDelete = (bookId: string) => {
    const book = data?.books.find(b => b.id === bookId);
    if (book) setDeletingBook(book);
  };

  const handleConfirmDelete = async () => {
    if (!deletingBook) return;
    try {
      await deleteBook({ variables: { id: deletingBook.id } });
      setDeletingBook(null);
    } catch (err) {
      console.error("Failed to delete book", err);
    }
  };

  const handleEdit = (book: any) => {
      // Map back from Title -> Name if needed, but here we receive the book object from BookCard/Grid
      // The BookCard uses 'title', but we passed mapped objects. 
      // Actually BookGrid calls onEdit with the book object it received.
      // We passed mapped objects { ...b, title: b.name }.
      // So 'book' here has 'title'. We need to convert it back to what EditBookModal expects if necessary.
      // EditBookModal expects { name, author, description }.
      // Let's ensure we pass the right shape.
      setEditingBook({
          id: book.id,
          name: book.title || book.name, // Handle both just in case
          author: book.author,
          description: book.description
      });
  };

  // Filter books
  const books = data?.books || [];
  const filteredBooks = books.filter(b => 
    b.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    b.author.toLowerCase().includes(searchQuery.toLowerCase())
  ).map(b => ({
    ...b,
    title: b.name // Map name to title for UI components
  }));

  return (
    <AppShell>
      {/* Page Header */}
      <Box 
        mb={8} 
        display="flex" 
        flexDirection={{ base: 'column', md: 'row' }} 
        justifyContent="space-between" 
        alignItems={{ base: 'flex-start', md: 'center' }} 
        gap={{ base: 4, md: 0 }}
      >
        <VStack align="flex-start" gap={1}>
          <Heading size="2xl" style={{ color: 'var(--text-primary)', fontWeight: 800, letterSpacing: '-0.03em' }}>
            Library
          </Heading>
          <Text color="var(--text-secondary)">
            Manage your personal collection
          </Text>
        </VStack>
        <Box width={{ base: '100%', md: 'auto' }}>
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </Box>
      </Box>

      {/* Main Content */}
      <Box>
        <Box mb={8} display="flex" justifyContent="flex-end">
             <Button 
                onClick={() => setIsCreateModalOpen(true)}
                bg="var(--accent-primary)"
                color="black"
                _hover={{ bg: 'var(--accent-primary)', opacity: 0.9, transform: 'scale(1.02)' }}
                _active={{ transform: 'scale(0.98)' }}
                transition="all 0.2s"
                css={{
                    fontWeight: 600,
                    borderRadius: 'var(--radius-sm)',
                    px: 6
                }}
            >
              <Icon as={FiPlus} mr={2} />
              Add Book
            </Button>
        </Box>

        {loading ? (
           <Text color="var(--text-secondary)">Loading library...</Text>
        ) : error ? (
           <Text color="red.400">Error loading books: {error.message}</Text>
        ) : (
            <BookGrid 
                books={filteredBooks} 
                onEdit={handleEdit} 
                onDelete={handleDelete} 
            />
        )}
      </Box>

      {/* Modals - Keeping existing functional modals but should style them later or wrap them */}
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
    </AppShell>
  );
}

