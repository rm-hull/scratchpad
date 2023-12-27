import { languages, type Grammar } from "prismjs";

import "prismjs/components/prism-bash";
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
}

export const supportedTypes: readonly FileType[] = [
  { language: "bash", descr: "Bash", grammar: languages.bash },
  { language: "css", descr: "CSS", grammar: languages.css },
  { language: "csv", descr: "CSV", grammar: languages.csv },
  { language: "html", descr: "HTML", grammar: languages.html },
  { language: "http", descr: "HTTP", grammar: languages.http },
  { language: "javascript", descr: "Javascript", grammar: languages.javascript },
  { language: "json", descr: "JSON", grammar: languages.json },
  { language: "log", descr: "Logs", grammar: languages.log },
  { language: "markdown", descr: "Markdown", grammar: languages.markdown },
  { language: "math.js", descr: "Math.JS", grammar: languages.mathjs },
  { language: "properties", descr: "Properties", grammar: languages.properties },
  { language: "python", descr: "Python", grammar: languages.python },
  { language: "sql", descr: "SQL", grammar: languages.sql },
  { language: "regex", descr: "Regex", grammar: languages.regex },
  { language: "shell-session", descr: "Shell", grammar: languages["shell-session"] },
  { language: "text", descr: "Text", grammar: languages.text },
  { language: "typescript", descr: "Typescript", grammar: languages.typescript },
  { language: "yaml", descr: "YAML", grammar: languages.yaml },
];

export function fromLanguage(language: string = "text"): FileType {
  const fileType = supportedTypes.find((fileType) => fileType.language === language);

  if (fileType === undefined) {
    throw Error(`Unsupported language: ${language}`);
  }

  return fileType;
}
