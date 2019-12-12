import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchComponent } from './search/search.component';
import { UserComponent } from './user/user.component';
import { RequestsComponent } from './requests/requests.component';

const routes: Routes = [
  { path: 'search', component: SearchComponent },
  { path: 'friends', component: UserComponent },
  { path: 'requests', component:  RequestsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FriendsRoutingModule { }
