import { NgModule } from '@angular/core';
import { CommonModule, KeyValuePipe, NgFor } from '@angular/common';
import { CountryRoutingModule } from './country-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CountryPageComponent } from './components/country-page/country-page.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CountryRoutingModule,
    SharedModule,
    CountryPageComponent,
  ],
})
export class CountryModule {}
