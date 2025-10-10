import { Box, Menu, Portal, Separator, useDisclosure, useToken } from "@chakra-ui/react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useCallback, useState, type PropsWithChildren } from "react";
import { FiClipboard, FiMessageSquare, FiPlus, FiRefreshCw, FiSearch, FiSettings } from "react-icons/fi";
import { VscDebugConsole } from "react-icons/vsc";
import { useKey } from "react-use";
import { useGeneralSettings } from "../hooks/useGeneralSettings";
import { focus, newBlock, type Block } from "../models/block";
import { AboutDialog } from "./AboutDialog";
import { AddNewDialog } from "./AddNewDialog";
import { DecodeSelectionDialog } from "./DecodeSelectionModal";
import { SettingsDialog } from "./SettingsDialog";
import { Sync } from "./Sync";
import { GotoNamespace } from "./GotoScratchpad";
import { toaster } from "./ui/toaster";

const isMac = navigator.platform.toLowerCase().includes("mac");
const commandPrefix = isMac ? "⌘" : "CTRL";

function nothingSelected(): boolean {
  return (window.getSelection()?.toString()?.trim()?.length ?? 0) === 0;
}

interface RightContextMenuProps {
  onBlockAdd: (block: Block) => void;
  onSearch: () => void;
}

export function RightContextMenu({ children, onBlockAdd, onSearch }: PropsWithChildren<RightContextMenuProps>) {
  const [settings] = useGeneralSettings();
  const [green400, blue400, purple400] = useToken("colors", ["green.400", "blue.400", "purple.400"]);
  const { open: isAddNewOpen, onOpen: onOpenAddNew, onClose: onCloseAddNew } = useDisclosure();
  const { open: isAboutOpen, onOpen: onOpenAbout, onClose: onCloseAbout } = useDisclosure();
  const { open: isSettingsOpen, onOpen: onOpenSettings, onClose: onCloseSettings } = useDisclosure();
  const {
    open: isDecodeSelectionOpen,
    onOpen: onOpenDecodeSelection,
    onClose: onCloseDecodeSelection,
  } = useDisclosure();
  const [isSyncing, setIsSyncing] = useState(false);

  const handleCreate = useCallback(
    (language: string, text: string = "") => {
      const block = { ...newBlock(language), text };
      onBlockAdd(block);
      focus(block);
    },
    [onBlockAdd]
  );

  const handleAddNew = useCallback(() => {
    if (settings?.defaultLanguage === undefined || settings.defaultLanguage === "none") {
      onOpenAddNew();
    } else {
      handleCreate(settings.defaultLanguage);
    }
  }, [handleCreate, onOpenAddNew, settings?.defaultLanguage]);

  const handleFromClipboard = async (): Promise<void> => {
    const block = newBlock();
    block.text = await navigator.clipboard.readText();
    onBlockAdd(block);
    focus(block);
  };

  const handleClipboardError = (err: Error): void => {
    toaster.create({
      title: "Could not paste clipboard contents",
      description: err.message,
      type: "error",
    });
  };

  useKey("/", (event) => {
    if (event.metaKey || event.ctrlKey) {
      onSearch();
    }
  });

  useKey("Enter", (event) => {
    if (event.metaKey || event.ctrlKey) {
      handleAddNew();
    }
  });

  useKey(".", (event) => {
    if (event.metaKey || event.ctrlKey) {
      if (nothingSelected()) {
        return;
      }
      onOpenDecodeSelection();
    }
  });

  return (
    <>
      <Menu.Root>
        <Menu.ContextTrigger width="full">{children}</Menu.ContextTrigger>

        <Portal>
          <Menu.Positioner>
            <Menu.Content>
              <Menu.ItemGroup>
                <Menu.Item value="add-new" onClick={handleAddNew}>
                  <FiPlus color={green400} />
                  <Box flex="1">Add new...</Box>
                  <Menu.ItemCommand>{commandPrefix + "↵"}</Menu.ItemCommand>
                </Menu.Item>

                <Menu.Item value="add-from-clipboard" onClick={() => handleFromClipboard().catch(handleClipboardError)}>
                  <FiClipboard color={blue400} />
                  <Box flex="1">Add from clipboard</Box>
                </Menu.Item>
              </Menu.ItemGroup>

              <Separator />

              <Menu.ItemGroup>
                <Menu.Item value="search" onClick={onSearch}>
                  <FiSearch color={purple400} />
                  <Box flex="1">Search</Box>
                  <Menu.ItemCommand>{commandPrefix + "/"}</Menu.ItemCommand>
                </Menu.Item>

                <Menu.Item value="decode-selection" onClick={onOpenDecodeSelection} disabled={nothingSelected()}>
                  <VscDebugConsole color={purple400} />
                  <Box flex="1">Decode selection</Box>
                  <Menu.ItemCommand>{commandPrefix + "."}</Menu.ItemCommand>
                </Menu.Item>

                <Menu.Item
                  value="sync-to-google"
                  onClick={() => setIsSyncing(true)}
                  disabled={import.meta.env.VITE_GOOGLE_API_CLIENT_ID === undefined || isSyncing}
                >
                  <FiRefreshCw color={purple400} />
                  <Box flex="1">Sync</Box>
                </Menu.Item>

                <GotoNamespace />
              </Menu.ItemGroup>
              <Separator />

              <Menu.ItemGroup>
                <Menu.Item value="settings" onClick={onOpenSettings}>
                  <FiSettings />
                  <Box flex="1">Settings</Box>
                </Menu.Item>
                <Menu.Item value="about" onClick={onOpenAbout}>
                  <FiMessageSquare />
                  <Box flex="1">About</Box>
                </Menu.Item>
              </Menu.ItemGroup>
            </Menu.Content>
          </Menu.Positioner>
        </Portal>
      </Menu.Root>

      {isAddNewOpen && <AddNewDialog isOpen={isAddNewOpen} onCreate={handleCreate} onCancel={onCloseAddNew} />}
      {isSettingsOpen && <SettingsDialog isOpen={isSettingsOpen} onClose={onCloseSettings} />}
      {isAboutOpen && <AboutDialog isOpen={isAboutOpen} onClose={onCloseAbout} />}
      {isDecodeSelectionOpen && (
        <DecodeSelectionDialog
          isOpen={isDecodeSelectionOpen}
          onClose={onCloseDecodeSelection}
          onBlockAdd={handleCreate}
          selectedText={window.getSelection()?.toString()}
        />
      )}
      {import.meta.env.VITE_GOOGLE_API_CLIENT_ID !== undefined && isSyncing && (
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_API_CLIENT_ID as string}>
          <Sync onError={() => setIsSyncing(false)} onFinished={() => setIsSyncing(false)} />
        </GoogleOAuthProvider>
      )}
    </>
  );
}
