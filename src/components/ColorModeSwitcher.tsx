import { IconButton, type IconButtonProps, useColorMode, useColorModeValue } from "@chakra-ui/react";
import type React from "react";
import { FaMoon, FaSun } from "react-icons/fa";

type ColorModeSwitcherProps = Omit<IconButtonProps, "aria-label">;

export const ColorModeSwitcher: React.FC<ColorModeSwitcherProps> = (props) => {
  const { toggleColorMode } = useColorMode();
  const text = useColorModeValue("dark", "light");
  const switchIcon = useColorModeValue(<FaMoon />, <FaSun />);

  return (
    <IconButton
      size="md"
      fontSize="lg"
      variant="ghost"
      color="current"
      marginLeft="2"
      onClick={toggleColorMode}
      icon={switchIcon}
      aria-label={`Switch to ${text} mode`}
      {...props}
    />
  );
};
