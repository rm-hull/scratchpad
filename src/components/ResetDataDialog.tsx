import { Button, ButtonGroup, CloseButton, Dialog } from "@chakra-ui/react";
import { useNamespace } from "../hooks/useNamespace";

interface ResetDataDialogProps {
  isOpen: boolean;
  onResetData: () => void;
  onCancel: () => void;
}

export function ResetDataDialog({ isOpen, onResetData, onCancel }: ResetDataDialogProps) {
  const namespace = useNamespace();
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
            <Dialog.Title>Confirm remove all data?</Dialog.Title>
          </Dialog.Header>
          <Dialog.Body>
            This will remove all blocks and any custom settings in the <strong>{namespace ?? "default"}</strong>{" "}
            namespace only. Please ensure you have a backup as it will not be possible to recover the data once the
            operation completes.
          </Dialog.Body>
          <Dialog.Footer>
            <ButtonGroup>
              <Dialog.ActionTrigger asChild>
                <Button variant="subtle">Cancel</Button>
              </Dialog.ActionTrigger>
              <Button type="submit" onClick={onResetData} colorPalette="red">
                Reset Data
              </Button>
            </ButtonGroup>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
}
