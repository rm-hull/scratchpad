import { HStack, IconButton, Select, Tooltip, useBoolean, useDisclosure } from "@chakra-ui/react";
import { type ChangeEvent, type JSX } from "react";
import { FiCheck, FiClipboard, FiLock, FiLogOut, FiTrash2, FiAlignLeft, FiChevronsLeft } from "react-icons/fi";
import { supportedTypes } from "../models/fileTypes";
import { DeleteModal } from "./DeleteModal";
import useGeneralSettings from "../hooks/useGeneralSettings";

interface ToolbarProps {
  isActive: boolean;
  language?: string;
  onChangeLanguage: (language: string) => void;
  onDelete: (archive: boolean) => void;
  onCopy: () => void;
  onExport: () => void;
  onFormat: () => void;
  hasCopied: boolean;
  locked?: boolean;
  canFormat: boolean;
}

export default function Toolbar({
  isActive,
  language,
  onChangeLanguage,
  onDelete,
  onExport,
  onCopy,
  onFormat,
  hasCopied,
  locked = false,
  canFormat,
}: ToolbarProps): JSX.Element | null {
  const [visible, { on: showToolbar, off: hideToolbar }] = useBoolean(false);
  const { isOpen: isDeleteModalOpen, onOpen: onOpenDeleteModal, onClose: onCloseDeleteModal } = useDisclosure();
  const [settings] = useGeneralSettings();

  if (!isActive) {
    return null;
  }

  const handleChangeLanguage = (event: ChangeEvent<HTMLSelectElement>): void => {
    onChangeLanguage(event.target.value);
  };

  const handleDelete = (archive: boolean) => (): void => {
    onCloseDeleteModal();
    onDelete(archive);
  };

  if (settings.minimiseEditorToolbar && !visible) {
    return (
      <HStack m={1} spacing={1} onMouseEnter={showToolbar}>
        <FiChevronsLeft />
      </HStack>
    );
  }

  return (
    <HStack m={1} spacing={1} onMouseLeave={hideToolbar}>
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

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onDelete={handleDelete(false)}
        onArchive={handleDelete(true)}
        onCancel={onCloseDeleteModal}
      />
    </HStack>
  );
}
