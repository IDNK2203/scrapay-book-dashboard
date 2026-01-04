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

const createBookSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  author: z.string().min(2, 'Author must be at least 2 characters'),
  description: z.string().optional(),
});

type CreateBookFormValues = z.infer<typeof createBookSchema>;

interface CreateBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateBookFormValues) => Promise<void>;
  isLoading?: boolean;
}

export default function CreateBookModal({ isOpen, onClose, onSubmit, isLoading }: CreateBookModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateBookFormValues>({
    resolver: zodResolver(createBookSchema),
  });

  const handleFormSubmit = async (data: CreateBookFormValues) => {
    await onSubmit(data);
    reset();
    onClose();
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={(e) => !e.open && onClose()}>
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
            <Dialog.Title style={{ fontSize: '20px', fontWeight: 700 }}>Add New Book</Dialog.Title>
          </Dialog.Header>
          <Dialog.Body>
            <form id="create-book-form" onSubmit={handleSubmit(handleFormSubmit)}>
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
                onClick={onClose} 
                disabled={isLoading}
                color="var(--text-secondary)"
                _hover={{ bg: 'rgba(255,255,255,0.05)' }}
              >
                Cancel
              </Button>
            </Dialog.CloseTrigger>
            <Button 
              type="submit" 
              form="create-book-form" 
              loading={isLoading}
              bg="var(--accent-primary)"
              color="black"
              fontWeight="bold"
              _hover={{ opacity: 0.9 }}
            >
              Add Book
            </Button>
          </Dialog.Footer>
          <Dialog.CloseTrigger />
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
}
