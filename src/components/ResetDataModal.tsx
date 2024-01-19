import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import { type JSX } from "react";
import { useNamespace } from "../hooks/useNamespace";

interface ResetDataModalProps {
  isOpen: boolean;
  onResetData: () => void;
  onCancel: () => void;
}

export function ResetDataModal({ isOpen, onResetData, onCancel }: ResetDataModalProps): JSX.Element {
  const namespace = useNamespace();
  return (
    <Modal isOpen={isOpen} onClose={onCancel}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Confirm remove all data?</ModalHeader>
        <ModalBody>
          This will remove all blocks and any custom settings in the <strong>{namespace ?? "default"}</strong> namespace
          only. Please ensure you have a backup as it will not be possible to recover the data once the operation
          completes.
        </ModalBody>

        <ModalFooter>
          <Button type="submit" onClick={onResetData} colorScheme="red" mr={3}>
            Reset Data
          </Button>
          <Button variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
