import { type RefObject, useRef } from "react";

export default function useFocus<T extends HTMLElement>(): [RefObject<T>, () => void] {
  const htmlElRef = useRef<T>(null);
  const setFocus = (): void => {
    if (htmlElRef.current !== null) {
      htmlElRef.current.focus();
    }
  };

  return [htmlElRef, setFocus];
}
