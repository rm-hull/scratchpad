import { languages, type Grammar } from "prismjs";

import "prismjs/components/prism-bash";
import "prismjs/components/prism-css";
import "prismjs/components/prism-csv";
import "prismjs/components/prism-http";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-json";
import "prismjs/components/prism-json5";
import "prismjs/components/prism-go";
import "prismjs/components/prism-log";
import "prismjs/components/prism-markdown";
import "prismjs/components/prism-markup";
import "prismjs/components/prism-properties";
import "prismjs/components/prism-python";
import "prismjs/components/prism-regex";
import "prismjs/components/prism-shell-session";
import "prismjs/components/prism-sql";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-yaml";
import "./prism-mathjs";
import "./prism-jwt";

export interface FileType {
  language: string;
  descr: string;
  grammar: Grammar;
  canFormat: boolean;
  mimeType?: string;
  extensions?: string[];
}

export const supportedTypes: readonly FileType[] = [
  {
    language: "bash",
    descr: "Bash",
    grammar: languages.bash,
    canFormat: false,
    mimeType: "application/sh",
    extensions: [".sh", ".bash"],
  },
  {
    language: "css",
    descr: "CSS",
    grammar: languages.css,
    canFormat: true,
    mimeType: "text/css",
    extensions: [".css"],
  },
  {
    language: "csv",
    descr: "CSV",
    grammar: languages.csv,
    canFormat: false,
    mimeType: "text/csv",
    extensions: [".csv"],
  },
  {
    language: "html",
    descr: "HTML",
    grammar: languages.html,
    canFormat: true,
    mimeType: "text/html",
    extensions: [".html"],
  },
  { language: "http", descr: "HTTP", grammar: languages.http, canFormat: false },
  { language: "go", descr: "Go", grammar: languages.go, canFormat: false },
  {
    language: "javascript",
    descr: "Javascript",
    grammar: languages.javascript,
    canFormat: true,
    mimeType: "application/js",
    extensions: [".mjs", ".cjs", ".js", ".jsx"],
  },
  {
    language: "json",
    descr: "JSON",
    grammar: languages.json5,
    canFormat: true,
    mimeType: "application/json",
    extensions: [".json"],
  },
  {
    language: "jwt",
    descr: "JWT",
    grammar: languages.jwt,
    canFormat: false,
  },
  {
    language: "log",
    descr: "Logs",
    grammar: languages.log,
    canFormat: false,
    mimeType: "text/plain",
    extensions: [".log"],
  },
  {
    language: "markdown",
    descr: "Markdown",
    grammar: languages.markdown,
    canFormat: true,
    mimeType: "text/plain",
    extensions: [".md"],
  },
  { language: "math.js", descr: "Math.JS", grammar: languages.mathjs, canFormat: false },
  {
    language: "properties",
    descr: "Properties",
    grammar: languages.properties,
    canFormat: true,
    mimeType: "text/plain",
    extensions: [".properties"],
  },
  {
    language: "python",
    descr: "Python",
    grammar: languages.python,
    canFormat: false,
    mimeType: "text/plain",
    extensions: [".py"],
  },
  {
    language: "sql",
    descr: "SQL",
    grammar: languages.sql,
    canFormat: false,
    mimeType: "text/plain",
    extensions: [".sql"],
  },
  { language: "regex", descr: "Regex", grammar: languages.regex, canFormat: false },
  {
    language: "shell-session",
    descr: "Shell",
    grammar: languages["shell-session"],
    canFormat: false,
  },
  {
    language: "text",
    descr: "Text",
    grammar: languages.text,
    canFormat: false,
    mimeType: "text/plain",
    extensions: [".txt"],
  },
  {
    language: "typescript",
    descr: "Typescript",
    grammar: languages.typescript,
    canFormat: true,
    mimeType: "application/js",
    extensions: [".ts", ".tsx"],
  },
  {
    language: "yaml",
    descr: "YAML",
    grammar: languages.yaml,
    canFormat: true,
    mimeType: "application/yaml",
    extensions: [".yml", ".yaml"],
  },
  {
    language: "xml",
    descr: "XML",
    grammar: languages.xml,
    canFormat: false,
    mimeType: "application/xml",
    extensions: [".xml"],
  },
];

export function fromLanguage(language: string = "text"): FileType {
  const fileType = supportedTypes.find((fileType) => fileType.language === language);

  if (fileType === undefined) {
    console.error(`Unsupported language: ${language}`);
    return fromLanguage("text");
  }

  return fileType;
}

export function fromFilename(filename: string): FileType {
  const fileType = supportedTypes.find((fileType) =>
    (fileType?.extensions ?? []).some((ext) => filename.endsWith(ext))
  );

  if (fileType === undefined) {
    console.error(`Unsupported file type: ${filename}`);
    return fromLanguage("text");
  }

  return fileType;
}
