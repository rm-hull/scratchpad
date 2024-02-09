import { Box, HStack } from "@chakra-ui/react";
import { type JSX } from "react";
import { type Block } from "../models/block";
import { useCursorPosition } from "../hooks/useCursorPosition";

interface FooterProps {
  block?: Block;
}

function isoDate(dt?: number): string | undefined {
  if (dt === undefined) {
    return undefined;
  }

  return new Date(dt).toISOString();
}

function wc(text: string): { chars: number; words: number; lines: number } {
  return {
    chars: text.length,
    words: text.split(/\s+/).filter((word) => word !== "").length,
    lines: text.split("\n").length,
  };
}

export function Footer({ block }: FooterProps): JSX.Element {
  // const { cursorPosition } = useCursorPosition();
  const { chars, words, lines } = wc(block?.text ?? "");
  return (
    <HStack
      justifyContent="space-between"
      position="fixed"
      bottom={0}
      pl={2}
      backgroundColor="green.400"
      color="white"
      width="100%"
    >
      <Box>Created: {isoDate(block?.createdAt)}</Box>
      <Box>Updated: {isoDate(block?.updatedAt)}</Box>
      <Box>
        wc: {chars} / {words} / {lines}
      </Box>
      {/* <Box>
        pos: {cursorPosition?.col} / {cursorPosition?.row}
      </Box> */}
    </HStack>
  );
}
