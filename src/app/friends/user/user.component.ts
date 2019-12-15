import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, timer } from 'rxjs';
import { expand, concatMap } from 'rxjs/operators';

import { FriendsService } from '../../shared/friends.service';
import { FriendMessageCout } from '../../model/friends';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  friends$: Observable<FriendMessageCout[]>;
  requestTime = 3000;
  search:string;

  constructor(
    private friendServ: FriendsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.friends$ = this.friendServ.friends().pipe(
      expand((_) => timer(this.requestTime).pipe(
        concatMap((_) => this.friendServ.friends())
      ))
    )
  }

  openChat(username:string) {
    this.router.navigate(['chats', username])
  }

}
