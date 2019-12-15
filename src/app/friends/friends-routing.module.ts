import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoggedinGuard } from '../guard/loggedin.guard';
import { SearchComponent } from './search/search.component';
import { UserComponent } from './user/user.component';
import { RequestsComponent } from './requests/requests.component';

const routes: Routes = [
  { path: 'search', component: SearchComponent, canActivate: [LoggedinGuard] },
  { path: 'friends', component: UserComponent, canActivate: [LoggedinGuard] },
  { path: 'requests', component:  RequestsComponent, canActivate: [LoggedinGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FriendsRoutingModule { }
