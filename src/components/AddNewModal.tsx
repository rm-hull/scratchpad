import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
} from "@chakra-ui/react";
import { useState, type JSX, type ChangeEvent } from "react";
import { supportedTypes } from "../models/fileTypes";

interface AddNewModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onCreate: (language: string) => void;
}

export default function AddNewModal({ isOpen, onCancel, onCreate }: AddNewModalProps): JSX.Element | null {
  const [language, setLanguage] = useState<string>("text");
  const handleCreate = (): void => {
    onCreate(language);
    onCancel();
  };

  const handleChangeLanguage = (event: ChangeEvent<HTMLSelectElement>): void => {
    setLanguage(event.target.value);
  };

  return (
    <Modal isOpen={isOpen} onClose={onCancel} scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Choose a file type:</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Select onChange={handleChangeLanguage} value={language}>
            {supportedTypes.map((fileType) => (
              <option key={fileType.language} value={fileType.language}>
                {fileType.descr}
              </option>
            ))}
          </Select>
        </ModalBody>

        <ModalFooter>
          <Button onClick={handleCreate} mr={1}>
            Create
          </Button>
          <Button variant="ghost" onClick={onCancel}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
