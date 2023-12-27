import { Box, IconButton, useBoolean, useClipboard } from "@chakra-ui/react";
import { type JSX } from "react";
import { FiCheck, FiClipboard } from "react-icons/fi";

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
      className="mathResult"
      left={left}
      color={isError ? "red.400" : undefined}
      onMouseEnter={on}
      onMouseLeave={off}
    >
      # {result}
      {isActive && !isError && (
        <IconButton
          size="4"
          ml={1}
          variant="none"
          icon={hasCopied ? <FiCheck color="green" /> : <FiClipboard />}
          aria-label="Copy to clipboard"
          textColor="blue.400"
          onClick={onCopy}
        />
      )}
    </Box>
  );
}
