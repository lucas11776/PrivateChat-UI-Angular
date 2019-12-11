import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './Pages/home/home.component';
import { SidebarComponent } from './template/sidebar/sidebar.component';

const routes: Routes = [
  { path: '', component: SidebarComponent, outlet: 'sidebar' },
  { path: '', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
