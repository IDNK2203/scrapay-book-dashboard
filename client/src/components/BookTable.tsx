import {
  Table,
  IconButton,
  HStack,
  Text,
  Badge,
  Box,
} from '@chakra-ui/react';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';

export interface Book {
  id: string;
  name: string;
  author: string;
  description?: string;
}

interface BookTableProps {
  books: Book[];
  onEdit?: (book: Book) => void;
  onDelete?: (bookId: string) => void;
}

export default function BookTable({ books, onEdit, onDelete }: BookTableProps) {
  return (
    <Box 
      borderWidth="1px" 
      borderRadius="lg" 
      overflow="hidden" 
      bg="white" 
      boxShadow="sm"
    >
      <Table.ScrollArea>
        <Table.Root variant="outline">
          <Table.Header>
            <Table.Row bg="gray.50">
              <Table.ColumnHeader>Name</Table.ColumnHeader>
              <Table.ColumnHeader>Author</Table.ColumnHeader>
              <Table.ColumnHeader>Description</Table.ColumnHeader>
              <Table.ColumnHeader width="100px">Actions</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {books.map((book) => (
              <Table.Row key={book.id} _hover={{ bg: "gray.50" }}>
                <Table.Cell fontWeight="medium">{book.name}</Table.Cell>
                <Table.Cell>
                  <Badge colorPalette="purple" variant="subtle">
                    {book.author}
                  </Badge>
                </Table.Cell>
                <Table.Cell>
                  <Text lineClamp={1} color="gray.600" maxW="300px">
                    {book.description || '-'}
                  </Text>
                </Table.Cell>
                <Table.Cell>
                  <HStack gap={2}>
                    <IconButton
                      aria-label="Edit book"
                      size="sm"
                      variant="ghost"
                      colorPalette="blue"
                      onClick={() => onEdit?.(book)}
                      disabled={!onEdit}
                    >
                      <FiEdit2 />
                    </IconButton>
                    <IconButton
                      aria-label="Delete book"
                      size="sm"
                      variant="ghost"
                      colorPalette="red"
                      onClick={() => onDelete?.(book.id)}
                      disabled={!onDelete}
                    >
                      <FiTrash2 />
                    </IconButton>
                  </HStack>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Table.ScrollArea>
    </Box>
  );
}
