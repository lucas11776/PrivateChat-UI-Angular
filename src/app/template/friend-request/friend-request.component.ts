import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Friend } from '../../model/friends';

@Component({
  selector: 'app-friend-request',
  templateUrl: './friend-request.component.html',
  styleUrls: ['./friend-request.component.css']
})
export class FriendRequestComponent implements OnInit {

  @Input('friend') friend:Friend;
  @Output('accept') acceptRequest = new EventEmitter();
  @Output('decline') declineRequest = new EventEmitter();

  constructor() { }

  ngOnInit() { }
  
  accept() {
    this.acceptRequest.emit(this.friend.username);
  }

  decline() {
    this.declineRequest.emit(this.friend.username);
  }

}
