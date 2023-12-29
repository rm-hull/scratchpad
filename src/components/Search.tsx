import {
  Box,
  Collapse,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  useControllableState,
} from "@chakra-ui/react";
import { useEffect, type ChangeEvent, type JSX } from "react";
import { FiSearch } from "react-icons/fi";
import { useDebounce, useKeyPressEvent } from "react-use";
import useFocus from "../hooks/useFocus";
import pluralize from "pluralize";

interface SearchProps {
  matches?: number;
  isOpen: boolean;
  onClose: () => void;
  onChange: (value: string) => void;
}

export default function Search({ onChange, isOpen, onClose, matches }: SearchProps): JSX.Element {
  const [value, setValue] = useControllableState({ defaultValue: "" });
  const [inputRef, setInputFocus] = useFocus<HTMLInputElement>();

  const handleSearch = (e: ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value);
  };

  useDebounce(
    () => {
      onChange(value);
    },
    100,
    [value]
  );

  const handleCancel = (e: { preventDefault: () => void }): void => {
    if (isOpen) {
      e.preventDefault();
      setValue("");
      onClose();
    }
  };

  useKeyPressEvent("Escape", handleCancel);

  useEffect(() => {
    if (isOpen) {
      setInputFocus();
    }
  }, [isOpen, setInputFocus]);

  return (
    <Collapse in={isOpen} animateOpacity>
      <Box p={2}>
        <InputGroup size="sm">
          <InputLeftAddon pointerEvents="none">
            <FiSearch />
          </InputLeftAddon>
          <Input ref={inputRef} placeholder="Search" value={value} onChange={handleSearch} />
          {matches !== undefined && (
            <InputRightAddon color={matches === 0 ? "red.400" : undefined}>
              {pluralize("matching block", matches, true)}
            </InputRightAddon>
          )}
        </InputGroup>
      </Box>
    </Collapse>
  );
}
