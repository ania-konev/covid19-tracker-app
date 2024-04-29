import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { SummaryModule } from './summary/summary.module';
import { CountryModule } from './country/country.module';
import { WorldMapModule } from './live/world-map.module';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    SharedModule,
    SummaryModule,
    CountryModule,
    WorldMapModule,
    BaseChartDirective,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'covid-tracker-app';
}
