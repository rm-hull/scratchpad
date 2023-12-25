export interface Block {
  id: string;
  createdAt: number;
  updatedAt?: number;
  text: string;
  language: string;
}

export function newBlock(language = "text"): Block {
  return {
    id: crypto.randomUUID(),
    createdAt: Date.now(),
    text: "",
    language,
  };
}