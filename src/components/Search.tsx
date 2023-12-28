import { Box, Collapse, Input, InputGroup, InputLeftElement, useControllableState } from "@chakra-ui/react";
import { useEffect, type ChangeEvent, type JSX } from "react";
import { FiSearch } from "react-icons/fi";
import { useDebounce, useKeyPressEvent } from "react-use";
import useFocus from "../hooks/useFocus";

interface SearchProps {
  isOpen: boolean;
  onClose: () => void;
  onChange: (value: string) => void;
}

export default function Search({ onChange, isOpen, onClose }: SearchProps): JSX.Element {
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
    e.preventDefault();
    setValue("");
    onClose();
  };

  const handleBlur = (): void => {
    setTimeout(onClose, 300);
  };

  useKeyPressEvent("Enter", onClose);
  useKeyPressEvent("Escape", handleCancel);

  useEffect(() => {
    if (isOpen) {
      setInputFocus();
    }
  }, [isOpen, setInputFocus]);

  return (
    <Collapse in={isOpen} animateOpacity>
      <Box p={2}>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <FiSearch />
          </InputLeftElement>
          <Input ref={inputRef} placeholder="Search" value={value} onChange={handleSearch} onBlur={handleBlur} />
        </InputGroup>
      </Box>
    </Collapse>
  );
}
