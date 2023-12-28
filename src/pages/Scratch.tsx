import { Container, Divider, useDisclosure } from "@chakra-ui/react";
import { useEffect, type JSX, useState } from "react";
import TextEditor from "../components/TextEditor";
import { type Block, sortBy, newBlock } from "../models/block";
import RightContextMenu from "../components/RightContextMenu";
import useGeneralSettings from "../hooks/useGeneralSettings";
import * as R from "ramda";
import useBlocks from "../hooks/useBlocks";
import Search from "../components/Search";

export default function Scratch(): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchTerm, setSearchTerm] = useState<RegExp>();
  const [blocks, updateBlocks] = useBlocks();
  const [settings] = useGeneralSettings();

  const handleBlockChange = (updatedBlock: Block): void => {
    updateBlocks({
      ...blocks,
      [updatedBlock.id]: updatedBlock,
    });
  };

  const handleBlockDelete = (id: Block["id"]): void => {
    const { [id]: _, ...rest } = blocks;
    updateBlocks(rest);
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

  useEffect((): void => {
    if (R.isEmpty(blocks)) {
      const block = newBlock();
      updateBlocks({ [block.id]: block });
    }
  }, [blocks, updateBlocks]);

  const sortFn = sortBy[settings?.sortOrder ?? "none"];

  const filteredBlocks = R.values(blocks).filter(
    (block) => searchTerm === undefined || block.text.match(searchTerm) !== null
  );

  return (
    <RightContextMenu onBlockAdd={handleBlockChange} onSearch={onOpen}>
      <Search onChange={handleSearchChange} isOpen={isOpen} onClose={onClose} />
      {sortFn(filteredBlocks).map((block, index) => (
        <Container
          p={0}
          key={block.id}
          maxWidth="100%"
          backgroundColor={(settings?.showZebraStripes ?? false) && index % 2 === 1 ? "gray.50" : "white"}
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
  );
}
