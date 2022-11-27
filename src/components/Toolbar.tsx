import { HStack, IconButton, Select, Tooltip } from "@chakra-ui/react";
import { VscDebugContinue } from "react-icons/vsc";

export default function Toolbar() {
  return (
    <HStack spacing={1}>
      <Select placeholder="Type">
        <option value="json">Python</option>
        <option value="json">JSON</option>
        <option value="html">HTML</option>
        <option value="text">Text</option>
      </Select>
      <Tooltip label="Format">
        <IconButton fontSize={16} variant="ghost" icon={<VscDebugContinue />} aria-label="Format" textColor="#86bcf9" />
      </Tooltip>
    </HStack>
  );
}
