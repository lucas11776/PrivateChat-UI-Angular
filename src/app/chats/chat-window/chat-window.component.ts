import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Observable, Subscription, timer } from 'rxjs';
import { concatMap, map, expand } from 'rxjs/operators';

import { ChatsService } from '../../shared/chats.service';
import { Chat, ChatsResponse } from '../../model/chats';

declare var $ : any;

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
  firstRequest = true;

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
    this.router.events.subscribe((event) => {
      if(event instanceof NavigationStart) {
        this.ngOnDestroy();
      }
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
        this.loadChatDetails(response);
        return [];
      }),
      expand((_) => timer(500).pipe(
        concatMap((_) => {
          var last_chat_id = this.chats.length != 0 ? this.chats[this.chats.length-1].chat_id : 0;
          return this.chatServ.newChats(this.activatedRoute.snapshot.params.username, last_chat_id).pipe(
            map((response) => {
              this.loadChatDetails(response);
              if(this.getLastChatId(this.chats) != this.getLastChatId(response.chats)) {
                this.addChatsFront(response.chats);
              }
              return response.chats;
            })
          )
        })
      ))
    )
    .subscribe(
        (response) => { }
    )
  }

  getLastChatId(chats:Chat[]) {
    var chat_id:number = null;
    if(chats.length > 0) {
      chat_id = chats[chats.length-1].chat_id;
    }
    return chat_id;
  }

  loadChatDetails(response: ChatsResponse) {
    this.friend = response.friend;
    this.user = response.user;
    this.total = response.total;
  }

  scrollWindowBottom() {
    $('.msg_card_body').scrollTop($('.msg_card_body')[0].scrollHeight + 50);
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
    if(chats.length != 0) {
      this.chats = this.chats.concat(chats);
      const timeOut = setTimeout(() => {
        this.scrollWindowBottom();
        clearTimeout(timeOut);
      }, 500);
    }
  }

  deleteText($event:number) {
    this.chats.map((chat, index, array) => {
      if(chat.chat_id == $event) {
        this.chats = this.chats.filter((chat) => chat.chat_id != $event);
      }
    });
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
    this.subscription.unsubscribe();
    this.chats = [];
    this.friend = null;
    this.user = null;
  }

}
