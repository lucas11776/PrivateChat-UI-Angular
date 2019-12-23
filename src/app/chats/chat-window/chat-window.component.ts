  import { Component, OnInit, OnDestroy } from '@angular/core';
  import { ActivatedRoute, Router, NavigationEnd, NavigationStart } from '@angular/router';
  import { Observable, Subscription, timer } from 'rxjs';
  import { concatMap, map, expand, mergeMap } from 'rxjs/operators';

  import { ChatsService } from '../../shared/chats.service';
  import { Chat, ChatsResponse } from '../../model/chats';

  declare var $ : any;

  @Component({
    selector: 'app-chat-window',
    templateUrl: './chat-window.component.html',
    styleUrls: ['./chat-window.component.css']
  })
  export class ChatWindowComponent implements OnInit, OnDestroy {

    user:string;
    friend:string;
    total:number;
    getChatsSubscription:Subscription;
    routeSubscription:Subscription;
    chats:Chat[] = [];
    limit = 30;
    requestTime = 500; // 500ms
    firstRequest = true;
    routeChange = false;

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
      this.friend = this.activatedRoute.snapshot.params.username;
      // router change event
      this.router.events.subscribe((event) => {
        if(event instanceof NavigationStart) {
          this.ngOnDestroy();
        }
        if(event instanceof NavigationEnd) {
          this.friend = this.activatedRoute.snapshot.params.username;
          this.ngOnInit();
        }
      });
    }

    ngOnInit() {
      if(this.friend) {
        this.getChats();
      }
    }

    /**
     * Get lastest chats between user and friend
     */
    getChats() {
      this.getChatsSubscription = this.chatServ.chats(this.friend, this.limit, 0)
        .pipe(
          expand((_) => timer(500).pipe(
            concatMap((_) => this.chatServ.newChats(this.friend, this.getLastChatId(this.chats)))
          ))
        )
        .subscribe(
          (response) => {
            if(response.friend == this.friend) {
              this.loadChatDetails(response);
              if(this.getLastChatId(response.chats) != this.getLastChatId(this.chats)) {
                this.addChatsFront(response.chats);
              }
            }
          }
        );
    }

    /**
     * Get last chat id in chats array
     * 
     * @param chats 
     */
    getLastChatId(chats:Chat[]) {
      var chat_id:number = 0;
      if(chats.length > 0) {
        chat_id = chats[chats.length-1].chat_id;
      }
      return chat_id;
    }

    /**
     * Load chats details from respnse
     * 
     * @param response 
     */
    loadChatDetails(response: ChatsResponse) {
      this.friend = response.friend;
      this.user = response.user;
      this.total = response.total;
    }

    /**
     * Scroll page to last chats
     */
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
     * Delete chat form chat list
     * 
     * @param $event 
     */
    deleteText($event:number) {
      this.chats = this.chats.filter((chat) => chat.chat_id != $event);
    }

    /**
     * Delete all text
     * 
     * @param $event 
     */
    deleteAllText($event:number) {

    }

    /**
     * Get new data if friend as been click
     * 
     * @param $event 
     */
    newChatWindow($event:string) {
      if(this.friend != $event) {
        this.getChats();
      }
    } 

    ngOnDestroy() {
      this.chats = [];
      this.friend = null;
      this.user = null;
      if(this.getChatsSubscription) {
        this.getChatsSubscription.unsubscribe();
      }
    }

  }
