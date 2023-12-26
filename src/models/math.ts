import { all, create, type ConfigOptions, type MathJsInstance } from "mathjs";
import * as R from "ramda";
import { data } from "./exchangeRates";

function init(config: ConfigOptions = {}): MathJsInstance {
  const math = create(all, config);
  math.createUnit(data.base);
  data.fx.forEach(({ currency, rate }) => {
    math.createUnit(currency, math.unit(1 / parseFloat(rate), data.base));
  });
  return math;
}

function getMaxLineLength(input: string): number {
  const lines = input.split("\n");
  const maxLineLength = Math.max(...lines.map((line) => line.length));
  return maxLineLength;
}

function padString(input: string, length: number, paddingChar: string = " "): string {
  const currentLength = input.length;

  if (currentLength >= length) {
    return input;
  }

  const paddingLength = length - currentLength;
  const padding = paddingChar.repeat(paddingLength);

  return input + padding;
}

const isStringEmpty = R.pipe(R.trim, R.isEmpty);

export function augmentResult(input: string, language: string): string {
  if (language === "math.js") {
    const parser = math.parser();
    const maxLineLength = getMaxLineLength(input);

    return input
      .split("\n")
      .map((line) => {
        try {
          if (isStringEmpty(line)) {
            return line;
          }

          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          const result = parser.evaluate(line);
          if (result === undefined || typeof result === "function") {
            return line;
          }
          return `${padString(line, maxLineLength)}   # ${result}`;
        } catch (err) {
          return `${padString(line, maxLineLength)}   # ${(err as Error).message}`;
        }
      })
      .join("\n");
  }

  return input;
}

export const math = init();
