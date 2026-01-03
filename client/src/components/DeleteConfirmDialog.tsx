import {
  Button,
  Text,
  Dialog,
  HStack,
} from '@chakra-ui/react';

interface DeleteConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  isLoading?: boolean;
  bookName: string;
}

export default function DeleteConfirmDialog({ 
  isOpen, 
  onClose, 
  onConfirm, 
  isLoading, 
  bookName 
}: DeleteConfirmDialogProps) {
  const handleConfirm = async () => {
    await onConfirm();
    onClose();
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={(e) => !e.open && onClose()}>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>Delete Book</Dialog.Title>
          </Dialog.Header>
          <Dialog.Body>
            <Text>
              Are you sure you want to delete <strong>"{bookName}"</strong>? This action cannot be undone.
            </Text>
          </Dialog.Body>
          <Dialog.Footer>
            <HStack gap={3}>
              <Button variant="outline" onClick={onClose} disabled={isLoading}>
                Cancel
              </Button>
              <Button 
                colorPalette="red" 
                onClick={handleConfirm}
                loading={isLoading}
              >
                Delete
              </Button>
            </HStack>
          </Dialog.Footer>
          <Dialog.CloseTrigger />
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
}
