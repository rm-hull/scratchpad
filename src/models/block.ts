import * as R from "ramda";

export interface Block {
  id: string;
  createdAt: number;
  updatedAt?: number;
  text: string;
  language: string;
  locked?: boolean;
  archived?: boolean;
}

export function newBlock(language = "text"): Block {
  return {
    id: crypto.randomUUID(),
    createdAt: Date.now(),
    text: "",
    language,
    locked: false,
    archived: false,
  };
}

export const sortBy = {
  none: R.identity<Block[]>,
  language: R.sortBy<Block>((block) => block.language.toLowerCase()),
  lastUpdated: R.sort<Block>(R.descend((block) => block.updatedAt ?? 0)),
  created: R.sort<Block>(R.descend((block) => block.createdAt ?? 0)),
};

export function focus(block: Block): void {
  setTimeout(() => {
    const element = document.getElementById(block.id);
    element?.focus();
  }, 200);
}

export function listNamespaces(): string[] {
  return Object.keys(window.localStorage)
    .filter((name) => name.startsWith("scratchpad.blocks."))
    .map((name) => name.substring(18))
    .sort();
}
