import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChatsComponent } from './chats.component';

const routes: Routes = [
  { path: 'chats', component: ChatsComponent },
  { path: 'chats/:username', component: ChatsComponent  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatsRoutingModule { }
