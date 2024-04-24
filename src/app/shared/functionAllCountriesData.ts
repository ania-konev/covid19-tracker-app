import { CovidDataType } from '../summary/components/summary-page/summary-page.component';

export interface CountryDataType {
  confirmed: number;
  deaths: number;
  recovered: number;
}

export function createAllCountriesDataMap(
  covidData: CovidDataType[] = [],
  key: 'name' | 'iso' = 'name'
): Map<string, CountryDataType> {
  const result = new Map();

  for (const dataEntry of covidData) {
    const regionKey = dataEntry.region[key];

    const prevValue = result.get(regionKey);

    const currentValueOfConfirmedCases =
      prevValue === undefined
        ? dataEntry.confirmed
        : prevValue.confirmed + dataEntry.confirmed;

    const currentValueOfDeaths =
      prevValue === undefined
        ? dataEntry.deaths
        : prevValue.deaths + dataEntry.deaths;

    const currentValueOfRecovered =
      prevValue === undefined
        ? dataEntry.recovered
        : prevValue.recovered + dataEntry.recovered;

    result.set(regionKey, {
      confirmed: currentValueOfConfirmedCases,
      deaths: currentValueOfDeaths,
      recovered: currentValueOfRecovered,
    });
  }
  return result;
}
