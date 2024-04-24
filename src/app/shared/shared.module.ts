import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopbarComponent } from './components/topbar/topbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { SearchComponent } from './components/search/search.component';
import { DotNumberPipe } from './pipe';

@NgModule({
  declarations: [SidebarComponent, TopbarComponent, DotNumberPipe],
  imports: [CommonModule, RouterModule, SearchComponent],
  exports: [SidebarComponent, TopbarComponent, SearchComponent, DotNumberPipe],
})
export class SharedModule {}
