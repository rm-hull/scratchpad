import {
  Button,
  CloseButton,
  Dialog,
  Field,
  // FormLabel,
  HStack,
  NativeSelect,
  NumberInput,
  NumberInputValueChangeDetails,
  RadioGroup,
  RadioGroupValueChangeDetails,
  Switch,
  VStack,
} from "@chakra-ui/react";
import { type ChangeEvent } from "react";
import { useGeneralSettings, type BooleanSettingsKeys } from "../hooks/useGeneralSettings";
import { useNamespace } from "../hooks/useNamespace";
import { type sortBy } from "../models/block";
import { supportedTypes } from "../models/fileTypes";
import { DangerZoneSettings } from "./DangerZoneSettings";
import { ColorModeButton } from "./ui/color-mode";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const [settings, updateSettings] = useGeneralSettings();
  const namespace = useNamespace();
  const handleUpdateSortOrder = (details: RadioGroupValueChangeDetails): void => {
    updateSettings({ ...settings, sortOrder: details.value as keyof typeof sortBy });
  };

  const handleToggle = (key: BooleanSettingsKeys) => () => {
    updateSettings({ ...settings, [key]: !settings[key] });
  };

  const handleFormattingPrintWidth = (details: NumberInputValueChangeDetails): void => {
    updateSettings({ ...settings, formatting: { ...settings.formatting, printWidth: details.valueAsNumber } });
  };

  const handleFormattingTabWidth = (details: NumberInputValueChangeDetails) => {
    updateSettings({ ...settings, formatting: { ...settings.formatting, tabWidth: details.valueAsNumber } });
  };

  const handleChangeLanguage = (event: ChangeEvent<HTMLSelectElement>): void => {
    updateSettings({ ...settings, defaultLanguage: event.target.value });
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose} size="xl" scrollBehavior="inside">
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.CloseTrigger asChild>
            <CloseButton size="sm" />
          </Dialog.CloseTrigger>
          <Dialog.Header>
            <Dialog.Title>Settings: {namespace ?? "default namespace"}</Dialog.Title>
          </Dialog.Header>
          <Dialog.Body>
            <VStack align="left">
              <Field.Root display="flex" alignItems="baseline">
                <Field.Label htmlFor="system-theme">Theme:</Field.Label>
                <ColorModeButton />
              </Field.Root>
              <Field.Root display="flex" alignItems="center">
                <Field.Label htmlFor="default-language" mb={0}>
                  Default language:
                </Field.Label>
                <NativeSelect.Root id="default-language" width={200} size="sm">
                  <NativeSelect.Field value={settings?.defaultLanguage ?? "none"} onChange={handleChangeLanguage}>
                    <option value="none">None</option>
                    <optgroup label="Specific language">
                      {supportedTypes.map((fileType) => (
                        <option key={fileType.language} value={fileType.language}>
                          {fileType.descr}
                        </option>
                      ))}
                    </optgroup>
                  </NativeSelect.Field>
                  <NativeSelect.Indicator />
                </NativeSelect.Root>
              </Field.Root>
              <Field.Root display="flex" alignItems="center">
                <Field.Label htmlFor="sort-order" mb={0}>
                  Sort blocks by:
                </Field.Label>
                <RadioGroup.Root id="sort-order" onValueChange={handleUpdateSortOrder} value={settings?.sortOrder}>
                  <HStack gap={4}>
                    <RadioGroup.Item value="none">
                      <RadioGroup.ItemHiddenInput />
                      <RadioGroup.ItemIndicator />
                      <RadioGroup.ItemText>none</RadioGroup.ItemText>
                    </RadioGroup.Item>
                    <RadioGroup.Item value="language">
                      <RadioGroup.ItemHiddenInput />
                      <RadioGroup.ItemIndicator />
                      <RadioGroup.ItemText>language</RadioGroup.ItemText>
                    </RadioGroup.Item>
                    <RadioGroup.Item value="lastUpdated">
                      <RadioGroup.ItemHiddenInput />
                      <RadioGroup.ItemIndicator />
                      <RadioGroup.ItemText>last updated</RadioGroup.ItemText>
                    </RadioGroup.Item>
                    <RadioGroup.Item value="created">
                      <RadioGroup.ItemHiddenInput />
                      <RadioGroup.ItemIndicator />
                      <RadioGroup.ItemText>created</RadioGroup.ItemText>
                    </RadioGroup.Item>
                  </HStack>
                </RadioGroup.Root>
              </Field.Root>
              <Field.Root display="flex" alignItems="center">
                <Switch.Root
                  id="show-zebra-stripes"
                  checked={settings?.showZebraStripes}
                  onChange={handleToggle("showZebraStripes")}
                >
                  <Switch.HiddenInput />
                  <Switch.Control>
                    <Switch.Thumb />
                  </Switch.Control>
                  <Switch.Label>Show zebra stripes</Switch.Label>
                </Switch.Root>
                {/* <FormLabel htmlFor="show-zebra-stripes" mb={0} ml={2}>
                  Show zebra stripes
                </FormLabel> */}
              </Field.Root>
              <Field.Root display="flex" alignItems="center">
                <Switch.Root
                  id="show-line-numbers"
                  checked={settings?.showLineNumbers}
                  onChange={handleToggle("showLineNumbers")}
                >
                  <Switch.HiddenInput />
                  <Switch.Control>
                    <Switch.Thumb />
                  </Switch.Control>
                  <Switch.Label>Show line numbers</Switch.Label>
                </Switch.Root>
                {/* <FormLabel htmlFor="show-line-numbers" mb={0} ml={2}>
                  Show line numbers
                </FormLabel> */}
              </Field.Root>
              <Field.Root display="flex" alignItems="center">
                <Switch.Root
                  id="permanently-show-search-bar"
                  checked={settings?.permanentlyShowSearchBar}
                  onChange={handleToggle("permanentlyShowSearchBar")}
                >
                  <Switch.HiddenInput />
                  <Switch.Control>
                    <Switch.Thumb />
                  </Switch.Control>
                  <Switch.Label>Permanently show search bar</Switch.Label>
                </Switch.Root>
                {/* <FormLabel htmlFor="permanently-show-search-bar" mb={0} ml={2}>
                  Permanently show search bar
                </FormLabel> */}
              </Field.Root>
              <Field.Root display="flex" alignItems="center">
                <Switch.Root
                  id="show-toolbar-for-every-block"
                  checked={settings?.showToolbarForEveryBlock}
                  onChange={handleToggle("showToolbarForEveryBlock")}
                >
                  <Switch.HiddenInput />
                  <Switch.Control>
                    <Switch.Thumb />
                  </Switch.Control>
                  <Switch.Label>Show toolbar for every block</Switch.Label>
                </Switch.Root>
                {/* <FormLabel htmlFor="show-toolbar-for-every-block" mb={0} ml={2}>
                  Show toolbar for every block
                </FormLabel> */}
              </Field.Root>
              <Field.Root display="flex" alignItems="center">
                <Switch.Root
                  id="minimise-editor-toolbar"
                  checked={settings?.minimiseEditorToolbar}
                  onChange={handleToggle("minimiseEditorToolbar")}
                >
                  <Switch.HiddenInput />
                  <Switch.Control>
                    <Switch.Thumb />
                  </Switch.Control>
                  <Switch.Label>Minimise editor toolbar</Switch.Label>
                </Switch.Root>
                {/* <FormLabel htmlFor="minimise-editor-toolbar" mb={0} ml={2}>
                  Minimise editor toolbar
                </FormLabel> */}
              </Field.Root>
              <Field.Root display="flex" alignItems="center">
                <Field.Label htmlFor="print-width" mb={0}>
                  Formatting: print width
                </Field.Label>
                {/* <NumberInput
                  value={settings?.formatting?.printWidth}
                  defaultValue={80}
                  min={0}
                  max={200}
                  onChange={handleFormattingPrintWidth}
                  size="sm"
                  width={20}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput> */}

                <NumberInput.Root
                  id="print-width"
                  defaultValue="80"
                  min={0}
                  max={200}
                  size="sm"
                  width={20}
                  value={settings?.formatting?.printWidth?.toString()}
                  onValueChange={handleFormattingPrintWidth}
                >
                  <NumberInput.Input />
                  <NumberInput.Control>
                    <NumberInput.IncrementTrigger />
                    <NumberInput.DecrementTrigger />
                  </NumberInput.Control>
                </NumberInput.Root>
                <Field.Label htmlFor="tab-width" mb={0} ml={4}>
                  tab width
                </Field.Label>
                <NumberInput.Root
                  value={settings?.formatting?.tabWidth?.toString()}
                  defaultValue="2"
                  min={2}
                  max={8}
                  step={2}
                  onValueChange={handleFormattingTabWidth}
                  size="sm"
                  width={20}
                >
                  <NumberInput.Input />
                  <NumberInput.Control>
                    <NumberInput.IncrementTrigger />
                    <NumberInput.DecrementTrigger />
                  </NumberInput.Control>
                </NumberInput.Root>
              </Field.Root>
              <DangerZoneSettings />
            </VStack>
          </Dialog.Body>
          <Dialog.Footer>
            <Dialog.ActionTrigger asChild>
              <Button variant="subtle">Close</Button>
            </Dialog.ActionTrigger>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
}
