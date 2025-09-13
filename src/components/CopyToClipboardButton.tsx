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
  ml?: number;
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
  ml,
}: CopyToClipboardButtonProps) {
  return wrapTooltip(
    showTooltip,
    <IconButton
      ml={ml}
      size={size}
      variant={variant}
      aria-label="Copy to clipboard"
      onClick={onCopy}
      color={hasCopied ? "green.400" : "blue.400"}
    >
      {hasCopied ? <FiCheck /> : <FiClipboard />}
    </IconButton>
  );
}
