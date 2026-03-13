import {
  Alert,
  Box,
  Button,
  ButtonGroup,
  CloseButton,
  Code,
  Dialog,
  Field,
  HStack,
  IconButton,
  NativeSelect,
  VStack,
  useClipboard,
} from "@chakra-ui/react";
import { hexy } from "hexy";
import { Base64 } from "js-base64";
import { highlight } from "prismjs";
import { useEffect, useMemo, useState, type ChangeEvent } from "react";
import { FiAlignLeft, FiCpu, FiFileText } from "react-icons/fi";
import { useGeneralSettings } from "../hooks/useGeneralSettings";
import { fromLanguage, supportedTypes } from "../models/fileTypes";
import { CopyToClipboardButton } from "./CopyToClipboardButton";
import { Tooltip } from "./ui/tooltip";

function base64Decode(text: string): string | undefined {
  const stripped = text.replace(/[\n\t\r ]/g, "");
  if (Base64.isValid(stripped)) {
    try {
      return Base64.decode(stripped);
    } catch {
      return undefined;
    }
  }

  return undefined;
}

interface DecodeSelectionDialogProps {
  isOpen: boolean;
  selectedText?: string;
  onClose: () => void;
  onBlockAdd: (language: string, text: string) => void;
}

export function DecodeSelectionDialog({ isOpen, selectedText = "", onClose, onBlockAdd }: DecodeSelectionDialogProps) {
  const [hexView, setHexView] = useState(false);
  const [error, setError] = useState<Error>();
  const [language, setLanguage] = useState<string>("text");
  const decoded = useMemo(() => base64Decode(selectedText) ?? "", [selectedText]);
  const fileType = useMemo(() => fromLanguage(language), [language]);
  const { copy, copied, value, setValue } = useClipboard({ defaultValue: decoded });
  const [settings] = useGeneralSettings();

  useEffect(() => {
    setValue(hexView ? hexy(decoded) : decoded);
  }, [decoded, selectedText, setValue, hexView]);

  const handleChangeLanguage = (event: ChangeEvent<HTMLSelectElement>): void => {
    setLanguage(event.target.value);
    setError(undefined);
  };

  const handleAddNew = (): void => {
    onBlockAdd(language, value);
    onClose();
  };

  const handleFormat = async (): Promise<void> => {
    const { format } = await import("../models/format");
    const text = await format(
      decoded ?? "",
      fileType.language,
      settings?.formatting?.printWidth,
      settings?.formatting?.tabWidth
    );
    setValue(text);
  };

  if (decoded === undefined) {
    return (
      <Dialog.Root open={isOpen} onOpenChange={onClose}>
        <Dialog.Trigger />
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
            <Dialog.Header>
              <Dialog.Title>Decode selection</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Alert.Root status="warning">
                <Alert.Indicator />
                <Alert.Content>
                  <Alert.Description>Unable to decode selected text as Base64.</Alert.Description>
                </Alert.Content>
              </Alert.Root>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="subtle">Close</Button>
              </Dialog.ActionTrigger>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Root>
    );
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose} size="lg" scrollBehavior="inside">
      <Dialog.Trigger />
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.CloseTrigger asChild>
            <CloseButton size="sm" />
          </Dialog.CloseTrigger>
          <Dialog.Header>
            <Dialog.Title>Decode selection</Dialog.Title>
          </Dialog.Header>
          <Dialog.Body>
            The selected text was Base64-decoded into the following:
            <HStack alignItems="flex-start">
              <Field.Root invalid={error !== undefined}>
                <Box as="pre" display="flex">
                  {hexView ? (
                    <Code borderRadius={5} p={2} alignItems="flex-start" minHeight={200} width={576}>
                      {value}
                    </Code>
                  ) : (
                    <Code
                      borderRadius={5}
                      p={2}
                      alignItems="flex-start"
                      minHeight={200}
                      width={576}
                      wordBreak="break-all"
                      textWrap="wrap"
                      dangerouslySetInnerHTML={{ __html: highlight(value, fileType.grammar, language) }}
                    />
                  )}
                </Box>
                <Field.ErrorText>
                  <Field.ErrorIcon />
                  {error?.message}
                </Field.ErrorText>
              </Field.Root>
              <VStack mt={0} position="sticky" top={0}>
                <CopyToClipboardButton hasCopied={copied} onCopy={copy} showTooltip />
                <Tooltip content="Format">
                  <IconButton
                    disabled={!fileType.canFormat}
                    aria-label="Format"
                    onClick={() => handleFormat().catch(setError)}
                  >
                    <FiAlignLeft color="blue.400" />
                  </IconButton>
                </Tooltip>
                <Tooltip content={hexView ? "Switch to text view" : "Switch to hex view"}>
                  <IconButton aria-label="View" onClick={() => setHexView((prev) => !prev)} color="blue.400">
                    {hexView ? <FiFileText /> : <FiCpu />}
                  </IconButton>
                </Tooltip>
              </VStack>
            </HStack>
          </Dialog.Body>
          <Dialog.Footer>
            <ButtonGroup>
              <NativeSelect.Root maxWidth={150}>
                <NativeSelect.Field name="language" onChange={handleChangeLanguage} value={language}>
                  {supportedTypes.map((fileType) => (
                    <option key={fileType.language} value={fileType.language}>
                      {fileType.descr}
                    </option>
                  ))}
                </NativeSelect.Field>
                <NativeSelect.Indicator />
              </NativeSelect.Root>
              <Button onClick={handleAddNew}>Create block</Button>
              <Dialog.ActionTrigger asChild>
                <Button variant="subtle">Close</Button>
              </Dialog.ActionTrigger>
            </ButtonGroup>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
}
