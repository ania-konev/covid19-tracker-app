import { KeyValuePipe, NgFor } from '@angular/common';
import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { SearchService } from '../../../shared/services/search.service';
import { Subscription } from 'rxjs';
import {
  CountryDataType,
  createAllCountriesDataMap,
} from '../../../shared/functionAllCountriesData';
import { CovidDataType } from '../../../summary/components/summary-page/summary-page.component';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [KeyValuePipe, NgFor, SharedModule],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.scss',
})
export class DataTableComponent implements OnInit, OnChanges, OnDestroy {
  @Input() covidData: CovidDataType[] = [];
  allCountriesData: Map<string, CountryDataType> = new Map();
  countryTotalTable: Map<string, CountryDataType> = new Map();
  subscription = new Subscription();

  constructor(private searchService: SearchService) {}

  ngOnInit(): void {
    this.subscription = this.searchService
      .getCountries()
      .subscribe((data: string[]) => {
        this.countryTotalTable = this.allCountriesData;
        const allCountries = Array(...this.countryTotalTable.entries());
        const foundSuitableCountries = allCountries.filter((entry) =>
          data.includes(entry[0])
        );
        this.countryTotalTable = new Map(foundSuitableCountries);
      });
  }

  ngOnChanges(): void {
    this.allCountriesData = createAllCountriesDataMap(this.covidData);
    this.countryTotalTable = this.allCountriesData;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
