import { Container, Divider } from "@chakra-ui/react";
import { useEffect, type JSX } from "react";
import TextEditor from "../components/TextEditor";
import { type Block, sortBy, newBlock } from "../models/block";
import RightContextMenu from "../components/RightContextMenu";
import useGeneralSettings from "../hooks/useGeneralSettings";
import * as R from "ramda";
import useBlocks from "../hooks/useBlocks";

export default function Scratch(): JSX.Element {
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

  useEffect((): void => {
    if (R.isEmpty(blocks)) {
      const block = newBlock();
      updateBlocks({ [block.id]: block });
    }
  }, [blocks, updateBlocks]);

  const sortFn = sortBy[settings?.sortOrder ?? "none"];

  return (
    <RightContextMenu onBlockAdd={handleBlockChange}>
      {sortFn(R.values(blocks)).map((block, index) => (
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
            // highlight={/(fred\w*|square)/gi}
          />
          <Divider />
        </Container>
      ))}
    </RightContextMenu>
  );
}
