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
      <Dialog.Backdrop style={{ backdropFilter: 'blur(10px)', background: 'rgba(0,0,0,0.5)' }} />
      <Dialog.Positioner>
        <Dialog.Content style={{ 
          background: 'var(--bg-panel)', 
          color: 'var(--text-primary)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: 'var(--shadow-card)'
        }}>
          <Dialog.Header>
            <Dialog.Title style={{ fontSize: '20px', fontWeight: 700 }}>Edit Book</Dialog.Title>
          </Dialog.Header>
          <Dialog.Body>
            <form id="edit-book-form" onSubmit={handleSubmit(handleFormSubmit)}>
              <VStack gap={4} align="stretch">
                <Stack gap={1}>
                  <Dialog.Title as="label" fontSize="sm" fontWeight="medium" color="var(--text-secondary)">Book Name</Dialog.Title>
                  <Input 
                    {...register('name')} 
                    placeholder="Enter book name" 
                    style={{ 
                      background: 'rgba(255,255,255,0.03)',
                      borderColor: 'rgba(255,255,255,0.1)',
                      color: 'var(--text-primary)'
                    }}
                    _focus={{ borderColor: 'var(--accent-primary)' }}
                  />
                  {errors.name && <Dialog.Description color="red.400" fontSize="sm">{errors.name.message}</Dialog.Description>}
                </Stack>

                <Stack gap={1}>
                   <Dialog.Title as="label" fontSize="sm" fontWeight="medium" color="var(--text-secondary)">Author</Dialog.Title>
                  <Input 
                    {...register('author')} 
                    placeholder="Enter author name" 
                    style={{ 
                      background: 'rgba(255,255,255,0.03)',
                      borderColor: 'rgba(255,255,255,0.1)',
                      color: 'var(--text-primary)'
                    }}
                    _focus={{ borderColor: 'var(--accent-primary)' }}
                  />
                  {errors.author && <Dialog.Description color="red.400" fontSize="sm">{errors.author.message}</Dialog.Description>}
                </Stack>

                <Stack gap={1}>
                   <Dialog.Title as="label" fontSize="sm" fontWeight="medium" color="var(--text-secondary)">Description</Dialog.Title>
                  <Textarea 
                    {...register('description')} 
                    placeholder="Optional description" 
                    style={{ 
                      background: 'rgba(255,255,255,0.03)',
                      borderColor: 'rgba(255,255,255,0.1)',
                      color: 'var(--text-primary)'
                    }}
                    _focus={{ borderColor: 'var(--accent-primary)' }}
                  />
                  {errors.description && <Dialog.Description color="red.400" fontSize="sm">{errors.description.message}</Dialog.Description>}
                </Stack>
              </VStack>
            </form>
          </Dialog.Body>
          <Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <Button 
                variant="ghost" 
                onClick={handleClose} 
                disabled={isLoading}
                color="var(--text-secondary)"
                _hover={{ bg: 'rgba(255,255,255,0.05)' }}
              >
                Cancel
              </Button>
            </Dialog.CloseTrigger>
            <Button 
              type="submit" 
              form="edit-book-form" 
              loading={isLoading}
              bg="var(--accent-primary)"
              color="black"
              fontWeight="bold"
              _hover={{ opacity: 0.9 }}
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
