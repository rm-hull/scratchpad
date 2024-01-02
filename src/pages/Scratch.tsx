import { Container, Divider, useColorModeValue, useDisclosure } from "@chakra-ui/react";
import { useEffect, type JSX, useState } from "react";
import TextEditor from "../components/TextEditor";
import { type Block, sortBy, newBlock } from "../models/block";
import RightContextMenu from "../components/RightContextMenu";
import useGeneralSettings from "../hooks/useGeneralSettings";
import * as R from "ramda";
import useBlocks from "../hooks/useBlocks";
import Search from "../components/Search";
import Dropzone from "../components/DropZone";
import { fromFilename } from "../models/fileTypes";

export default function Scratch(): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchTerm, setSearchTerm] = useState<RegExp>();
  const [blocks, updateBlocks] = useBlocks();
  const [settings] = useGeneralSettings();

  const [bgColor, zebraColor] = useColorModeValue(["white", "gray.50"], ["gray.900", undefined]);

  const handleBlockChange = (updatedBlock: Block): void => {
    updateBlocks({
      ...blocks,
      [updatedBlock.id]: updatedBlock,
    });
  };

  const handleBlockDelete = (id: Block["id"], archive: boolean): void => {
    const { [id]: block, ...rest } = blocks;
    if (archive) {
      handleBlockChange({ ...block, archived: true, updatedAt: Date.now() });
    } else {
      updateBlocks(rest);
    }
  };

  const handleSearchChange = (searchTerm: string): void => {
    if (searchTerm.trim().length === 0) {
      setSearchTerm(undefined);
    } else {
      const escaped = searchTerm
        .trim()
        .replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
        .replace(/ +/g, "|");
      setSearchTerm(RegExp(`(${escaped})`, "gim"));
    }
  };

  const handleFileDropped = (file: File, content: string): void => {
    const fileType = fromFilename(file.name);
    handleBlockChange({
      ...newBlock(fileType.language),
      text: content,
      updatedAt: file.lastModified,
    });
  };

  useEffect((): void => {
    if (R.isEmpty(blocks)) {
      const block = newBlock();
      updateBlocks({ [block.id]: block });
    }
  }, [blocks, updateBlocks]);

  const sortFn = sortBy[settings?.sortOrder ?? "none"];

  const filteredBlocks = R.values(blocks).filter(
    (block) => block.archived !== true && (searchTerm === undefined || block.text.match(searchTerm) !== null)
  );

  return (
    <Dropzone onFileDropped={handleFileDropped}>
      <RightContextMenu onBlockAdd={handleBlockChange} onSearch={onOpen}>
        <Search
          onChange={handleSearchChange}
          matches={searchTerm === undefined ? undefined : filteredBlocks.length}
          isOpen={isOpen || settings?.permanentlyShowSearchBar}
          onClose={onClose}
        />
        {sortFn(filteredBlocks).map((block, index) => (
          <Container
            p={0}
            key={block.id}
            maxWidth="100%"
            backgroundColor={(settings?.showZebraStripes ?? false) && index % 2 === 1 ? zebraColor : bgColor}
          >
            <TextEditor
              block={block}
              onBlockChange={handleBlockChange}
              onBlockDelete={handleBlockDelete}
              highlight={searchTerm}
            />
            <Divider />
          </Container>
        ))}
      </RightContextMenu>
    </Dropzone>
  );
}
