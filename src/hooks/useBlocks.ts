import { newBlock, type Block } from "../models/block";
import useLocalStorage from "./useLocalStorage";
import { useNamespace } from "./useNamespace";

function newBlocks(): Record<string, Block> {
  const block = newBlock();
  return { [block.id]: block };
}

export function useBlocks(): [Record<string, Block>, (value: Record<string, Block> | undefined) => void] {
  const namespace = useNamespace();
  const key = namespace === undefined ? "scratchpad.blocks" : `scratchpad.blocks.${namespace}`;
  return useLocalStorage<Record<string, Block>>(key, newBlocks());
}
