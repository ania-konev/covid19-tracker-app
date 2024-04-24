import {
  Component,
  Inject,
  Input,
  OnChanges,
  PLATFORM_ID,
} from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { CountryDataType } from '../../../shared/functionAllCountriesData';
import { isPlatformBrowser, NgIf } from '@angular/common';

@Component({
  selector: 'app-country-chart',
  standalone: true,
  imports: [BaseChartDirective, NgIf],
  templateUrl: './country-chart.component.html',
  styleUrl: './country-chart.component.scss',
})
export class CountryChartComponent implements OnChanges {
  constructor(@Inject(PLATFORM_ID) private platformId: string) {}

  get isBrowserOnly(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  @Input() country: string = '';
  @Input() allCountriesData: Map<string, CountryDataType> = new Map();

  barChartData: ChartDataset[] = [
    {
      data: [],
      label: 'Total Cases',
    },
  ];

  barChartLabels: string[] = [];

  barChartOptions: ChartOptions = {
    responsive: true,
  };

  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  ngOnChanges(): void {
    this.getCountryDataConfirmed();
  }

  getCountryDataConfirmed() {
    const selectedCountryData = this.allCountriesData.get(this.country);

    if (selectedCountryData === undefined) return;
    this.barChartData[0].data = [
      selectedCountryData.confirmed,
      selectedCountryData.deaths,
      selectedCountryData.recovered,
    ];
    this.barChartLabels = ['Confirmed', 'Deaths', 'Recovered'];
  }
}
