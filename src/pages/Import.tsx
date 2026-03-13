import { Base64 } from "js-base64";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useBlocks } from "../hooks/useBlocks";
import { newBlock, type Block } from "../models/block";
import { toaster } from "@/components/ui/toaster";

export function Import() {
  const { id, language, data } = useParams();
  const [blocks, updateBlocks] = useBlocks();
  const navigate = useNavigate();

  useEffect(() => {
    if (blocks !== undefined) {
      const block: Block = {
        ...newBlock(language),
        id: id ?? crypto.randomUUID(),
        text: Base64.decode(data ?? ""),
        updatedAt: Date.now(),
      };

      updateBlocks({
        ...blocks,
        [block.id]: block,
      });

      toaster.create({
        title: "Imported block successfully",
        type: "success",
        duration: 9000,
        closable: true,
      });
      navigate("/");
    }
  }, [blocks, data, id, language, navigate, updateBlocks]);

  return null;
}
