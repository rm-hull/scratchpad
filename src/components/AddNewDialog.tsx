import { Button, ButtonGroup, CloseButton, Dialog, NativeSelect } from "@chakra-ui/react";
import { useRef, useState, type ChangeEvent, type MouseEvent } from "react";
import { useGeneralSettings } from "../hooks/useGeneralSettings";
import { supportedTypes } from "../models/fileTypes";

interface AddNewDialogProps {
  isOpen: boolean;
  onCancel: () => void;
  onCreate: (language: string) => void;
}

export function AddNewDialog({ isOpen, onCancel, onCreate }: AddNewDialogProps) {
  const [settings] = useGeneralSettings();
  const [language, setLanguage] = useState<string>(
    settings?.defaultLanguage === undefined || settings.defaultLanguage === "none" ? "text" : settings.defaultLanguage
  );

  const ref = useRef<HTMLSelectElement | null>(null);
  const handleCreate = (event: MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    onCreate(language);
    onCancel();
  };

  const handleChangeLanguage = (event: ChangeEvent<HTMLSelectElement>): void => {
    setLanguage(event.target.value);
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onCancel} scrollBehavior="inside" initialFocusEl={() => ref.current}>
      <Dialog.Trigger />
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.CloseTrigger asChild>
            <CloseButton size="sm" />
          </Dialog.CloseTrigger>
          <Dialog.Header>
            <Dialog.Title>Choose a file type:</Dialog.Title>
          </Dialog.Header>
          <Dialog.Body>
            <NativeSelect.Root>
              <NativeSelect.Field ref={ref} name="language" onChange={handleChangeLanguage} value={language}>
                {supportedTypes.map((fileType) => (
                  <option key={fileType.language} value={fileType.language}>
                    {fileType.descr}
                  </option>
                ))}
              </NativeSelect.Field>
              <NativeSelect.Indicator />
            </NativeSelect.Root>
          </Dialog.Body>
          <Dialog.Footer>
            <ButtonGroup>
              <Dialog.ActionTrigger asChild>
                <Button variant="subtle">Cancel</Button>
              </Dialog.ActionTrigger>
              <Button type="submit" onClick={handleCreate}>
                Create
              </Button>
            </ButtonGroup>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
}
