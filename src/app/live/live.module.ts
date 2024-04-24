import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LiveRoutingModule } from './live-routing.module';
import { HighchartsChartModule } from 'highcharts-angular';

@NgModule({
  declarations: [],
  imports: [CommonModule, LiveRoutingModule, HighchartsChartModule],
})
export class LiveModule {}
