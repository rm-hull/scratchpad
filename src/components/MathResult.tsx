import { Box, Clipboard, IconButton, useClipboard } from "@chakra-ui/react";
import { useState, type JSX } from "react";
import { CopyToClipboardButton } from "./CopyToClipboardButton";

interface MathResultProps {
  result: string;
  xOffset: number;
  isError: boolean;
  lineNumbers: boolean;
}

export function MathResult({ result, xOffset, isError, lineNumbers }: MathResultProps): JSX.Element | null {
  const [isActive, setIsActive] = useState(false);
  const { copied, copy } = useClipboard({ value: result });
  const left = (lineNumbers ? 80 : 45) + xOffset * 7.8;

  return (
    <Box
      as="span"
      display="inline-flex"
      alignItems="stretch"
      className="mathResult"
      left={left}
      color={isError ? "red.400" : undefined}
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
    >
      # {result}
      {isActive && !isError && (
        <CopyToClipboardButton hasCopied={copied} onCopy={copy} size="2xs" variant="plain" ml={1} />
      )}
    </Box>
  );
}
