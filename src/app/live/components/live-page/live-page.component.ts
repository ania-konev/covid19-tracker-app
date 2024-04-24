import {
  afterNextRender,
  AfterRenderPhase,
  Component,
  Inject,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import * as Highcharts from 'highcharts/highmaps';
import * as worldMap from '@highcharts/map-collection/custom/world.geo.json';
import { HighchartsChartModule } from 'highcharts-angular';
import { DataService } from '../../../shared/services/data.service';
import {
  CountryDataType,
  createAllCountriesDataMap,
} from '../../../shared/functionAllCountriesData';
import { CovidDataType } from '../../../summary/components/summary-page/summary-page.component';
import { isPlatformBrowser } from '@angular/common';

interface LiveDataType {
  iso: string;
  value: number;
}

@Component({
  selector: 'app-live-page',
  standalone: true,
  imports: [HighchartsChartModule],
  templateUrl: './live-page.component.html',
  styleUrl: './live-page.component.scss',
})
export class LivePageComponent implements OnInit {
  covidData: CovidDataType[] = [];

  allCountriesData: Map<string, CountryDataType> = new Map();
  liveData: LiveDataType[] = [];
  isLoading: boolean = true;

  constructor(
    private dataservice: DataService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    afterNextRender(
      () => {
        this.HighCharts.mapChart('container', this.chartOptions);
      },
      { phase: AfterRenderPhase.Write }
    );
  }

  HighCharts: typeof Highcharts = Highcharts;
  chartConstructor = 'mapChart';

  chartOptions: Highcharts.Options = {
    chart: {
      map: worldMap,
    },
    title: {
      text: 'COVID-19 World Data',
    },
    subtitle: {
      text: 'Confirmed Cases',
    },
    mapNavigation: {
      enabled: true,
      buttonOptions: {
        alignTo: 'spacingBox',
      },
    },
    legend: {
      enabled: true,
    },
    colorAxis: {
      min: 0,
    },
    series: [
      {
        type: 'map',
        name: 'COVID-19 Data',
        states: {
          hover: {
            color: '#dc3545',
          },
        },
        dataLabels: {
          enabled: true,
          format: '{point.name}',
        },
        allAreas: false,
        data: [['by', 45]],
        joinBy: ['iso-a3', 'iso'],
      },
    ],
  };

  ngOnInit(): void {
    this.dataservice
      .getSummaryData()
      .then((result: { data: CovidDataType[] }) => {
        this.covidData = result.data;
        this.allCountriesData = createAllCountriesDataMap(
          this.covidData,
          'iso'
        );
        this.isLoading = false;

        for (let [key, value] of this.allCountriesData) {
          this.liveData.push({ iso: key, value: value.confirmed });
        }

        if (
          this.chartOptions.series !== undefined &&
          this.chartOptions.series?.[0].type === 'map'
        ) {
          (this.chartOptions.series[0] as Highcharts.SeriesMapOptions).data =
            this.liveData;
        } else {
          console.log('Error: chartOptions.series is undefinied');
        }
      })
      .catch((error: Error) => {
        if (isPlatformBrowser(this.platformId)) {
          alert(`Error occured: ${error.message}`);
        }
      });
  }
}
