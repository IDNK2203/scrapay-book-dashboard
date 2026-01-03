import {
  Button,
  VStack,
  Input,
  Textarea,
  Stack,
  Dialog,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect } from 'react';
import type { Book } from './BookTable';

const editBookSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  author: z.string().min(2, 'Author must be at least 2 characters'),
  description: z.string().optional(),
});

type EditBookFormValues = z.infer<typeof editBookSchema>;

interface EditBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: EditBookFormValues) => Promise<void>;
  isLoading?: boolean;
  book: Book | null;
}

export default function EditBookModal({ isOpen, onClose, onSubmit, isLoading, book }: EditBookModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditBookFormValues>({
    resolver: zodResolver(editBookSchema),
  });

  // Pre-fill form when book changes
  useEffect(() => {
    if (book) {
      reset({
        name: book.name,
        author: book.author,
        description: book.description || '',
      });
    }
  }, [book, reset]);

  const handleFormSubmit = async (data: EditBookFormValues) => {
    await onSubmit(data);
    onClose();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={(e) => !e.open && handleClose()}>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>Edit Book</Dialog.Title>
          </Dialog.Header>
          <Dialog.Body>
            <form id="edit-book-form" onSubmit={handleSubmit(handleFormSubmit)}>
              <VStack gap={4} align="stretch">
                <Stack gap={1}>
                  <Dialog.Title as="label" fontSize="sm" fontWeight="medium">Book Name</Dialog.Title>
                  <Input {...register('name')} placeholder="Enter book name" />
                  {errors.name && <Dialog.Description color="red.500" fontSize="sm">{errors.name.message}</Dialog.Description>}
                </Stack>

                <Stack gap={1}>
                   <Dialog.Title as="label" fontSize="sm" fontWeight="medium">Author</Dialog.Title>
                  <Input {...register('author')} placeholder="Enter author name" />
                  {errors.author && <Dialog.Description color="red.500" fontSize="sm">{errors.author.message}</Dialog.Description>}
                </Stack>

                <Stack gap={1}>
                   <Dialog.Title as="label" fontSize="sm" fontWeight="medium">Description</Dialog.Title>
                  <Textarea {...register('description')} placeholder="Optional description" />
                  {errors.description && <Dialog.Description color="red.500" fontSize="sm">{errors.description.message}</Dialog.Description>}
                </Stack>
              </VStack>
            </form>
          </Dialog.Body>
          <Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <Button variant="outline" onClick={handleClose} disabled={isLoading}>Cancel</Button>
            </Dialog.CloseTrigger>
            <Button 
              type="submit" 
              form="edit-book-form" 
              loading={isLoading}
              colorPalette="purple"
            >
              Save Changes
            </Button>
          </Dialog.Footer>
          <Dialog.CloseTrigger />
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
}
