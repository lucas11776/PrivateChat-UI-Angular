import { Component, OnInit, Input } from '@angular/core';

import { Friend } from '../../model/friends';

@Component({
  selector: 'app-friend-request',
  templateUrl: './friend-request.component.html',
  styleUrls: ['./friend-request.component.css']
})
export class FriendRequestComponent implements OnInit {

  @Input('friend') friend:Friend;

  constructor() { }

  ngOnInit() {
  }

  confirm() {

  }

  request() {
    
  }

}
