import { Box, useBoolean, useClipboard, useDisclosure, useToast } from "@chakra-ui/react";
import clsx from "clsx";
import { highlight, type Grammar } from "prismjs";
import "prismjs/themes/prism.css";
import { useCallback, useMemo, type JSX } from "react";
import Editor from "react-simple-code-editor";
import { useDebounce } from "react-use";
import { useGeneralSettings } from "../hooks/useGeneralSettings";
import { type Block } from "../models/block";
import { fromLanguage } from "../models/fileTypes";
import { Evaluator, type MathResults } from "../models/math";
import { replaceInXmlText } from "../models/replacer";
import { ExportModal } from "./ExportModal";
import { MathResult } from "./MathResult";
import "./TextEditor.styles.css";
import { Toolbar } from "./Toolbar";

interface TextEditorProps {
  block: Block;
  highlight?: RegExp;
  backgroundColor?: string;
  onBlockChange: (block: Block) => void;
  onBlockDelete: (id: Block["id"], archive: boolean) => void;
}

function mark(regexp: RegExp | undefined, input: string, grammar: Grammar, language: string): string {
  const result = highlight(input, grammar, language);
  if (regexp === undefined) {
    return result;
  }

  return replaceInXmlText(result, regexp, "<mark>$1</mark>");
}

function hightlightWithLineNumbers(
  lineNumbers: boolean,
  regexp: RegExp | undefined,
  results: MathResults,
  input: string,
  grammar: Grammar,
  language: string
): JSX.Element[] {
  const xOffset = getMaxLineLength(input);
  return mark(regexp, input, grammar, language)
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

export function TextEditor({
  block,
  onBlockChange,
  onBlockDelete,
  highlight,
  backgroundColor,
}: TextEditorProps): JSX.Element {
  const toast = useToast();
  const [isToolbarActive, { on: activateToolbar, off: deactivateToolbar }] = useBoolean(false);
  const [settings] = useGeneralSettings();
  const fileType = useMemo(() => fromLanguage(block.language), [block.language]);
  const { onCopy, hasCopied, value, setValue } = useClipboard(block.text);
  const { isOpen: isExportModalOpen, onOpen: onExportOpen, onClose: onExportClose } = useDisclosure();

  useDebounce(
    () => {
      if (value !== block.text) {
        onBlockChange({ ...block, text: value, updatedAt: Date.now() });
      }
    },
    1000,
    [value]
  );

  const handleError = useCallback(
    (error: Error) => {
      console.log({ error });
      toast.closeAll();
      toast({
        title: "Unable to format block",
        description: error.message,
        // <>
        //   <Text>{error.cause.message}</Text>
        //   <Code>
        //     <pre>{error.codeFrame}</pre>
        //   </Code>
        // </>
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    },
    [toast]
  );

  const handleLanguageChange = (language: string): void => {
    onBlockChange({ ...block, language, updatedAt: Date.now() });
  };

  const handleToggleLock = (): void => {
    onBlockChange({ ...block, locked: !(block.locked ?? false) });
  };

  const handleFormat = async (): Promise<void> => {
    const { format } = await import("../models/format");
    const text = await format(
      value,
      fileType.language,
      settings?.formatting?.printWidth,
      settings?.formatting?.tabWidth
    );
    setValue(text);
  };

  const mathEvaluator = useCallback(
    (text: string): MathResults => {
      if (block.language !== "math.js") {
        return {};
      }

      return new Evaluator().evaluate(text);
    },
    [block.language]
  );

  return (
    <Box backgroundColor={backgroundColor} onMouseEnter={activateToolbar} onMouseLeave={deactivateToolbar}>
      <Box position="absolute" right={0} zIndex={99} borderRadius={2} backgroundColor={backgroundColor}>
        <Toolbar
          isActive={isToolbarActive || settings?.showToolbarForEveryBlock}
          language={block.language}
          onChangeLanguage={handleLanguageChange}
          onDelete={(archive: boolean) => {
            onBlockDelete(block.id, archive);
          }}
          hasCopied={hasCopied}
          onCopy={onCopy}
          onExport={onExportOpen}
          onToggleLock={handleToggleLock}
          locked={block.locked}
          canFormat={fileType.canFormat}
          onFormat={() => {
            handleFormat().catch(handleError);
          }}
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
            settings?.showLineNumbers ?? false,
            highlight,
            mathEvaluator(text),
            text,
            fileType.grammar,
            block.language
          )
        }
        padding={5}
        className={clsx("editor", (settings?.showLineNumbers ?? false) && "lineNumbers")}
      />
      {isExportModalOpen && <ExportModal isOpen={isExportModalOpen} block={block} onClose={onExportClose} />}
    </Box>
  );
}
