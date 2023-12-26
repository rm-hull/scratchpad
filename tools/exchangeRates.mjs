import axios from "axios";
import xml2js from "xml2js";
import * as R from "ramda";
import fs from "fs";
import chalk from "chalk";

const fsp = fs.promises;

async function fetchEuroRates() {
  const url = "https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml";
  console.log(`${chalk.grey("Fetching:")} ${chalk.blue.underline.bold(url)}`);

  const resp = await axios.get(url);
  const data = await xml2js.parseStringPromise(resp.data, {});

  return {
    url,
    sender: R.path(["gesmes:Envelope", "gesmes:Sender", 0, "gesmes:name", 0], data),
    subject: R.path(["gesmes:Envelope", "gesmes:subject", 0], data),
    date: R.path(["gesmes:Envelope", "Cube", 0, "Cube", 0, "$", "time"], data),
    base: "EUR",
    fx: R.path(["gesmes:Envelope", "Cube", 0, "Cube", 0, "Cube"], data).map(R.path("$")),
  };
}

async function process() {
  const rates = await fetchEuroRates();
  await fsp.mkdir(`./src/generated/data`, { recursive: true });
  await fsp.writeFile(`./src/generated/data/exchange-rates.json`, Buffer.from(JSON.stringify(rates, null, 2)));
}

process().catch(console.error);
