import { Button, Dialog, NativeSelect } from "@chakra-ui/react";
import { useEffect, useState, type ChangeEvent, type MouseEvent } from "react";
import { useFocus } from "../hooks/useFocus";
import { useGeneralSettings } from "../hooks/useGeneralSettings";
import { supportedTypes } from "../models/fileTypes";

interface AddNewModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onCreate: (language: string) => void;
}

export function AddNewModal({ isOpen, onCancel, onCreate }: AddNewModalProps) {
  const [settings] = useGeneralSettings();
  const [inputRef, setInputFocus] = useFocus<HTMLSelectElement>();
  const [language, setLanguage] = useState<string>(
    settings?.defaultLanguage === undefined || settings.defaultLanguage === "none" ? "text" : settings.defaultLanguage
  );

  const handleCreate = (event: MouseEvent<HTMLButtonElement>): void => {
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
    <Dialog.Root open={isOpen} onOpenChange={onCancel} scrollBehavior="inside">
      <Dialog.Trigger />
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.CloseTrigger />
          <Dialog.Header>
            <Dialog.Title>Choose a file type:</Dialog.Title>
          </Dialog.Header>
          <Dialog.Body>
            <NativeSelect.Root>
              <NativeSelect.Field ref={inputRef} name="language" onChange={handleChangeLanguage} value={language}>
                {supportedTypes.map((fileType) => (
                  <option key={fileType.language} value={fileType.language}>
                    {fileType.descr}
                  </option>
                ))}
              </NativeSelect.Field>
            </NativeSelect.Root>
          </Dialog.Body>
          <Dialog.Footer>
            <Button type="submit" mr={1} onClick={handleCreate}>
              Create
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
