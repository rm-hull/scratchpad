import { HStack, IconButton, Select, Tooltip, useDisclosure } from "@chakra-ui/react";
import { type ChangeEvent, type JSX } from "react";
import { FiTrash2, FiPlus, FiCheck, FiClipboard } from "react-icons/fi";
import { supportedTypes } from "../models/fileTypes";
import { DeleteModal } from "./DeleteModal";

interface ToolbarProps {
  language?: string;
  onChangeLanguage: (language: string) => void;
  onAddNew: () => void;
  onDelete: () => void;
  onCopy: () => void;
  hasCopied: boolean;
}

export default function Toolbar({
  language,
  onChangeLanguage,
  onAddNew,
  onDelete,
  onCopy,
  hasCopied,
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
      <Select size="xs" onChange={handleChangeLanguage} value={language}>
        {supportedTypes.map((fileType) => (
          <option key={fileType.language} value={fileType.language}>
            {fileType.descr}
          </option>
        ))}
      </Select>
      <Tooltip label="New Block">
        <IconButton
          size="xs"
          variant="ghost"
          icon={<FiPlus />}
          aria-label="Add new block"
          textColor="green.400"
          onClick={onAddNew}
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
      <Tooltip label="Delete">
        <IconButton
          size="xs"
          variant="ghost"
          icon={<FiTrash2 />}
          aria-label="Delete"
          textColor="red.400"
          onClick={onOpenDeleteModal}
        />
      </Tooltip>

      <DeleteModal isOpen={isDeleteModalOpen} onDelete={handleDelete} onCancel={onCloseDeleteModal} />
    </HStack>
  );
}
