import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { FriendsRoutingModule } from './friends-routing.module';
import { FriendsComponent } from './friends.component';
import { SearchComponent } from './search/search.component';
import { FriendRequestComponent } from '../template/friend-request/friend-request.component';


@NgModule({
  declarations: [
    FriendsComponent,
    SearchComponent,
    FriendRequestComponent
  ],
  imports: [
    CommonModule,
    FriendsRoutingModule,
    ReactiveFormsModule
  ]
})
export class FriendsModule { }
