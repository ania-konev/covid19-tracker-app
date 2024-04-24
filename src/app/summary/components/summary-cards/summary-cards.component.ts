import { Component, Input, OnChanges } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faHeart,
  faSquareCheck,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { CovidDataType } from '../summary-page/summary-page.component';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-summary-cards',
  standalone: true,
  imports: [FontAwesomeModule, SharedModule],
  templateUrl: './summary-cards.component.html',
  styleUrl: './summary-cards.component.scss',
})
export class SummaryCardsComponent implements OnChanges {
  faHeart = faHeart;
  faXmark = faXmark;
  faCheck = faSquareCheck;
  totalConfirmed: number = 0;
  totalDeaths: number = 0;
  totalRecovered: number = 0;
  @Input() covidData: CovidDataType[] = [];

  ngOnChanges(): void {
    for (const i of this.covidData) {
      this.totalConfirmed += i.confirmed;
      this.totalDeaths += i.deaths;
      this.totalRecovered += i.recovered;
    }
  }
}
