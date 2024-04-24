import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'summary',
    pathMatch: 'full',
  },
  {
    path: 'summary',
    loadChildren: () =>
      import('./summary/summary.module').then((module) => module.SummaryModule),
  },
  {
    path: 'country',
    loadChildren: () =>
      import('./country/country.module').then((module) => module.CountryModule),
  },
  {
    path: 'live',
    loadChildren: () =>
      import('./live/live.module').then((module) => module.LiveModule),
  },
];
