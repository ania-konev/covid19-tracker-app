import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { SearchComponent } from '../../../shared/components/search/search.component';
import { DataTableComponent } from '../data-table/data-table.component';
import { DataService } from '../../../shared/services/data.service';
import { SearchService } from '../../../shared/services/search.service';
import { CovidDataType } from '../../../summary/components/summary-page/summary-page.component';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-country-page',
  standalone: true,
  imports: [SearchComponent, DataTableComponent],
  templateUrl: './country-page.component.html',
  styleUrl: './country-page.component.scss',
})
export class CountryPageComponent implements OnInit {
  covidData: CovidDataType[] = [];
  countries: string[] = [];
  isLoading: boolean = true;

  constructor(
    private dataservice: DataService,
    private searchService: SearchService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.dataservice
      .getSummaryData()
      .then((result: { data: CovidDataType[] }) => {
        this.covidData = result.data;
        this.isLoading = false;
      })
      .catch((error: Error) => {
        if (isPlatformBrowser(this.platformId)) {
          alert(`Error occured: ${error.message}`);
        }
      });
  }

  searchCountry(country: string) {
    for (const dataEntry of this.covidData) {
      if (this.countries.includes(dataEntry.region.name)) {
        continue;
      } else {
        this.countries.push(dataEntry.region.name);
      }
    }

    const countriesFilter = this.countries.filter((c: string) =>
      c.toLowerCase().includes(country.toLowerCase())
    );

    this.searchService.setCountries(countriesFilter);
  }
}
