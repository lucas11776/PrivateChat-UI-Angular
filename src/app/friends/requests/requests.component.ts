import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { FriendsService } from '../../shared/friends.service';
import { FriendRequest } from '../../model/friends';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {

  friendsRequests:Observable<FriendRequest[]>;

  constructor(
    private friendsServ: FriendsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.friendsRequests = this.friendsServ.friendsRequests();
  }

}
