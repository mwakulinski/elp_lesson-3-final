import { ExchangeRates } from "./types/ExchangeRates";
import fetch from "node-fetch";

export async function getCurrencyData(date: string) {
  const response = await fetch(
    `http://api.nbp.pl/api/exchangerates/rates/a/usd/${date}/?format=json`
  );
  return (await response.json()) as ExchangeRates;
}

export const getCurrencyDifferenceBetweenDates = async (
  date1: string,
  date2: string
) => {
  const data1 = await getCurrencyData(date1);
  const data2 = await getCurrencyData(date2);
  return data1.rates[0].mid - data2.rates[0].mid;
};
