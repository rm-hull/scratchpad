import {
  Alert,
  AlertDescription,
  AlertIcon,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { type JSX } from "react";

interface DeleteModalProps {
  isOpen: boolean;
  onDelete: () => void;
  onArchive: () => void;
  onCancel: () => void;
}

export function DeleteModal({ isOpen, onDelete, onArchive, onCancel }: DeleteModalProps): JSX.Element {
  return (
    <Modal isOpen={isOpen} onClose={onCancel} size="2xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Confirm delete?</ModalHeader>

        <ModalBody>
          <Alert status="warning">
            <AlertIcon />

            <AlertDescription>
              Note that this operation will remove the block from local storage entirely, and once deleted, cannot be
              reverted or recovered.
            </AlertDescription>
          </Alert>
          Alternatively, you can archive the block instead, which will retain the data in local storage but hides it
          from the main view.
        </ModalBody>
        <ModalFooter>
          <Button type="submit" onClick={onDelete} colorScheme="red" mr={3}>
            Delete
          </Button>
          <Button type="submit" onClick={onArchive} mr={3}>
            Archive
          </Button>
          <Button variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
