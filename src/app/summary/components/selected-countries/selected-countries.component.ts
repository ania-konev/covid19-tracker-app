import { KeyValue, KeyValuePipe, NgFor } from '@angular/common';
import { Component, Input, OnChanges } from '@angular/core';
import { CovidDataType } from '../summary-page/summary-page.component';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-selected-countries',
  standalone: true,
  imports: [NgFor, KeyValuePipe, SharedModule],
  templateUrl: './selected-countries.component.html',
  styleUrl: './selected-countries.component.scss',
})
export class SelectedCountriesComponent implements OnChanges {
  @Input() covidData: CovidDataType[] = [];
  selectedConfirmedCases: Map<string, number> = new Map();
  selectedConfirmedDeaths: Map<string, number> = new Map();
  selectedConfirmedRecovered: Map<string, number> = new Map();

  orderByValue(
    a: KeyValue<string, number>,
    b: KeyValue<string, number>
  ): number {
    return b.value - a.value;
  }

  ngOnChanges(): void {
    const selectedCountries = ['US', 'Australia', 'Poland', 'Norway', 'China'];

    const increaseNumOfValues = (
      regionName: string,
      valueForRegion: number,
      mapOfValues: Map<string, number>
    ) => {
      const prevValue = mapOfValues.get(regionName);
      const currentValue =
        prevValue === undefined ? valueForRegion : prevValue + valueForRegion;
      mapOfValues.set(regionName, currentValue);
    };
    for (const dataEntry of this.covidData) {
      const regionName = dataEntry.region.name;
      if (selectedCountries.includes(regionName)) {
        increaseNumOfValues(
          regionName,
          dataEntry.confirmed,
          this.selectedConfirmedCases
        );
        increaseNumOfValues(
          regionName,
          dataEntry.deaths,
          this.selectedConfirmedDeaths
        );
        increaseNumOfValues(
          regionName,
          dataEntry.recovered,
          this.selectedConfirmedRecovered
        );
      }
    }
  }
}
