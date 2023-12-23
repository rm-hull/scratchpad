import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-json";
import "prismjs/components/prism-makefile";
import "prismjs/components/prism-python";
import { type JSX } from "react";
import "prismjs/themes/prism-dark.css";
import Editor from "react-simple-code-editor";
import "./TextEditor.styles.css";

interface TextEditorProps {
  code: string;
  onCodeChange: (code: string) => void;
}

const hightlightWithLineNumbers = (input: string, language: string): JSX.Element =>
  highlight(input, language)
    .split("\n")
    .map((line: string, i: number) => {
      const currentLine = i + 1;
      return (
        <div key={i}>
          <span className="editorLineNumber">{currentLine}</span>
          <span dangerouslySetInnerHTML={{ __html: line }} />
          <br />
        </div>
      );
    });

export default function TextEditor({ code, onCodeChange }: TextEditorProps) {
  return (
    <Editor
      value={code}
      onValueChange={onCodeChange}
      highlight={(code) => hightlightWithLineNumbers(code, languages.python)}
      padding={10}
      textareaId="codeArea"
      className="editor"
    />
  );
}
