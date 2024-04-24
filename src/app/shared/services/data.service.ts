import { Injectable } from '@angular/core';
import { CacheService } from './cache.service';
import { CovidDataType } from '../../summary/components/summary-page/summary-page.component';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private cacheService: CacheService) {}

  getSummaryData(): Promise<{ data: CovidDataType[] }> {
    const cacheData = this.cacheService.get('summaryData');
    if (cacheData === undefined) {
      const fetchData = fetch('https://covid-api.com/api/reports');
      const result = fetchData.then((response: Response) => response.json());
      return result.then((jsonData) =>
        this.cacheService.set('summaryData', jsonData)
      );
    } else {
      return Promise.resolve(cacheData);
    }
  }
}
