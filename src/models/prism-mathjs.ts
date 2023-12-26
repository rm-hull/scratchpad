import Prism from "prismjs";
import * as math from "mathjs";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getAllFunctionNames(obj: any, currentPath: string = ""): string[] {
  let functionNames: string[] = [];

  for (const key in obj) {
    const fullPath = currentPath !== "" ? `${currentPath}.${key}` : key;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const value = obj[key];

    if (typeof value === "function") {
      functionNames.push(fullPath);
    } else if (typeof value === "object") {
      const nestedFunctionNames = getAllFunctionNames(value, fullPath);
      functionNames = functionNames.concat(nestedFunctionNames);
    }
  }

  return functionNames;
}

const mathFn = getAllFunctionNames(math).filter(
  (name) => !name.includes(".") && name.charAt(0) >= "a" && name.charAt(0) <= "z"
);

function createRegex(...operators: string[]): RegExp {
  // Escape special characters in the operators and join them with '|'
  const escapedOperators = operators.map((operator) => operator.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|");
  const regexPattern = `(${escapedOperators})`;
  return new RegExp(regexPattern);
}

Prism.languages.mathjs = {
  comment: /#.*/,
  number: /-?\b\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/i,
  hex: {
    pattern: /-?0x[0-9a-fA-F]+\b/,
    alias: "number",
  },
  octal: {
    pattern: /-?0o[0-7]+\b/,
    alias: "number",
  },
  binary: {
    pattern: /-?0b[01]+\b/,
    alias: "number",
  },

  boolean: /\b(?:false|true)\b/,
  string: {
    pattern: /(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?!\s*:)/,
    lookbehind: true,
    greedy: true,
  },
  null: {
    pattern: /\bnull\b/,
    alias: "keyword",
  },
  keyword: createRegex(...mathFn),
  operator: createRegex(
    "+",
    "-",
    "/",
    "*",
    "=",
    "==",
    "===",
    "!=",
    "!==",
    ">",
    ">=",
    "<",
    "<=",
    "^",
    "and",
    "or",
    "not",
    "!",
    "mod"
  ),
};
