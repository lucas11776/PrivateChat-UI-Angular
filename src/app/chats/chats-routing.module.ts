import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoggedinGuard } from '../guard/loggedin.guard';
import { ChatsComponent } from './chats.component';
import { ChatWindowComponent } from './chat-window/chat-window.component';

const routes: Routes = [
  { path: 'chats', component: ChatsComponent, canActivate: [LoggedinGuard] },
  { path: 'chats/:username', component: ChatWindowComponent, canActivate: [LoggedinGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatsRoutingModule { }
