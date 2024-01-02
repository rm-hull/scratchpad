import { type sortBy } from "../models/block";
import useLocalStorage from "./useLocalStorage";

export interface GeneralSettings {
  showZebraStripes: boolean;
  showLineNumbers: boolean;
  permanentlyShowSearchBar: boolean;
  sortOrder: keyof typeof sortBy;
  formatting?: {
    printWidth?: number;
    tabWidth?: number;
  };
}

export default function useGeneralSettings(): [GeneralSettings, (value: GeneralSettings | undefined) => void] {
  return useLocalStorage<GeneralSettings>("scratchpad.general-settings", {
    showLineNumbers: true,
    showZebraStripes: true,
    permanentlyShowSearchBar: false,
    sortOrder: "none",
  });
}
