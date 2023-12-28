import { Box, Divider, MenuItem, MenuList, useDisclosure, useToast, useToken } from "@chakra-ui/react";
import { ContextMenu } from "chakra-ui-contextmenu";
import { type JSX, type LegacyRef, type PropsWithChildren } from "react";
import { FiClipboard, FiMessageSquare, FiPlus, FiRefreshCw, FiSearch, FiSettings } from "react-icons/fi";
import { useKey } from "react-use";
import { newBlock, type Block } from "../models/block";
import AboutModal from "./AboutModal";
import AddNewModal from "./AddNewModal";
import SettingsModal from "./SettingsModal";

interface RightContextMenuProps {
  onBlockAdd: (block: Block) => void;
  onSearch: () => void;
}

function focus(block: Block): void {
  setTimeout(() => {
    const element = document.getElementById(block.id);
    element?.focus();
  }, 200);
}

export default function RightContextMenu({
  children,
  onBlockAdd,
  onSearch,
}: PropsWithChildren<RightContextMenuProps>): JSX.Element {
  const toast = useToast();
  const [green400, blue400, purple400] = useToken("colors", ["green.400", "blue.400", "purple.400"]);
  const { isOpen: isAddNewOpen, onOpen: onOpenAddNew, onClose: onCloseAddNew } = useDisclosure();
  const { isOpen: isAboutOpen, onOpen: onOpenAbout, onClose: onCloseAbout } = useDisclosure();
  const { isOpen: isSettingsOpen, onOpen: onOpenSettings, onClose: onCloseSettings } = useDisclosure();

  const handleAddNew = (language: string): void => {
    const block = newBlock(language);
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

  return (
    <>
      <ContextMenu
        renderMenu={() => (
          <MenuList zIndex={1000}>
            <MenuItem onClick={onOpenAddNew} command="⌘↵" icon={<FiPlus color={green400} />}>
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
            <MenuItem command="⌘/" icon={<FiSearch color={purple400} />} onClick={onSearch}>
              Search
            </MenuItem>
            <MenuItem isDisabled icon={<FiRefreshCw color={purple400} />}>
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
      <AddNewModal isOpen={isAddNewOpen} onCreate={handleAddNew} onCancel={onCloseAddNew} />
      <SettingsModal isOpen={isSettingsOpen} onClose={onCloseSettings} />
      <AboutModal isOpen={isAboutOpen} onClose={onCloseAbout} />
    </>
  );
}
