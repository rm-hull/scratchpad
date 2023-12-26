import { type Grammar, highlight } from "prismjs";
import { useMemo, type JSX } from "react";
// import "prismjs/themes/prism-dark.css";
import "prismjs/themes/prism.css";
import Editor from "react-simple-code-editor";
import "./TextEditor.styles.css";
import { Box, useClipboard } from "@chakra-ui/react";
import Toolbar from "./Toolbar";
import { fromLanguage } from "../models/fileTypes";
import { type Block } from "../models/block";
import { useDebounce } from "react-use";
import useGeneralSettings from "../hooks/useGeneralSettings";
import clsx from "clsx";
import { augmentResult } from "../models/math";

interface TextEditorProps {
  block: Block;
  onBlockChange: (block: Block) => void;
  onBlockDelete: (id: Block["id"]) => void;
}

function hightlightWithLineNumbers(input: string, grammar: Grammar, language: string): JSX.Element[] {
  return highlight(input, grammar, language)
    .split("\n")
    .map((line: string, i: number) => (
      <div key={i}>
        <span className="editorLineNumber">{i + 1}</span>
        <span dangerouslySetInnerHTML={{ __html: line }} />
        <br />
      </div>
    ));
}

export default function TextEditor({ block, onBlockChange, onBlockDelete }: TextEditorProps): JSX.Element {
  const fileType = useMemo(() => fromLanguage(block.language), [block.language]);
  const { onCopy, hasCopied, value, setValue } = useClipboard(block.text);
  const [settings] = useGeneralSettings();

  useDebounce(
    () => {
      onBlockChange({ ...block, text: value, updatedAt: Date.now() });
    },
    1000,
    [value]
  );

  const handleLanguageChange = (language: string): void => {
    onBlockChange({ ...block, language, updatedAt: Date.now() });
  };

  const hl = settings?.showLineNumbers ?? false ? hightlightWithLineNumbers : highlight;

  return (
    <Box>
      <Box position="absolute" right={0} zIndex={99}>
        <Toolbar
          language={block.language}
          onChangeLanguage={handleLanguageChange}
          onDelete={() => {
            onBlockDelete(block.id);
          }}
          hasCopied={hasCopied}
          onCopy={onCopy}
          locked={block.locked}
        />
      </Box>
      <Editor
        disabled={block.locked}
        textareaId={block.id}
        textareaClassName="codeArea"
        value={value}
        onValueChange={setValue}
        highlight={(text: string) => {
          const augmented = augmentResult(text, block.language);
          return hl(augmented, fileType.grammar, block.language);
        }}
        padding={5}
        className={clsx("editor", (settings?.showLineNumbers ?? false) && "lineNumbers")}
      />
    </Box>
  );
}
