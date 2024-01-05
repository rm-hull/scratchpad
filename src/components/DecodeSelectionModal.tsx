import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Button,
  ButtonGroup,
  Code,
  FormControl,
  FormErrorIcon,
  FormErrorMessage,
  HStack,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Tooltip,
  VStack,
  useBoolean,
  useClipboard,
} from "@chakra-ui/react";
import { hexy } from "hexy";
import { Base64 } from "js-base64";
import { highlight } from "prismjs";
import { useEffect, useMemo, useState, type ChangeEvent, type JSX } from "react";
import { FiAlignLeft, FiCheck, FiClipboard, FiCpu, FiFileText } from "react-icons/fi";
import useGeneralSettings from "../hooks/useGeneralSettings";
import { fromLanguage, supportedTypes } from "../models/fileTypes";

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

interface DecodeSelectionModalProps {
  isOpen: boolean;
  selectedText?: string;
  onClose: () => void;
  onBlockAdd: (language: string, text: string) => void;
}

export default function DecodeSelectionModal({
  isOpen,
  selectedText = "",
  onClose,
  onBlockAdd,
}: DecodeSelectionModalProps): JSX.Element {
  const [hexView, { toggle: toggleHexView }] = useBoolean(false);
  const [error, setError] = useState<Error>();
  const [language, setLanguage] = useState<string>("text");
  const decoded = useMemo(() => base64Decode(selectedText) ?? "", [selectedText]);
  const fileType = useMemo(() => fromLanguage(language), [language]);
  const { onCopy, hasCopied, value, setValue } = useClipboard(decoded ?? "");
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
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Decode selection</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <Alert status="warning">
              <AlertIcon />
              <AlertDescription>Unable to decode selected text as Base64.</AlertDescription>
            </Alert>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="3xl" scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Decode selection</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          The selected text was Base64-decoded into the following:
          <HStack alignItems="flex-start">
            <FormControl isInvalid>
              <Code borderRadius={5} p={2} flex={1} minHeight={200} width={672}>
                {hexView ? (
                  <Box as="pre">{value}</Box>
                ) : (
                  <Box
                    as="pre"
                    wordBreak="break-all"
                    sx={{ textWrap: "wrap" }}
                    dangerouslySetInnerHTML={{ __html: highlight(value, fileType.grammar, language) }}
                  />
                )}
              </Code>
              {error !== undefined && (
                <FormErrorMessage>
                  <FormErrorIcon />
                  {error.message}
                </FormErrorMessage>
              )}
            </FormControl>
            <VStack mt={0} position="sticky" top={0}>
              <Tooltip label="Copy to clipboard">
                <IconButton
                  icon={hasCopied ? <FiCheck color="green" /> : <FiClipboard />}
                  aria-label="Copy to clipboard"
                  textColor="blue.400"
                  onClick={onCopy}
                />
              </Tooltip>
              <Tooltip label="Format">
                <IconButton
                  isDisabled={!fileType.canFormat}
                  icon={<FiAlignLeft />}
                  aria-label="Format"
                  textColor="blue.400"
                  onClick={() => {
                    handleFormat().catch(setError);
                  }}
                />
              </Tooltip>
              <Tooltip label={hexView ? "Switch to text view" : "Switch to hex view"}>
                <IconButton
                  icon={hexView ? <FiFileText /> : <FiCpu />}
                  aria-label="View"
                  textColor="blue.400"
                  onClick={toggleHexView}
                />
              </Tooltip>
            </VStack>
          </HStack>
        </ModalBody>

        <ModalFooter>
          <ButtonGroup>
            <Select name="language" onChange={handleChangeLanguage} value={language} maxWidth={150}>
              {supportedTypes.map((fileType) => (
                <option key={fileType.language} value={fileType.language}>
                  {fileType.descr}
                </option>
              ))}
            </Select>
            <Button onClick={handleAddNew}>Create block</Button>
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
