import { Button, Clipboard, Code, Dialog, HStack, VStack } from "@chakra-ui/react";
import { Base64 } from "js-base64";
import { type JSX } from "react";
import { type Block } from "../models/block";
// import { CopyToClipboardButton } from "./CopyToClipboardButton";
import { useNamespace } from "../hooks/useNamespace";

interface ExportModalProps {
  isOpen: boolean;
  block: Block;
  onClose: () => void;
}

export function ExportModal({ isOpen, block, onClose }: ExportModalProps): JSX.Element {
  const namespace = useNamespace();
  const href = window.location.href.replace(namespace ?? "", "");
  const url = `${href.replace(/\/+$/, "")}/import/${block.id}/${block.language}/${Base64.encode(block.text)}`;
  // const { hasCopied, onCopy } = useClipboard(url);

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose} size="xl" scrollBehavior="inside">
      <Dialog.Trigger />
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.CloseTrigger />
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
                <Clipboard.Root value={url}>
                  <Clipboard.Trigger />
                </Clipboard.Root>
                {/* <CopyToClipboardButton hasCopied={hasCopied} onCopy={onCopy} showTooltip /> */}
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
