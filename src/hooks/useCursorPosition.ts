import { atom, useAtom } from "jotai";

export interface CursorPosition {
  col: number;
  row: number;
}

const currentPosn = atom<CursorPosition>({ col: 0, row: 0 });

interface UseCursorPositionReturnType {
  cursorPosition: CursorPosition;
  setCursorPosition: (textarea: HTMLTextAreaElement | null, text: string) => void;
}

export function useCursorPosition(): UseCursorPositionReturnType {
  const [cursorPosition, setCursorPosition] = useAtom(currentPosn);

  return {
    cursorPosition,
    setCursorPosition: (textarea: HTMLTextAreaElement | null, text: string) => {
      console.log({ textarea });
      if (textarea === null) {
        return { row: 0, col: 0 };
      }

      const cursorPosition = textarea.selectionStart;
      setCursorPosition({
        col: cursorPosition - text.lastIndexOf("\n", cursorPosition - 1),
        row: text.substr(0, cursorPosition).split("\n").length,
      });
    },
  };
}
