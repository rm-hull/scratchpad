import { type RefObject, useRef, useCallback } from "react";

export function useFocus<T extends HTMLElement>(): [RefObject<T>, () => void] {
  const htmlElRef = useRef<T>(null);
  const setFocus = useCallback(() => {
    if (htmlElRef.current !== null) {
      htmlElRef.current.focus();
    }
  }, [htmlElRef]);

  return [htmlElRef as RefObject<T>, setFocus];
}
