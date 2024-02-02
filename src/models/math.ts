import { all, bignumber, create, type ConfigOptions, type MathJsInstance } from "mathjs";
import * as R from "ramda";
import { data } from "./exchangeRates";

const isStringEmpty = R.pipe(R.trim, R.isEmpty);

export type MathResults = Record<number, { message: string; error: boolean }>;

export class Evaluator {
  readonly #math: MathJsInstance;

  constructor(config: ConfigOptions = {}) {
    this.#math = create(all, config);
    this.#math.createUnit(data.base);
    data.fx.forEach(({ currency, rate }) => {
      this.#math.createUnit(currency, this.#math.unit(bignumber(1 / parseFloat(rate)), data.base));
    });
  }

  evaluate(input: string): MathResults {
    const parser = this.#math.parser();

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
            message: `${result}` === "[object Object]" ? JSON.stringify(result) : `${result}`,
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
}
