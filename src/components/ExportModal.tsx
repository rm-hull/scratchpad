import { Button, CloseButton, Code, Dialog, HStack, useClipboard, VStack } from "@chakra-ui/react";
import { Base64 } from "js-base64";
import { type Block } from "../models/block";
import { useNamespace } from "../hooks/useNamespace";
import { CopyToClipboardButton } from "./CopyToClipboardButton";

interface ExportModalProps {
  isOpen: boolean;
  block: Block;
  onClose: () => void;
}

export function ExportModal({ isOpen, block, onClose }: ExportModalProps) {
  const namespace = useNamespace();
  const href = window.location.href.replace(namespace ?? "", "");
  const url = `${href.replace(/\/+$/, "")}/import/${block.id}/${block.language}/${Base64.encode(block.text)}`;
  const { copied, copy } = useClipboard({ defaultValue: url });

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose} size="xl" scrollBehavior="inside">
      <Dialog.Trigger />
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.CloseTrigger asChild>
            <CloseButton size="sm" />
          </Dialog.CloseTrigger>
          <Dialog.Header>
            <Dialog.Title>Export block</Dialog.Title>
          </Dialog.Header>
          <Dialog.Body>
            Share this link:
            <HStack alignItems="flex-start">
              <Code wordBreak="break-all" borderRadius={5} p={2} flex={1}>
                {url}
              </Code>
              <VStack position="sticky" top={0}>
                <CopyToClipboardButton hasCopied={copied} onCopy={copy} showTooltip />
              </VStack>
            </HStack>
          </Dialog.Body>
          <Dialog.Footer>
            <Button type="submit" onClick={onClose}>
              Close
            </Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
}
