import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './Pages/home/home.component';
import { SidebarComponent } from './template/sidebar/sidebar.component';

const routes: Routes = [
  { path: '', component: SidebarComponent, outlet: 'sidebar' },
  { path: '', component: HomeComponent },
  { path: 'chats', loadChildren: () => import('./chats/chats.module').then(m => m.ChatsModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
