import { Component, OnInit } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { expand, concatMap } from 'rxjs/operators';

import { FriendsService } from '../../shared/friends.service';
import { FriendsChatPreview } from '../../model/friends';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  
  friends:Observable<FriendsChatPreview[]>;
  requestTime = 200;

  constructor(
    private friendServ: FriendsService
  ) { }

  ngOnInit() {
    this.friends = this.friendServ.friendsChatPreview().pipe(
      expand((_) => timer(this.requestTime).pipe(
        concatMap((_) => this.friendServ.friendsChatPreview())
      ))
    )
  }

}
