import { type sortBy } from "../models/block";
import useLocalStorage from "./useLocalStorage";
import { useNamespace } from "./useNamespace";

type BooleanKeys<T> = Exclude<
  {
    [K in keyof T]: T[K] extends boolean ? K : never;
  }[keyof T],
  undefined
>;

export interface GeneralSettings {
  showZebraStripes: boolean;
  showLineNumbers: boolean;
  permanentlyShowSearchBar: boolean;
  showToolbarForEveryBlock: boolean;
  minimiseEditorToolbar: boolean;
  sortOrder: keyof typeof sortBy;
  formatting?: {
    printWidth?: number;
    tabWidth?: number;
  };
  defaultLanguage?: string;
}

export type BooleanSettingsKeys = BooleanKeys<GeneralSettings>;

const defaultSettings: GeneralSettings = {
  showLineNumbers: true,
  showZebraStripes: true,
  permanentlyShowSearchBar: false,
  showToolbarForEveryBlock: false,
  minimiseEditorToolbar: false,
  sortOrder: "none",
  defaultLanguage: "none",
};

export function useGeneralSettings(): [GeneralSettings, (value: GeneralSettings | undefined) => void] {
  const namespace = useNamespace();
  const key = namespace === undefined ? "scratchpad.general-settings" : `scratchpad.general-settings.${namespace}`;
  return useLocalStorage<GeneralSettings>(key, defaultSettings);
}
