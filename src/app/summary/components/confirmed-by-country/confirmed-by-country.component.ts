import { Component, EventEmitter, Output } from '@angular/core';
import { SearchComponent } from '../../../shared/components/search/search.component';

@Component({
  selector: 'app-confirmed-by-country',
  standalone: true,
  imports: [SearchComponent],
  templateUrl: './confirmed-by-country.component.html',
  styleUrl: './confirmed-by-country.component.scss',
})
export class ConfirmedByCountryComponent {
  @Output() country = new EventEmitter<string>();

  passCountryData(searchTerm: string) {
    this.country.emit(searchTerm);
  }
}
