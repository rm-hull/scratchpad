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
  Radio,
  RadioGroup,
  Switch,
  VStack,
} from "@chakra-ui/react";
import { type JSX } from "react";
import useGeneralSettings from "../hooks/useGeneralSettings";
import { type sortBy } from "../models/block";
import { ColorModeSwitcher } from "./ColorModeSwitcher";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SettingsModal({ isOpen, onClose }: SettingsModalProps): JSX.Element | null {
  const [settings, updateSettings] = useGeneralSettings();
  const handleUpdateSortOrder = (sortOrder: keyof typeof sortBy): void => {
    updateSettings({ ...settings, sortOrder });
  };

  const handleToggleShowZebraStripes = (): void => {
    updateSettings({ ...settings, showZebraStripes: !settings.showZebraStripes });
  };

  const handleToggleShowLineNumbers = (): void => {
    updateSettings({ ...settings, showLineNumbers: !settings.showLineNumbers });
  };

  const handleTogglePermanentlyShowSearchBar = (): void => {
    updateSettings({ ...settings, permanentlyShowSearchBar: !settings.permanentlyShowSearchBar });
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
                onChange={handleToggleShowZebraStripes}
              />
              <FormLabel htmlFor="show-zebra-stripes" mb={0} ml={2}>
                Show zebra stripes
              </FormLabel>
            </FormControl>

            <FormControl display="flex" alignItems="center">
              <Switch
                id="show-line-numbers"
                isChecked={settings?.showLineNumbers}
                onChange={handleToggleShowLineNumbers}
              />
              <FormLabel htmlFor="show-line-numbers" mb={0} ml={2}>
                Show line numbers
              </FormLabel>
            </FormControl>

            <FormControl display="flex" alignItems="center">
              <Switch
                id="permanently=-show-search-bar"
                isChecked={settings?.permanentlyShowSearchBar}
                onChange={handleTogglePermanentlyShowSearchBar}
              />
              <FormLabel htmlFor="permanently=-show-search-bar" mb={0} ml={2}>
                Permanently show search bar
              </FormLabel>
            </FormControl>
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
