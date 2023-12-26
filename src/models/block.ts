import * as R from "ramda";

export interface Block {
  id: string;
  createdAt: number;
  updatedAt?: number;
  text: string;
  language: string;
  locked?: boolean;
}

export function newBlock(language = "text"): Block {
  return {
    id: crypto.randomUUID(),
    createdAt: Date.now(),
    text: "",
    language,
    locked: false,
  };
}

export const sortBy = {
  none: R.identity<Block[]>,
  language: R.sortBy<Block>((block) => block.language.toLowerCase()),
  lastUpdated: R.sort<Block>(R.descend((block) => block.updatedAt ?? 0)),
  created: R.sort<Block>(R.descend((block) => block.createdAt ?? 0)),
};
