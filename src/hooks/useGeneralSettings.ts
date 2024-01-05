import { type sortBy } from "../models/block";
import useLocalStorage from "./useLocalStorage";

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
}

export type BooleanSettingsKeys = BooleanKeys<GeneralSettings>;

export default function useGeneralSettings(): [GeneralSettings, (value: GeneralSettings | undefined) => void] {
  return useLocalStorage<GeneralSettings>("scratchpad.general-settings", {
    showLineNumbers: true,
    showZebraStripes: true,
    permanentlyShowSearchBar: false,
    showToolbarForEveryBlock: false,
    minimiseEditorToolbar: false,
    sortOrder: "none",
  });
}
