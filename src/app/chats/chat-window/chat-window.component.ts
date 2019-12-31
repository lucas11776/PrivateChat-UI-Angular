  import { Component, OnInit, OnDestroy } from '@angular/core';
  import { ActivatedRoute, Router, NavigationEnd, NavigationStart } from '@angular/router';
  import { Subscription, timer, Subject } from 'rxjs';
  import { concatMap, expand, takeUntil, map } from 'rxjs/operators';

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
    search:string;
    total:number;
    loading:boolean;
    getChatsSubscription:Subscription;
    getNewChatsSubscription:Subscription;
    routeSubscription:Subscription;
    chats:Chat[] = [];
    limit = 30;
    requestTime = 500; // Get new chats time (0.5s)

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
          const CURRENT_URL = '/' + activatedRoute.snapshot.url[0].path + '/' + this.activatedRoute.snapshot.params.username;
          if(router.url == CURRENT_URL) {
            this.friend = this.activatedRoute.snapshot.params.username;
            this.ngOnInit();
          }
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
      this.loading = true;
      this.getChatsSubscription = this.chatServ.chats(this.friend, this.limit, 0)
        .pipe(
          expand((chats) => {
            if(this.friend) {
              return timer(this.requestTime).pipe(
                concatMap((_) => this.chatServ.newChats(this.friend, this.getLastChatId(this.chats)))
              )
            }
            return null; 
          })
        )
        // .pipe(
        //   expand((_) => timer(500).pipe(
        //     concatMap((_) => this.chatServ.newChats(this.friend, this.getLastChatId(this.chats)))
        //   ))
        // )
        .subscribe(
          (response) => {
            if(response != null) {
              this.loadResponse(response);
            }
            this.loading = false;
          },
          (error) => {
            this.loading = false;
          }
        );
    }

    /**
     * Get new chats every
     */
    getNewChats() {
      this.getNewChatsSubscription = timer(this.requestTime).subscribe(() => {
        if(this.friend != null) {
          const SUBSCRIPTION = this.chatServ.newChats(this.friend, this.getLastChatId(this.chats))
            .subscribe(
              (response) => {
                this.loadResponse(response);
                SUBSCRIPTION.unsubscribe();
              },
              (error) => {
                const TIMEOUT = setTimeout(() => {
                  this.getNewChats();
                  clearTimeout(TIMEOUT);
                }, 10000);
              }
            )
        } 
      });
    }

    /**
     * Load chats response from api
     * 
     * @param response `ChatsResponse` 
     */
    loadResponse(response: ChatsResponse) {
      if(response.friend == this.friend) {
        this.loadChatDetails(response);
        if(this.getLastChatId(response.chats) != this.getLastChatId(this.chats)) {
          this.addChatsFront(response.chats);
        }
      }
    }

    /**
     * Get last chat id in chats array
     * 
     * @param chats 
     */
    getLastChatId(chats:Chat[]) {
      var chat_id:number = 0;
      if(typeof(chats) == 'object') {
        var len = chats.length;
        if(len > 0) {
          chat_id = chats[chats.length-1].chat_id;
        }
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
     * Delete all text in database
     * 
     * @param $event 
     */
    deleteAllText() {
      this.chats = [];
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

    /**
     * Scroll chats div at the bottom
     */
    scrollWindowBottom() {
      $('.msg_card_body').scrollTop($('.msg_card_body')[0].scrollHeight + 50);
    }

    ngOnDestroy() {
      this.chats = [];
      this.friend = null;
      this.user = null;
      if(this.getNewChatsSubscription) {
        this.getNewChatsSubscription.unsubscribe();
      }
      if(this.getChatsSubscription) {
        this.getChatsSubscription.unsubscribe();
      }
    }

  }
