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
import { useEffect, useState, type ChangeEvent, type FormEvent, type JSX } from "react";
import useFocus from "../hooks/useFocus";
import { supportedTypes } from "../models/fileTypes";

interface AddNewModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onCreate: (language: string) => void;
}

export default function AddNewModal({ isOpen, onCancel, onCreate }: AddNewModalProps): JSX.Element | null {
  const [inputRef, setInputFocus] = useFocus<HTMLSelectElement>();
  const [language, setLanguage] = useState<string>("text");

  const handleCreate = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    onCreate(language);
    onCancel();
  };

  const handleChangeLanguage = (event: ChangeEvent<HTMLSelectElement>): void => {
    setLanguage(event.target.value);
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(setInputFocus, 0);
    }
  }, [isOpen, setInputFocus]);

  return (
    <Modal isOpen={isOpen} onClose={onCancel} scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleCreate}>
          <ModalHeader>Choose a file type:</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Select ref={inputRef} name="language" onChange={handleChangeLanguage} value={language}>
              {supportedTypes.map((fileType) => (
                <option key={fileType.language} value={fileType.language}>
                  {fileType.descr}
                </option>
              ))}
            </Select>
          </ModalBody>

          <ModalFooter>
            <Button type="submit" mr={1}>
              Create
            </Button>
            <Button variant="ghost" onClick={onCancel}>
              Cancel
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
