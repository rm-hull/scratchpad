import { type sortBy } from "../models/block";
import useLocalStorage from "./useLocalStorage";

export interface GeneralSettings {
  showZebraStripes?: boolean;
  showLineNumbers?: boolean;
  sortOrder?: keyof typeof sortBy;
}

export default function useGeneralSettings(): [
  GeneralSettings | undefined,
  (value: GeneralSettings | undefined) => void,
] {
  return useLocalStorage<GeneralSettings>("scratchpad.general-settings");
}
