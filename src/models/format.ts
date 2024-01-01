import babel from "prettier/plugins/babel";
import estree from "prettier/plugins/estree";
import html from "prettier/plugins/html";
import markdown from "prettier/plugins/markdown";
import typescript from "prettier/plugins/typescript";
import yaml from "prettier/plugins/yaml";
import * as prettier from "prettier/standalone";

export async function format(text: string, language: string): Promise<string> {
  return await prettier.format(text, {
    parser: language,
    filepath: language,
    plugins: [babel, estree, html, markdown, typescript, yaml],
  });
}
