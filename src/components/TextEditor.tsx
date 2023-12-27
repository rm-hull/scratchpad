import { highlight, type Grammar } from "prismjs";
import { useMemo, type JSX } from "react";
// import "prismjs/themes/prism-dark.css";
import { Box, useClipboard } from "@chakra-ui/react";
import clsx from "clsx";
import "prismjs/themes/prism.css";
import Editor from "react-simple-code-editor";
import { useDebounce } from "react-use";
import useGeneralSettings from "../hooks/useGeneralSettings";
import { type Block } from "../models/block";
import { fromLanguage } from "../models/fileTypes";
import { type MathResults, evaluate } from "../models/math";
import MathResult from "./MathResult";
import "./TextEditor.styles.css";
import Toolbar from "./Toolbar";

interface TextEditorProps {
  block: Block;
  highlight?: string;
  onBlockChange: (block: Block) => void;
  onBlockDelete: (id: Block["id"]) => void;
}

function mark(text: string | undefined, input: string, grammar: Grammar, language: string): string {
  const result: string = highlight(input, grammar, language);
  if (text === undefined || text.trim() === "") {
    return result;
  }
  return result.replace(RegExp(`(${text})`, "ig"), "<mark>$1</mark>");
}

function hightlightWithLineNumbers(
  lineNumbers: boolean,
  text: string | undefined,
  results: MathResults,
  input: string,
  grammar: Grammar,
  language: string
): JSX.Element[] {
  const xOffset = getMaxLineLength(input);
  return mark(text, input, grammar, language)
    .split("\n")
    .map((line: string, index: number) => (
      <div key={index}>
        {lineNumbers && <span className="editorLineNumber">{index + 1}</span>}
        <span dangerouslySetInnerHTML={{ __html: line }} />
        {results[index] !== undefined && (
          <MathResult
            xOffset={xOffset}
            result={results[index].message}
            isError={results[index].error}
            lineNumbers={lineNumbers}
          />
        )}
        <br />
      </div>
    ));
}

function getMaxLineLength(input: string): number {
  const lines = input.split("\n");
  const maxLineLength = Math.max(...lines.map((line) => line.length));
  return maxLineLength;
}

export default function TextEditor({ block, onBlockChange, onBlockDelete, highlight }: TextEditorProps): JSX.Element {
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
        highlight={(text: string) =>
          hightlightWithLineNumbers(
            settings.showLineNumbers,
            highlight,
            block.language === "math.js" ? evaluate(text) : {},
            text,
            fileType.grammar,
            block.language
          )
        }
        padding={5}
        className={clsx("editor", (settings?.showLineNumbers ?? false) && "lineNumbers")}
      />
    </Box>
  );
}
