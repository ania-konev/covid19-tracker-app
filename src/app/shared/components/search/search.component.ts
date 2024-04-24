import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  searchTerm: string = '';

  @Output() countryToSearch = new EventEmitter<string>();

  search() {
    this.countryToSearch.emit(this.searchTerm);
  }
}
