import { IconButton } from "@chakra-ui/react";
import { type JSX } from "react";
import { FiCheck, FiClipboard } from "react-icons/fi";
import { Tooltip } from "./ui/tooltip";

interface CopyToClipboardButtonProps {
  hasCopied: boolean;
  onCopy: () => void;
  size?: "2xs";
  variant?: "plain" | "ghost";
  showTooltip?: boolean;
  height?: string;
}

function wrapTooltip(showTooltip: boolean, element: JSX.Element) {
  if (showTooltip) {
    return <Tooltip content="Copy to clipboard">{element}</Tooltip>;
  }

  return element;
}

export function CopyToClipboardButton({
  hasCopied,
  onCopy,
  size,
  variant,
  showTooltip = false,
  height,
}: CopyToClipboardButtonProps) {
  return wrapTooltip(
    showTooltip,
    <IconButton
      size={size}
      variant={variant}
      aria-label="Copy to clipboard"
      onClick={onCopy}
      color={hasCopied ? "green.400" : "blue.400"}
      height={height}
    >
      {hasCopied ? <FiCheck /> : <FiClipboard />}
    </IconButton>
  );
}
