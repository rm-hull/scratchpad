import { Box, useBoolean, useClipboard } from "@chakra-ui/react";
import { type JSX } from "react";
import CopyToClipboardButton from "./CopyToClipboardButton";

interface MathResultProps {
  result: string;
  xOffset: number;
  isError: boolean;
  lineNumbers: boolean;
}

export default function MathResult({ result, xOffset, isError, lineNumbers }: MathResultProps): JSX.Element | null {
  const [isActive, { on, off }] = useBoolean();
  const { hasCopied, onCopy } = useClipboard(result);
  const left = (lineNumbers ? 80 : 45) + xOffset * 7.2;

  return (
    <Box
      as="span"
      display="inline-flex"
      alignItems="stretch"
      className="mathResult"
      left={left}
      color={isError ? "red.400" : undefined}
      onMouseEnter={on}
      onMouseLeave={off}
    >
      # {result}
      {isActive && !isError && (
        <CopyToClipboardButton hasCopied={hasCopied} onCopy={onCopy} size="4" variant="none" ml={1} />
      )}
    </Box>
  );
}
