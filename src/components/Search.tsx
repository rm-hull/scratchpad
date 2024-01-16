import {
  Box,
  Collapse,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  useColorModeValue,
  useControllableState,
} from "@chakra-ui/react";
import pluralize from "pluralize";
import { useEffect, type ChangeEvent, type JSX } from "react";
import { FiSearch } from "react-icons/fi";
import { useDebounce, useKeyPressEvent } from "react-use";
import { useFocus } from "../hooks/useFocus";

interface SearchProps {
  matches?: number;
  isOpen: boolean;
  onClose: () => void;
  onChange: (value: string) => void;
}

export function Search({ onChange, isOpen, onClose, matches }: SearchProps): JSX.Element {
  const [value, setValue] = useControllableState({ defaultValue: "" });
  const [inputRef, setInputFocus] = useFocus<HTMLInputElement>();
  const bgColor = useColorModeValue("white", "gray.900");

  const handleSearch = (event: ChangeEvent<HTMLInputElement>): void => {
    setValue(event.target.value);
  };

  useDebounce(
    () => {
      onChange(value);
    },
    100,
    [value]
  );

  useKeyPressEvent("Escape", (event) => {
    if (isOpen) {
      event.preventDefault();
      setValue("");
      onClose();
    }
  });

  useEffect(() => {
    if (isOpen) {
      setInputFocus();
    }
  }, [isOpen, setInputFocus]);

  return (
    <Box position="sticky" top={0} zIndex={100} backgroundColor={bgColor}>
      <Collapse in={isOpen} animateOpacity>
        <Box p={2} pb={1}>
          <InputGroup size="sm">
            <InputLeftAddon pointerEvents="none">
              <FiSearch />
            </InputLeftAddon>
            <Input ref={inputRef} placeholder="Search" name="search" value={value} onChange={handleSearch} />
            {matches !== undefined && (
              <InputRightAddon color={matches === 0 ? "red.400" : undefined}>
                {pluralize("matching block", matches, true)}
              </InputRightAddon>
            )}
          </InputGroup>
        </Box>
      </Collapse>
    </Box>
  );
}
