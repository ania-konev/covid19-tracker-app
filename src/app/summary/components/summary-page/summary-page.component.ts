import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { DataService } from '../../../shared/services/data.service';
import { SummaryCardsComponent } from '../summary-cards/summary-cards.component';
import { SelectedCountriesComponent } from '../selected-countries/selected-countries.component';
import { ConfirmedByCountryComponent } from '../confirmed-by-country/confirmed-by-country.component';
import { CountryChartComponent } from '../country-chart/country-chart.component';
import { DataTableComponent } from '../../../country/components/data-table/data-table.component';
import {
  CountryDataType,
  createAllCountriesDataMap,
} from '../../../shared/functionAllCountriesData';
import { isPlatformBrowser } from '@angular/common';

export interface CovidDataType {
  confirmed: number;
  deaths: number;
  recovered: number;
  region: { iso: string; name: string };
}

@Component({
  selector: 'app-summary-page',
  standalone: true,
  imports: [
    SummaryCardsComponent,
    SelectedCountriesComponent,
    ConfirmedByCountryComponent,
    CountryChartComponent,
    DataTableComponent,
  ],
  templateUrl: './summary-page.component.html',
  styleUrl: './summary-page.component.scss',
})
export class SummaryPageComponent implements OnInit {
  covidData: CovidDataType[] = [];

  countryToSearch: string = '';
  allCountriesData: Map<string, CountryDataType> = new Map();

  isLoading: boolean = true;

  constructor(
    private dataService: DataService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.dataService
      .getSummaryData()
      .then((result: { data: CovidDataType[] }) => {
        this.covidData = result.data;
        this.allCountriesData = createAllCountriesDataMap(this.covidData);
        this.isLoading = false;
      })
      .catch((error: Error) => {
        if (isPlatformBrowser(this.platformId)) {
          alert(`Error occured: ${error.message}`);
        }
      });
  }

  searchCountry(searchTerm: string) {
    this.countryToSearch = searchTerm;
  }
}
