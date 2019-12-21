import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { concatMap, map } from 'rxjs/operators';

import { ChatsService } from '../../shared/chats.service';
import { Chat } from '../../model/chats';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css']
})
export class ChatWindowComponent implements OnInit, OnDestroy {

  user:string
  friend:string
  total:number;
  subscription:Subscription;
  chats:Chat[] = [];
  limit = 30;
  requestTime = 500; // 500ms

  /**
   * Listen to route change and call ngOnInit to initialize new data
   * 
   * @param chatServ ChatsService
   * @param activatedRoute ActivatedRoute
   * @param router Router
   */
  constructor(
    private chatServ: ChatsService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    // listen end of router change event (initialize data)
    this.router.events.subscribe((event:NavigationEnd) => {
      if(event instanceof NavigationEnd) {
        this.ngOnInit();
      }
    });
  }

  /**
   * Get lastest chats between user and friend
   */
  ngOnInit() {
    this.subscription = this.chatServ.chats(this.activatedRoute.snapshot.params.username, this.limit, 0).pipe(
      map((response) => {
        this.friend = response.friend;
        this.user = response.user;
        this.total = response.total;
        return response.chats;
      })
      
    )
    .subscribe(
        (response) => {
          //console.log(response);
          this.chats = response;
        }
    )
  }

  /**
   * Merge chats in `this.chats` in front 
   * 
   * @example
   * `this.chats` + Chat[]`
   * 
   * @param chats `Chat[]`
   */
  addChatsFront(chats:Chat[]) {
    //console.log();
  }

  /**
   * Merge chats in `this.chats` in front 
   * 
   * @example
   * `Chat[]` + `this.chats`
   * 
   * @param chats `Chat[]`
   */
  addChatsBack(chats:Chat[]) {

  }

  /**
   * Get new data if friend as been click
   * 
   * @param $event 
   */
  newChatWindow($event:string) {
    if(this.friend != $event) {
      this.ngOnInit();
    }
  } 

  ngOnDestroy() {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
