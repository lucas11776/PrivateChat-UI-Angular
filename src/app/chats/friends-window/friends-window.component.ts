import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, timer } from 'rxjs';
import { expand, concatMap, map } from 'rxjs/operators';

import { FriendsService } from '../../shared/friends.service';
import { FriendsChatPreview } from '../../model/friends';
import { DateService } from '../../shared/date.service';

@Component({
  selector: 'app-friends-window',
  templateUrl: './friends-window.component.html',
  styleUrls: ['./friends-window.component.css']
})
export class FriendsWindowComponent implements OnInit {

  @Output('open') open = new EventEmitter();
  @Input('active') active:string;
  friends: Observable<FriendsChatPreview[]>
  requestTime = 2500;

  constructor(
    private friendServ: FriendsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private date: DateService
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

  /**
   * Check if timestamp should be consider to be online
   * 
   * @param timestamp friend `timestamp`
   */
  userOnline(timestamp:number) {
    return this.date.online(timestamp);
  }
  

  /**
   * Redirect user chats route(window)
   * 
   * @param username 
   */
  openChat(username:string) {
    this.router.navigate(['chats', username]);
    this.open.emit(username);
  } 

}
