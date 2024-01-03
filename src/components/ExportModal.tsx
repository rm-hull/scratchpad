import {
  Button,
  Code,
  HStack,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tooltip,
  useClipboard,
} from "@chakra-ui/react";
import { type JSX } from "react";
import { FiCheck, FiClipboard } from "react-icons/fi";
import { type Block } from "../models/block";

interface ExportModalProps {
  isOpen: boolean;
  block: Block;
  onClose: () => void;
}

export function ExportModal({ isOpen, block, onClose }: ExportModalProps): JSX.Element {
  const url = `${window.location.href.replace(/\/$/, "")}/import/${block.id}/${block.language}/${btoa(block.text)}`;
  const { hasCopied, onCopy } = useClipboard(url);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="3xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Export block</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          Share this link:
          <HStack alignItems="flex-start">
            <Code wordBreak="break-word" borderRadius={5} p={2}>
              {url}
            </Code>
            <Tooltip label="Copy to clipboard">
              <IconButton
                icon={hasCopied ? <FiCheck color="green" /> : <FiClipboard />}
                aria-label="Copy to clipboard"
                textColor="blue.400"
                onClick={onCopy}
              />
            </Tooltip>
          </HStack>
        </ModalBody>
        <ModalFooter>
          <Button type="submit" onClick={onClose}>
            Ok
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
