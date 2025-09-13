import { Alert, Box, Button, ButtonGroup, CloseButton, Dialog } from "@chakra-ui/react";

interface DeleteDialogProps {
  isOpen: boolean;
  onDelete: () => void;
  onArchive: () => void;
  onCancel: () => void;
}

export function DeleteDialog({ isOpen, onDelete, onArchive, onCancel }: DeleteDialogProps) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onCancel}>
      <Dialog.Trigger />
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.CloseTrigger asChild>
            <CloseButton size="sm" />
          </Dialog.CloseTrigger>
          <Dialog.Header>
            <Dialog.Title>Confirm delete?</Dialog.Title>
          </Dialog.Header>
          <Dialog.Body>
            <Box>
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
            </Box>
          </Dialog.Body>
          <Dialog.Footer>
            <ButtonGroup>
              <Dialog.ActionTrigger asChild>
                <Button variant="subtle">Cancel</Button>
              </Dialog.ActionTrigger>
              <Button type="submit" onClick={onArchive}>
                Archive
              </Button>
              <Button type="submit" onClick={onDelete} colorPalette="red">
                Delete
              </Button>
            </ButtonGroup>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
}
