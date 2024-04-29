import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorldMapPageComponent } from './components/world-map/world-map.component';

const routes: Routes = [
  {
    path: '',
    component: WorldMapPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorldMapRoutingModule {}
