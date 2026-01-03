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
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>Add New Book</Dialog.Title>
          </Dialog.Header>
          <Dialog.Body>
            <form id="create-book-form" onSubmit={handleSubmit(handleFormSubmit)}>
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
              <Button variant="outline" onClick={onClose} disabled={isLoading}>Cancel</Button>
            </Dialog.CloseTrigger>
            <Button 
              type="submit" 
              form="create-book-form" 
              loading={isLoading}
              colorPalette="purple"
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
