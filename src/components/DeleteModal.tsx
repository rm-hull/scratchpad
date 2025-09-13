import { Alert, Button, Dialog } from "@chakra-ui/react";

interface DeleteModalProps {
  isOpen: boolean;
  onDelete: () => void;
  onArchive: () => void;
  onCancel: () => void;
}

export function DeleteModal({ isOpen, onDelete, onArchive, onCancel }: DeleteModalProps) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onCancel} size="xl">
      <Dialog.Trigger />
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.CloseTrigger />
          <Dialog.Header>
            <Dialog.Title>Confirm delete?</Dialog.Title>
          </Dialog.Header>
          <Dialog.Body>
            <Alert.Root status="warning">
              <Alert.Indicator />
              <Alert.Content>
                <Alert.Description>
                  Note that this operation will remove the block from local storage entirely, and once deleted, cannot
                  be reverted or recovered.
                </Alert.Description>
              </Alert.Content>
            </Alert.Root>
            Alternatively, you can archive the block instead, which will retain the data in local storage but hides it
            from the main view.
          </Dialog.Body>
          <Dialog.Footer>
            <Button type="submit" onClick={onDelete} colorScheme="red" mr={3}>
              Delete
            </Button>
            <Button type="submit" onClick={onArchive} mr={3}>
              Archive
            </Button>
            <Button variant="ghost" onClick={onCancel}>
              Cancel
            </Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
}
