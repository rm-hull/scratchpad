import { languages, type Grammar } from "prismjs";

import "prismjs/components/prism-bash";
import "prismjs/components/prism-css";
import "prismjs/components/prism-csv";
import "prismjs/components/prism-http";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-json";
import "prismjs/components/prism-log";
import "prismjs/components/prism-markdown";
import "prismjs/components/prism-properties";
import "prismjs/components/prism-python";
import "prismjs/components/prism-regex";
import "prismjs/components/prism-shell-session";
import "prismjs/components/prism-sql";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-yaml";
import "./prism-mathjs";

export interface FileType {
  language: string;
  descr: string;
  grammar: Grammar;
  canFormat: boolean;
}

export const supportedTypes: readonly FileType[] = [
  { language: "bash", descr: "Bash", grammar: languages.bash, canFormat: false },
  { language: "css", descr: "CSS", grammar: languages.css, canFormat: true },
  { language: "csv", descr: "CSV", grammar: languages.csv, canFormat: false },
  { language: "html", descr: "HTML", grammar: languages.html, canFormat: true },
  { language: "http", descr: "HTTP", grammar: languages.http, canFormat: false },
  { language: "javascript", descr: "Javascript", grammar: languages.javascript, canFormat: true },
  { language: "json", descr: "JSON", grammar: languages.json, canFormat: true },
  { language: "log", descr: "Logs", grammar: languages.log, canFormat: false },
  { language: "markdown", descr: "Markdown", grammar: languages.markdown, canFormat: false },
  { language: "math.js", descr: "Math.JS", grammar: languages.mathjs, canFormat: false },
  { language: "properties", descr: "Properties", grammar: languages.properties, canFormat: true },
  { language: "python", descr: "Python", grammar: languages.python, canFormat: false },
  { language: "sql", descr: "SQL", grammar: languages.sql, canFormat: false },
  { language: "regex", descr: "Regex", grammar: languages.regex, canFormat: false },
  { language: "shell-session", descr: "Shell", grammar: languages["shell-session"], canFormat: false },
  { language: "text", descr: "Text", grammar: languages.text, canFormat: false },
  { language: "typescript", descr: "Typescript", grammar: languages.typescript, canFormat: true },
  { language: "yaml", descr: "YAML", grammar: languages.yaml, canFormat: true },
];

export function fromLanguage(language: string = "text"): FileType {
  const fileType = supportedTypes.find((fileType) => fileType.language === language);

  if (fileType === undefined) {
    throw Error(`Unsupported language: ${language}`);
  }

  return fileType;
}
