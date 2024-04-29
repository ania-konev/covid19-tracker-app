import {
  Component,
  Inject,
  OnInit,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { DataService } from '../../../shared/services/data.service';
import {
  CountryDataType,
  createAllCountriesDataMap,
} from '../../../shared/functionAllCountriesData';
import { CovidDataType } from '../../../summary/components/summary-page/summary-page.component';
import { isPlatformBrowser } from '@angular/common';
import * as Plot from '@observablehq/plot';
import * as topojson from 'topojson-client';
import { Topology, GeometryObject } from 'topojson-specification';
import countries50m from 'world-atlas/countries-50m.json'; //it indicates where is each country in the world map
import convertCountries from 'i18n-iso-countries';

interface WorldMapDataType {
  name: string;
  value: number;
}

@Component({
  selector: 'app-world-map',
  standalone: true,
  imports: [],
  templateUrl: './world-map.component.html',
  styleUrl: './world-map.component.scss',
})
export class WorldMapPageComponent implements OnInit {
  covidData: CovidDataType[] = [];

  allCountriesData: Map<string, CountryDataType> = new Map();
  worldMapData: WorldMapDataType[] = [];
  isLoading: boolean = true;
  @ViewChild('mychart') mychart!: { nativeElement: HTMLCanvasElement };

  constructor(
    private dataservice: DataService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

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
        const topoCountries = topojson.feature(
          countries50m as unknown as Topology,
          countries50m.objects
            .countries as GeometryObject<GeoJSON.GeoJsonProperties>
        );
        const plot = Plot.plot({
          projection: 'equal-earth',
          width: 928,
          height: 928 / 2,
          color: {
            scheme: 'YlGnBu',
            unknown: '#ccc',
            label: 'Confirmed cases',
            legend: false,
          },
          marks: [
            Plot.sphere({ fill: 'white', stroke: 'currentColor' }),
            Plot.geo(topoCountries, {
              fill: (country) => {
                const convertId = convertCountries.numericToAlpha3(country.id);

                return this.allCountriesData.get(convertId!)?.confirmed;
              },
            }),

            Plot.tip(
              (topoCountries as GeoJSON.FeatureCollection).features,
              Plot.pointer(Plot.centroid({ title: (d) => d.properties.name }))
            ),
          ],
        });

        this.mychart.nativeElement.append(
          plot.legend('color', { width: 320 }) as HTMLElement,
          plot
        );
      })
      .catch((error: Error) => {
        if (isPlatformBrowser(this.platformId)) {
          alert(`Error occured: ${error.message}`);
        }
      });
  }
}
