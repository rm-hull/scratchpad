import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Radio,
  RadioGroup,
  Switch,
  VStack,
} from "@chakra-ui/react";
import { type JSX } from "react";
import useGeneralSettings, { type BooleanSettingsKeys } from "../hooks/useGeneralSettings";
import { type sortBy } from "../models/block";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import DangerZoneSettings from "./DangerZoneSettings";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SettingsModal({ isOpen, onClose }: SettingsModalProps): JSX.Element | null {
  const [settings, updateSettings] = useGeneralSettings();
  const handleUpdateSortOrder = (sortOrder: keyof typeof sortBy): void => {
    updateSettings({ ...settings, sortOrder });
  };

  const handleToggle = (key: BooleanSettingsKeys) => () => {
    updateSettings({ ...settings, [key]: !settings[key] as boolean });
  };

  const handleFormattingPrintWidth = (_: string, printWidth: number): void => {
    updateSettings({ ...settings, formatting: { ...settings.formatting, printWidth } });
  };

  const handleFormattingTabWidth = (_: string, tabWidth: number): void => {
    updateSettings({ ...settings, formatting: { ...settings.formatting, tabWidth } });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl" scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Settings</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack align="left">
            <FormControl display="flex" alignItems="baseline">
              <FormLabel htmlFor="system-theme">Theme:</FormLabel>
              <ColorModeSwitcher />
            </FormControl>
            <FormControl display="flex" alignItems="center">
              <FormLabel htmlFor="sort-order" mb={0}>
                Sort blocks by:
              </FormLabel>
              <RadioGroup id="sort-order" onChange={handleUpdateSortOrder} value={settings?.sortOrder}>
                <HStack gap={4}>
                  <Radio value="none">none</Radio>
                  <Radio value="language">language</Radio>
                  <Radio value="lastUpdated">last updated</Radio>
                  <Radio value="created">created</Radio>
                </HStack>
              </RadioGroup>
            </FormControl>

            <FormControl display="flex" alignItems="center">
              <Switch
                id="show-zebra-stripes"
                isChecked={settings?.showZebraStripes}
                onChange={handleToggle("showZebraStripes")}
              />
              <FormLabel htmlFor="show-zebra-stripes" mb={0} ml={2}>
                Show zebra stripes
              </FormLabel>
            </FormControl>

            <FormControl display="flex" alignItems="center">
              <Switch
                id="show-line-numbers"
                isChecked={settings?.showLineNumbers}
                onChange={handleToggle("showLineNumbers")}
              />
              <FormLabel htmlFor="show-line-numbers" mb={0} ml={2}>
                Show line numbers
              </FormLabel>
            </FormControl>

            <FormControl display="flex" alignItems="center">
              <Switch
                id="permanently-show-search-bar"
                isChecked={settings?.permanentlyShowSearchBar}
                onChange={handleToggle("permanentlyShowSearchBar")}
              />
              <FormLabel htmlFor="permanently-show-search-bar" mb={0} ml={2}>
                Permanently show search bar
              </FormLabel>
            </FormControl>

            <FormControl display="flex" alignItems="center">
              <Switch
                id="show-toolbar-for-every-block"
                isChecked={settings?.showToolbarForEveryBlock}
                onChange={handleToggle("showToolbarForEveryBlock")}
              />
              <FormLabel htmlFor="show-toolbar-for-every-block" mb={0} ml={2}>
                Show toolbar for every block
              </FormLabel>
            </FormControl>

            <FormControl display="flex" alignItems="center">
              <Switch
                id="minimise-editor-toolbar"
                isChecked={settings?.minimiseEditorToolbar}
                onChange={handleToggle("minimiseEditorToolbar")}
              />
              <FormLabel htmlFor="minimise-editor-toolbar" mb={0} ml={2}>
                Minimise editor toolbar
              </FormLabel>
            </FormControl>

            <FormControl display="flex" alignItems="center">
              <FormLabel htmlFor="print-width" mb={0}>
                Formatting: print width
              </FormLabel>
              <NumberInput
                value={settings?.formatting?.printWidth}
                defaultValue={80}
                min={0}
                max={200}
                onChange={handleFormattingPrintWidth}
                size="sm"
                width={20}
              >
                <NumberInputField id="print-width" />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>

              <FormLabel htmlFor="tab-width" mb={0} ml={4}>
                tab width
              </FormLabel>
              <NumberInput
                value={settings?.formatting?.tabWidth}
                defaultValue={2}
                min={2}
                max={8}
                step={2}
                onChange={handleFormattingTabWidth}
                size="sm"
                width={20}
              >
                <NumberInputField id="tab-width" />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>

            <DangerZoneSettings />
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
