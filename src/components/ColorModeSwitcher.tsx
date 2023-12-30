import { IconButton, type IconButtonProps, useColorMode, useColorModeValue } from "@chakra-ui/react";
import type React from "react";
import { FaMoon, FaSun } from "react-icons/fa";

type ColorModeSwitcherProps = Omit<IconButtonProps, "aria-label">;

export const ColorModeSwitcher: React.FC<ColorModeSwitcherProps> = (props) => {
  const { toggleColorMode } = useColorMode();
  const switchIcon = useColorModeValue(<FaSun />, <FaMoon />);

  return (
    <IconButton
      size="md"
      fontSize="lg"
      variant="ghost"
      color="current"
      onClick={toggleColorMode}
      icon={switchIcon}
      aria-label="Switch mode"
      {...props}
    />
  );
};
