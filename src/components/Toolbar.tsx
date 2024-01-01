import { HStack, IconButton, Select, Tooltip, useDisclosure } from "@chakra-ui/react";
import { type ChangeEvent, type JSX } from "react";
import { FiCheck, FiClipboard, FiLock, FiLogOut, FiTrash2, FiAlignLeft } from "react-icons/fi";
import { supportedTypes } from "../models/fileTypes";
import { DeleteModal } from "./DeleteModal";

interface ToolbarProps {
  language?: string;
  onChangeLanguage: (language: string) => void;
  onDelete: () => void;
  onCopy: () => void;
  onExport: () => void;
  onFormat: () => void;
  hasCopied: boolean;
  locked?: boolean;
  canFormat: boolean;
}

export default function Toolbar({
  language,
  onChangeLanguage,
  onDelete,
  onExport,
  onCopy,
  onFormat,
  hasCopied,
  locked = false,
  canFormat,
}: ToolbarProps): JSX.Element {
  const { isOpen: isDeleteModalOpen, onOpen: onOpenDeleteModal, onClose: onCloseDeleteModal } = useDisclosure();

  const handleChangeLanguage = (event: ChangeEvent<HTMLSelectElement>): void => {
    onChangeLanguage(event.target.value);
  };

  const handleDelete = (): void => {
    onCloseDeleteModal();
    onDelete();
  };

  return (
    <HStack m={1} spacing={1}>
      <Select name="language" isDisabled={locked ?? false} size="xs" onChange={handleChangeLanguage} value={language}>
        {supportedTypes.map((fileType) => (
          <option key={fileType.language} value={fileType.language}>
            {fileType.descr}
          </option>
        ))}
      </Select>
      <Tooltip label="Export">
        <IconButton
          size="xs"
          variant="ghost"
          icon={<FiLogOut />}
          aria-label="Export"
          textColor="purple.400"
          onClick={onExport}
        />
      </Tooltip>
      <Tooltip label="Copy to clipboard">
        <IconButton
          size="xs"
          variant="ghost"
          icon={hasCopied ? <FiCheck color="green" /> : <FiClipboard />}
          aria-label="Copy to clipboard"
          textColor="blue.400"
          onClick={onCopy}
        />
      </Tooltip>
      <Tooltip label="Format">
        <IconButton
          isDisabled={!canFormat || locked}
          size="xs"
          variant="ghost"
          icon={<FiAlignLeft />}
          aria-label="Format"
          textColor="blue.400"
          onClick={onFormat}
        />
      </Tooltip>
      <Tooltip label={locked ? "Locked" : "Delete"}>
        <IconButton
          isDisabled={locked}
          size="xs"
          variant="ghost"
          icon={locked ? <FiLock /> : <FiTrash2 />}
          aria-label="Delete"
          textColor="red.400"
          onClick={onOpenDeleteModal}
        />
      </Tooltip>

      <DeleteModal isOpen={isDeleteModalOpen} onDelete={handleDelete} onCancel={onCloseDeleteModal} />
    </HStack>
  );
}
