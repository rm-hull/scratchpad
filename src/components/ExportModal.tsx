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
  VStack,
  useClipboard,
} from "@chakra-ui/react";
import { Base64 } from "js-base64";
import { type JSX } from "react";
import { FiCheck, FiClipboard } from "react-icons/fi";
import { type Block } from "../models/block";

interface ExportModalProps {
  isOpen: boolean;
  block: Block;
  onClose: () => void;
}

export function ExportModal({ isOpen, block, onClose }: ExportModalProps): JSX.Element {
  const url = `${window.location.href.replace(/\/$/, "")}/import/${block.id}/${block.language}/${Base64.encode(
    block.text
  )}`;
  const { hasCopied, onCopy } = useClipboard(url);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="3xl" scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Export block</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          Share this link:
          <HStack alignItems="flex-start">
            <Code wordBreak="break-all" borderRadius={5} p={2} flex={1}>
              {url}
            </Code>
            <VStack position="sticky" top={0}>
              <Tooltip label="Copy to clipboard">
                <IconButton
                  icon={hasCopied ? <FiCheck color="green" /> : <FiClipboard />}
                  aria-label="Copy to clipboard"
                  textColor="blue.400"
                  onClick={onCopy}
                />
              </Tooltip>
            </VStack>
          </HStack>
        </ModalBody>
        <ModalFooter>
          <Button type="submit" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
