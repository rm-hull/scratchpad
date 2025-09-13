import { Button, Dialog } from "@chakra-ui/react";
import { useNamespace } from "../hooks/useNamespace";

interface ResetDataModalProps {
  isOpen: boolean;
  onResetData: () => void;
  onCancel: () => void;
}

export function ResetDataModal({ isOpen, onResetData, onCancel }: ResetDataModalProps) {
  const namespace = useNamespace();
  return (
    <Dialog.Root open={isOpen} onOpenChange={onCancel}>
      <Dialog.Trigger />
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.CloseTrigger />
          <Dialog.Header>
            <Dialog.Title>Confirm remove all data?</Dialog.Title>
          </Dialog.Header>
          <Dialog.Body>
            This will remove all blocks and any custom settings in the <strong>{namespace ?? "default"}</strong>{" "}
            namespace only. Please ensure you have a backup as it will not be possible to recover the data once the
            operation completes.
          </Dialog.Body>
          <Dialog.Footer>
            <Button type="submit" onClick={onResetData} colorScheme="red" mr={3}>
              Reset Data
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
