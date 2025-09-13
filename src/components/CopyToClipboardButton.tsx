import { IconButton } from "@chakra-ui/react";
import { type JSX } from "react";
import { FiCheck, FiClipboard } from "react-icons/fi";
import { Tooltip } from "./ui/tooltip";

interface CopyToClipboardButtonProps {
  hasCopied: boolean;
  onCopy: () => void;
  size?: "xs";
  variant?: "ghost";
  showTooltip?: boolean;
  ml?: number;
}

function wrapTooltip(showTooltip: boolean, element: JSX.Element): JSX.Element {
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
}: CopyToClipboardButtonProps): JSX.Element {
  return wrapTooltip(
    showTooltip,
    <IconButton ml={ml} size={size} variant={variant} aria-label="Copy to clipboard" onClick={onCopy}>
      {hasCopied ? <FiCheck color="green.400" /> : <FiClipboard color="blue.400" />}
    </IconButton>
  );
}
