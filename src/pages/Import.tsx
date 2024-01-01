import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useBlocks from "../hooks/useBlocks";
import { newBlock, type Block } from "../models/block";
import { useToast } from "@chakra-ui/react";

export default function Import(): null {
  const { id, language, data } = useParams();
  const [blocks, updateBlocks] = useBlocks();
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    if (blocks !== undefined) {
      const block: Block = {
        ...newBlock(language),
        id: id ?? crypto.randomUUID(),
        text: atob(data ?? ""),
        updatedAt: Date.now(),
      };

      updateBlocks({
        ...blocks,
        [block.id]: block,
      });

      toast({
        title: "Imported block successfully",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      navigate("/");
    }
  }, [blocks, data, id, language, navigate, toast, updateBlocks]);

  return null;
}
