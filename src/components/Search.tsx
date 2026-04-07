import { Box, Collapsible, Input, InputGroup, useControllableState } from "@chakra-ui/react";
import pluralize from "pluralize";
import { useEffect, type ChangeEvent, type JSX } from "react";
import { FiSearch } from "react-icons/fi";
import { useDebounce, useKeyPressEvent } from "react-use";
import { useFocus } from "../hooks/useFocus";
import { useColorModeValue } from "./ui/color-mode";

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
      <Collapsible.Root open={isOpen}>
        <Collapsible.Content>
          <Box p={2} pb={1}>
            <InputGroup
              // size="sm"
              startElement={<FiSearch pointerEvents="none" />}
              endElement={
                matches !== undefined && (
                  <Box color={matches === 0 ? "red.400" : undefined}>{pluralize("matching block", matches, true)}</Box>
                )
              }
            >
              <Input ref={inputRef} placeholder="Search" name="search" value={value} onChange={handleSearch} />
            </InputGroup>
          </Box>
        </Collapsible.Content>
      </Collapsible.Root>
    </Box>
  );
}
