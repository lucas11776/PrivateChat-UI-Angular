import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
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
        this.ngOnDestroy();
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
        //this.chats = response.chats;
        return [];
      }),
      expand((_) => timer(500).pipe(
        concatMap((_) => {
          var last_chat_id = this.chats.length != 0 ? this.chats[this.chats.length-1].chat_id : 0;
          return this.chatServ.newChats(this.activatedRoute.snapshot.params.username, last_chat_id).pipe(
            map((response) => {
              this.loadChatDetails(response);
              this.addChatsFront(response.chats);
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

  loadChatDetails(response: ChatsResponse) {
    this.friend = response.friend;
    this.user = response.user;
    this.total = response.total;
  }

  scrollWindowBottom() {
    $('.msg_card_body').scrollTop($('.msg_card_body').height());
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
      chats.map((chat, index, array) => {
        var exist = this.chats.find((_chat, _index, _array) => _chat.chat_id == chat.chat_id);
        if(!exist) {
          this.chats.push(chat);
          this.scrollWindowBottom();
        }
      });
    }
    
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
    this.chats = [];
  }

}
