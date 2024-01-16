import { HStack, IconButton, Select, Tooltip, useBoolean, useDisclosure } from "@chakra-ui/react";
import { type ChangeEvent, type JSX } from "react";
import { FiAlignLeft, FiChevronsLeft, FiLock, FiLogOut, FiTrash2, FiUnlock } from "react-icons/fi";
import useGeneralSettings from "../hooks/useGeneralSettings";
import { supportedTypes } from "../models/fileTypes";
import { DeleteModal } from "./DeleteModal";
import CopyToClipboardButton from "./CopyToClipboardButton";

interface ToolbarProps {
  isActive: boolean;
  language?: string;
  onChangeLanguage: (language: string) => void;
  onDelete: (archive: boolean) => void;
  onCopy: () => void;
  onExport: () => void;
  onFormat: () => void;
  onToggleLock: () => void;
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
  onToggleLock,
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
    <HStack mr="2px" mt="1px" spacing={1} onMouseLeave={hideToolbar}>
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
      <CopyToClipboardButton hasCopied={hasCopied} onCopy={onCopy} size="xs" variant="ghost" showTooltip />
      <Tooltip label={locked ? "Unlock" : "Make read-only"}>
        <IconButton
          size="xs"
          variant="ghost"
          aria-label="Unlock"
          icon={locked ? <FiUnlock /> : <FiLock />}
          textColor={locked ? "green.400" : "blue.400"}
          onClick={onToggleLock}
        />
      </Tooltip>
      <Tooltip label="Format">
        <IconButton
          isDisabled={!canFormat || locked}
          size="xs"
          variant="ghost"
          aria-label="Format"
          icon={<FiAlignLeft />}
          textColor="blue.400"
          onClick={onFormat}
        />
      </Tooltip>
      <Tooltip label="Delete">
        <IconButton
          isDisabled={locked}
          size="xs"
          variant="ghost"
          aria-label="Delete"
          icon={<FiTrash2 />}
          textColor="red.400"
          onClick={onOpenDeleteModal}
        />
      </Tooltip>

      {isDeleteModalOpen && (
        <DeleteModal
          isOpen={isDeleteModalOpen}
          onDelete={handleDelete(false)}
          onArchive={handleDelete(true)}
          onCancel={onCloseDeleteModal}
        />
      )}
    </HStack>
  );
}
