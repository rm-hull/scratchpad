import { IconButton, type ResponsiveValue, Tooltip } from "@chakra-ui/react";
import { type JSX } from "react";
import { FiCheck, FiClipboard } from "react-icons/fi";

interface CopyToClipboardButtonProps {
  hasCopied: boolean;
  onCopy: () => void;
  size?: ResponsiveValue<string>;
  variant?: string;
  showTooltip?: boolean;
  ml?: number;
}

function wrapTooltip(showTooltip: boolean, element: JSX.Element): JSX.Element {
  if (showTooltip) {
    return <Tooltip label="Copy to clipboard">{element}</Tooltip>;
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
    <IconButton
      ml={ml}
      size={size}
      variant={variant}
      aria-label="Copy to clipboard"
      icon={hasCopied ? <FiCheck /> : <FiClipboard />}
      textColor={hasCopied ? "green.400" : "blue.400"}
      onClick={onCopy}
    />
  );
}
