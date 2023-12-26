import euroFX from "../generated/data/exchange-rates.json";

interface ExchangeRate {
  currency: string;
  rate: string;
}

export interface EuroFX {
  url: string;
  sender: string;
  subject: string;
  date: string;
  base: "EUR";
  fx: ExchangeRate[];
}

export const data = euroFX as EuroFX;
