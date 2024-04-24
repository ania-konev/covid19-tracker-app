import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  countries = new Subject<string[]>();

  setCountries(countries: string[]) {
    this.countries.next(countries);
  }

  getCountries(): Observable<string[]> {
    return this.countries.asObservable();
  }
}
