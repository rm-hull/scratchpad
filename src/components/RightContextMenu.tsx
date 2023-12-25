import { Box, Divider, MenuItem, MenuList, useDisclosure, useToast, useToken } from "@chakra-ui/react";
import { ContextMenu } from "chakra-ui-contextmenu";
import { type LegacyRef, type JSX, type PropsWithChildren } from "react";
import { FiClipboard, FiMessageSquare, FiPlus, FiRefreshCw, FiSettings } from "react-icons/fi";
import AboutModal from "./AboutModal";
import SettingsModal from "./SettingsModal";
import AddNewModal from "./AddNewModal";
import { type Block, newBlock } from "../models/block";

interface RightContextMenuProps {
  onBlockAdd: (block: Block) => void;
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
    try {
      const block = newBlock();
      block.text = await navigator.clipboard.readText();
      onBlockAdd(block);
      focus(block);
    } catch (err) {
      toast({
        title: "Could not paste clipboard contents",
        description: (err as Error).message,
        status: "error",
      });
    }
  };

  return (
    <>
      <ContextMenu
        renderMenu={() => (
          <MenuList zIndex={1000}>
            <MenuItem onClick={onOpenAddNew} icon={<FiPlus color={green400} />}>
              Add new...
            </MenuItem>
            <MenuItem onClick={handleFromClipboard} icon={<FiClipboard color={blue400} />}>
              From clipboard
            </MenuItem>
            <Divider />
            <MenuItem isDisabled icon={<FiRefreshCw color={purple400} />}>
              Sync
            </MenuItem>
            <MenuItem onClick={onOpenSettings} icon={<FiSettings />}>
              Settings
            </MenuItem>
            <MenuItem onClick={onOpenAbout} icon={<FiMessageSquare />}>
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
