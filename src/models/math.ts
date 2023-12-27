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

const isStringEmpty = R.pipe(R.trim, R.isEmpty);

export type MathResults = Record<number, { message: string; error: boolean }>;

export function evaluate(input: string): MathResults {
  const parser = math.parser();

  return input.split("\n").reduce((accum, line, index) => {
    try {
      if (isStringEmpty(line)) {
        return accum;
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const result = parser.evaluate(line);
      if (result === undefined || typeof result === "function") {
        return accum;
      }
      return {
        ...accum,
        [index]: {
          message: `${result}`,
          error: false,
        },
      };
    } catch (err) {
      return {
        ...accum,
        [index]: {
          message: (err as Error).message,
          error: true,
        },
      };
    }
  }, {});
}

export const math = init();
