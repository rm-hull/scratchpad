import { atom, useAtom } from "jotai";
import { useEffect } from "react";

const localStorage = atom<Record<string, unknown> | undefined>(undefined);

type UseLocalStorageReturnType<T> = [T, (value: T | undefined) => void];

const useLocalStorage = <T>(key: string, initialValue: T): UseLocalStorageReturnType<T> => {
  const readValue = (): T | undefined => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const item = window.localStorage.getItem(key);
    return item === null || item === undefined ? initialValue : (JSON.parse(item) as T);
  };

  const [storedValue, setStoredValue] = useAtom(localStorage);

  const setValue = (value: T | undefined): void => {
    try {
      if (value === undefined) {
        window.localStorage.removeItem(key);
      } else {
        window.localStorage.setItem(key, JSON.stringify(value));
      }

      setStoredValue((prev) => ({ ...prev, [key]: value }));
      window.dispatchEvent(new Event("local-storage"));
    } catch (error) {
      console.error(`Error setting localStorage key “${key}”:`, error);
    }
  };

  useEffect(() => {
    setStoredValue((prev) => ({ ...prev, [key]: readValue() }));

    const handleStorageChange = (): void => {
      setStoredValue((prev) => ({ ...prev, [key]: readValue() }));
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("local-storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("local-storage", handleStorageChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [storedValue?.[key] as T, setValue];
};

export default useLocalStorage;
