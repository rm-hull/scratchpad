import { HStack, IconButton, NativeSelect, useDisclosure } from "@chakra-ui/react";
import { useState, type ChangeEvent, type JSX } from "react";
import { FiAlignLeft, FiChevronsLeft, FiLock, FiLogOut, FiTrash2, FiUnlock } from "react-icons/fi";
import { useGeneralSettings } from "../hooks/useGeneralSettings";
import { supportedTypes } from "../models/fileTypes";
import { CopyToClipboardButton } from "./CopyToClipboardButton";
import { DeleteDialog } from "./DeleteDialog";
import { Tooltip } from "@/components/ui/tooltip";

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

export function Toolbar({
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
  const [toolbarVisible, setToolbarVisible] = useState(false);
  const { open: isDeleteModalOpen, onOpen: onOpenDeleteModal, onClose: onCloseDeleteModal } = useDisclosure();
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

  if (settings.minimiseEditorToolbar && !toolbarVisible) {
    return (
      <HStack m={1} gap={1} onMouseEnter={() => setToolbarVisible(true)}>
        <FiChevronsLeft />
      </HStack>
    );
  }

  return (
    <HStack mr="2px" mt="1px" gap={1} onMouseLeave={() => setToolbarVisible(false)}>
      <NativeSelect.Root disabled={locked ?? false} size="xs">
        <NativeSelect.Field name="language" value={language} onChange={handleChangeLanguage}>
          {supportedTypes.map((fileType) => (
            <option key={fileType.language} value={fileType.language}>
              {fileType.descr}
            </option>
          ))}
        </NativeSelect.Field>
        <NativeSelect.Indicator />
      </NativeSelect.Root>
      <Tooltip content="Export">
        <IconButton size="2xs" variant="ghost" aria-label="Export" onClick={onExport} color="purple.400">
          <FiLogOut />
        </IconButton>
      </Tooltip>
      <CopyToClipboardButton hasCopied={hasCopied} onCopy={onCopy} size="2xs" variant="ghost" showTooltip />
      <Tooltip content={locked ? "Unlock" : "Make read-only"}>
        <IconButton
          size="2xs"
          variant="ghost"
          aria-label="Unlock"
          onClick={onToggleLock}
          color={locked ? "green.400" : "blue.400"}
        >
          {locked ? <FiUnlock /> : <FiLock />}
        </IconButton>
      </Tooltip>
      <Tooltip content="Format">
        <IconButton
          disabled={!canFormat || locked}
          size="2xs"
          variant="ghost"
          aria-label="Format"
          onClick={onFormat}
          color="blue.400"
        >
          <FiAlignLeft />
        </IconButton>
      </Tooltip>
      <Tooltip content="Delete">
        <IconButton
          disabled={locked}
          size="2xs"
          variant="ghost"
          aria-label="Delete"
          onClick={onOpenDeleteModal}
          color="red.400"
        >
          <FiTrash2 />
        </IconButton>
      </Tooltip>

      {isDeleteModalOpen && (
        <DeleteDialog
          isOpen={isDeleteModalOpen}
          onDelete={handleDelete(false)}
          onArchive={handleDelete(true)}
          onCancel={onCloseDeleteModal}
        />
      )}
    </HStack>
  );
}
