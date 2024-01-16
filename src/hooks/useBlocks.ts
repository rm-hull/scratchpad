import { newBlock, type Block } from "../models/block";
import useLocalStorage from "./useLocalStorage";

function newBlocks(): Record<string, Block> {
  const block = newBlock();
  return { [block.id]: block };
}

export function useBlocks(): [Record<string, Block>, (value: Record<string, Block> | undefined) => void] {
  return useLocalStorage<Record<string, Block>>("scratchpad.blocks", newBlocks());
}
