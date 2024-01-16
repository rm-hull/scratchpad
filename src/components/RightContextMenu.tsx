import { Box, Divider, MenuItem, MenuList, useBoolean, useDisclosure, useToast, useToken } from "@chakra-ui/react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ContextMenu } from "chakra-ui-contextmenu";
import { type JSX, type LegacyRef, type PropsWithChildren } from "react";
import { FiClipboard, FiMessageSquare, FiPlus, FiRefreshCw, FiSearch, FiSettings } from "react-icons/fi";
import { VscDebugConsole } from "react-icons/vsc";
import { useKey } from "react-use";
import { focus, newBlock, type Block } from "../models/block";
import { AboutModal } from "./AboutModal";
import { AddNewModal } from "./AddNewModal";
import { DecodeSelectionModal } from "./DecodeSelectionModal";
import { SettingsModal } from "./SettingsModal";
import { Sync } from "./Sync";

const isMac = navigator.platform.toLowerCase().includes("mac");
const commandPrefix = isMac ? "⌘" : "CTRL";

function nothingSelected(): boolean {
  return (window.getSelection()?.toString()?.trim()?.length ?? 0) === 0;
}

interface RightContextMenuProps {
  onBlockAdd: (block: Block) => void;
  onSearch: () => void;
}

export function RightContextMenu({
  children,
  onBlockAdd,
  onSearch,
}: PropsWithChildren<RightContextMenuProps>): JSX.Element {
  const toast = useToast();
  const [green400, blue400, purple400] = useToken("colors", ["green.400", "blue.400", "purple.400"]);
  const { isOpen: isAddNewOpen, onOpen: onOpenAddNew, onClose: onCloseAddNew } = useDisclosure();
  const { isOpen: isAboutOpen, onOpen: onOpenAbout, onClose: onCloseAbout } = useDisclosure();
  const { isOpen: isSettingsOpen, onOpen: onOpenSettings, onClose: onCloseSettings } = useDisclosure();
  const {
    isOpen: isDecodeSelectionOpen,
    onOpen: onOpenDecodeSelection,
    onClose: onCloseDecodeSelection,
  } = useDisclosure();
  const [isSyncing, { on: startSync, off: stopSync }] = useBoolean();

  const handleAddNew = (language: string, text: string = ""): void => {
    const block = { ...newBlock(language), text };
    onBlockAdd(block);
    focus(block);
  };

  const handleFromClipboard = async (): Promise<void> => {
    const block = newBlock();
    block.text = await navigator.clipboard.readText();
    onBlockAdd(block);
    focus(block);
  };

  const handleClipboardError = (err: Error): void => {
    toast({
      title: "Could not paste clipboard contents",
      description: err.message,
      status: "error",
    });
  };

  useKey("/", (event) => {
    if (event.metaKey || event.ctrlKey) {
      onSearch();
    }
  });

  useKey("Enter", (event) => {
    if (event.metaKey || event.ctrlKey) {
      onOpenAddNew();
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
      <ContextMenu
        renderMenu={() => (
          <MenuList zIndex={1000}>
            <MenuItem command={commandPrefix + "↵"} icon={<FiPlus color={green400} />} onClick={onOpenAddNew}>
              Add new...
            </MenuItem>
            <MenuItem
              icon={<FiClipboard color={blue400} />}
              onClick={() => {
                handleFromClipboard().catch(handleClipboardError);
              }}
            >
              Add from clipboard
            </MenuItem>
            <Divider />
            <MenuItem command={commandPrefix + "/"} icon={<FiSearch color={purple400} />} onClick={onSearch}>
              Search
            </MenuItem>
            <MenuItem
              command={commandPrefix + "."}
              isDisabled={nothingSelected()}
              icon={<VscDebugConsole color={purple400} />}
              onClick={onOpenDecodeSelection}
            >
              Decode selection
            </MenuItem>
            <MenuItem
              isDisabled={import.meta.env.VITE_GOOGLE_API_CLIENT_ID === undefined || isSyncing}
              icon={<FiRefreshCw color={purple400} />}
              onClick={startSync}
            >
              Sync
            </MenuItem>
            <Divider />
            <MenuItem icon={<FiSettings />} onClick={onOpenSettings}>
              Settings
            </MenuItem>
            <MenuItem icon={<FiMessageSquare />} onClick={onOpenAbout}>
              About
            </MenuItem>
          </MenuList>
        )}
      >
        {(ref: LegacyRef<HTMLDivElement>) => <Box ref={ref}>{children}</Box>}
      </ContextMenu>
      {isAddNewOpen && <AddNewModal isOpen={isAddNewOpen} onCreate={handleAddNew} onCancel={onCloseAddNew} />}
      {isSettingsOpen && <SettingsModal isOpen={isSettingsOpen} onClose={onCloseSettings} />}
      {isAboutOpen && <AboutModal isOpen={isAboutOpen} onClose={onCloseAbout} />}
      {isDecodeSelectionOpen && (
        <DecodeSelectionModal
          isOpen={isDecodeSelectionOpen}
          onClose={onCloseDecodeSelection}
          onBlockAdd={handleAddNew}
          selectedText={window.getSelection()?.toString()}
        />
      )}
      {import.meta.env.VITE_GOOGLE_API_CLIENT_ID !== undefined && isSyncing && (
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_API_CLIENT_ID as string}>
          <Sync onError={stopSync} onFinished={stopSync} />
        </GoogleOAuthProvider>
      )}
    </>
  );
}
