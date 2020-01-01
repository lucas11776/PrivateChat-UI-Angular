import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsComponent } from './settings.component';
import { LoggedinGuard } from '../guard/loggedin.guard';

const routes: Routes = [
  { path: 'settings', component: SettingsComponent, canActivate: [LoggedinGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
