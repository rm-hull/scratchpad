import { Box, Clipboard, IconButton } from "@chakra-ui/react";
import { useState, type JSX } from "react";

interface MathResultProps {
  result: string;
  xOffset: number;
  isError: boolean;
  lineNumbers: boolean;
}

export function MathResult({ result, xOffset, isError, lineNumbers }: MathResultProps): JSX.Element | null {
  const [isActive, setIsActive] = useState(false);
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
        <Clipboard.Root value={result}>
          <Clipboard.Trigger asChild>
            <IconButton variant="surface" size="xs">
              <Clipboard.Indicator />
            </IconButton>
          </Clipboard.Trigger>
        </Clipboard.Root>
      )}
    </Box>
  );
}
