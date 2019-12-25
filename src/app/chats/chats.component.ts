import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, timer } from 'rxjs';
import { expand, concatMap, map } from 'rxjs/operators';

import { FriendsService } from '../shared/friends.service';
import { FriendsChatPreview } from '../model/friends';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css']
})
export class ChatsComponent implements OnInit {

  friends: Observable<FriendsChatPreview[]>
  requestTime = 1000;
  search:string = '';

  constructor(
    private friendServ: FriendsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.friends = this.friendServ.friendsChatPreview().pipe(
      map(event => {
        console.log(this.activatedRoute.snapshot.params);
        return event;
      }),
      expand((_) => timer(this.requestTime).pipe(
        concatMap((_) => this.friendServ.friendsChatPreview())
      ))
    )
  }

}
