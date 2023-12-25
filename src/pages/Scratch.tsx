import { Container, Divider } from "@chakra-ui/react";
import { type JSX } from "react";
import { useLocalStorage } from "react-use";
import TextEditor from "../components/TextEditor";
import { newBlock, type Block } from "../models/block";
import RightContextMenu from "../components/RightContextMenu";

function newBlocks(): Record<string, Block> {
  const block = newBlock();
  return { [block.id]: block };
}

export default function Scratch(): JSX.Element {
  const [blocks = newBlocks(), setBlocks] = useLocalStorage<Record<string, Block>>(`scratchpad.blocks`);

  const handleBlockChange = (updatedBlock: Block): void => {
    setBlocks({
      ...blocks,
      [updatedBlock.id]: updatedBlock,
    });
  };

  const handleBlockDelete = (id: Block["id"]): void => {
    const { [id]: _, ...rest } = blocks;
    setBlocks(rest);
  };

  return (
    <RightContextMenu onBlockAdd={handleBlockChange}>
      {Object.values(blocks).map((block, index) => (
        <Container key={block.id} maxWidth="100%" backgroundColor={index % 2 === 0 ? "white" : "gray.50"}>
          <TextEditor block={block} onBlockChange={handleBlockChange} onBlockDelete={handleBlockDelete} />
          <Divider />
        </Container>
      ))}
    </RightContextMenu>
  );
}
