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
            <Dialog.Title style={{ fontSize: '20px', fontWeight: 700 }}>Delete Book</Dialog.Title>
          </Dialog.Header>
          <Dialog.Body>
            <Text color="var(--text-secondary)">
              Are you sure you want to delete <strong style={{ color: 'var(--text-primary)' }}>"{bookName}"</strong>? This action cannot be undone.
            </Text>
          </Dialog.Body>
          <Dialog.Footer>
            <HStack gap={3}>
              <Button 
                variant="ghost" 
                onClick={onClose} 
                disabled={isLoading}
                color="var(--text-secondary)"
                _hover={{ bg: 'rgba(255,255,255,0.05)' }}
              >
                Cancel
              </Button>
              <Button 
                bg="#ff4444" // Specific red for delete
                color="white"
                onClick={handleConfirm}
                loading={isLoading}
                _hover={{ bg: '#ff2222' }}
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
