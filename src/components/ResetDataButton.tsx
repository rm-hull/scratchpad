import { Button, useDisclosure } from "@chakra-ui/react";
import { ResetDataModal } from "./ResetDataModal";
import { Tooltip } from "@/components/ui/tooltip";

interface ResetDataButtonProps {
  onResetRequested: () => void;
}

export function ResetDataButton({ onResetRequested }: ResetDataButtonProps) {
  const { open, onOpen, onClose } = useDisclosure();

  const handleConfirmReset = (): void => {
    onResetRequested();
    setTimeout(onClose, 0);
  };

  return (
    <>
      {open && <ResetDataModal isOpen={open} onResetData={handleConfirmReset} onCancel={onClose} />}
      <Tooltip content="Reset back to initial factory settings">
        <Button colorScheme="red" onClick={onOpen}>
          Reset Data
        </Button>
      </Tooltip>
    </>
  );
}
