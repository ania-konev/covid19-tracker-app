import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SummaryRoutingModule } from './summary-routing.module';
import { CountryPageComponent } from '../country/components/country-page/country-page.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SummaryRoutingModule,
    CountryPageComponent,
    SharedModule,
  ],
})
export class SummaryModule {}
