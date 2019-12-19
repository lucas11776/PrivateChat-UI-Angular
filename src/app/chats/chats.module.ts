import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatsRoutingModule } from './chats-routing.module';
import { ChatsComponent } from './chats.component';
import { ChatWindowComponent } from './chat-window/chat-window.component';
import { FriendsWindowComponent } from './friends-window/friends-window.component';
import { ChatWindowHeaderComponent } from './chat-window-header/chat-window-header.component';
import { PipeModule } from '../pipe/pipe.module';

@NgModule({
  declarations: [
    ChatsComponent,
    ChatWindowComponent,
    FriendsWindowComponent,
    ChatWindowHeaderComponent
  ],
  imports: [
    CommonModule,
    ChatsRoutingModule,
    PipeModule
  ]
})
export class ChatsModule { }
