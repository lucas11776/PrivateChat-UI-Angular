import { Component, OnInit, ElementRef, OnDestroy, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Subscription, timer } from 'rxjs';
import { concatMap, expand } from 'rxjs/operators';
import { SuiModalService } from 'ng2-semantic-ui';

import { ConfirmModal } from '../../template/confirm-modal/confirm-modal.component';
import { FriendsService } from '../../shared/friends.service';
import { Friend } from '../../model/friends';
import { DateService } from '../../shared/date.service';
import { InfoModal } from '../../template/info-modal/info-modal.component';
import { ChatsService } from '../../shared/chats.service';

// Jqeury Var
declare var $ : any;

@Component({
  selector: 'app-chat-window-header',
  templateUrl: './chat-window-header.component.html',
  styleUrls: ['./chat-window-header.component.css']
})
export class ChatWindowHeaderComponent implements OnInit, OnDestroy {

  @Output('delete') delete = new EventEmitter();

  lastSeenSubscription:Subscription;
  friendsDetailSubscription:Subscription;
  friendLastSeen:number;
  friendsDetails:Friend;
  requestTime = 2500;
  friend:string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private elemRef: ElementRef,
    private suiModalServ: SuiModalService,
    private friendServ: FriendsService,
    private chatServ: ChatsService,
    private date: DateService,
    private router: Router
  ) {
    this.friend = this.activatedRoute.snapshot.params.username;
    // // listen end of router change event (initialize data)
    // this.router.events.subscribe((event:NavigationEnd) => {
    //   this.friend = this.activatedRoute.snapshot.params.username;
    //   // router change event
    //   this.router.events.subscribe((event) => {
    //     if(event instanceof NavigationStart) {
    //       this.ngOnDestroy();
    //     }
    //     if(event instanceof NavigationEnd) {
    //       const CURRENT_URL = '/' + activatedRoute.snapshot.url[0].path + '/' + this.activatedRoute.snapshot.params.username;
    //       if(router.url == CURRENT_URL) {
    //         this.friend = this.activatedRoute.snapshot.params.username;
    //         this.ngOnInit();
    //       }
    //     }
    //   });
    // });
    this.router.events.subscribe(
      (event) => {
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
      }
    )
  }

  /**
   * Initialization
   */
  ngOnInit() {
    if(this.friend) {
      this.getFriendsDetails();
      this.getLastSeen();
    }
  }

  /**
   * Get friends account details
   */
  getFriendsDetails() {
    this.friendsDetailSubscription = this.friendServ.friendsDetails(this.friend).subscribe(
      (response) => this.friendsDetails = response,
      (error) => this.getFriendsDetails()
    )
  }

  /**
   * Get friend last seen each `this.requestTime`
   */
  getLastSeen() {
    this.lastSeenSubscription = this.friendServ.friendLastSeen(this.friend).pipe(
      expand((_) => {
        if(this.friend != null) {
          return timer(this.requestTime).pipe(
            concatMap((_) => this.friendServ.friendLastSeen(this.friend))
          )
        }
        return null;
      })
    ).subscribe(
      (response) => {
        if(response != null) {
          this.friendLastSeen = response.last_seen;
        }
      },
      (error) => this.getLastSeen()
    )
  }
  
  /**
   * Open menu
   */
  menu() {
    $($(this.elemRef.nativeElement).find('.action_menu')).toggle();
  }

  /**
   * Check if user last seen should by consider to be online
   */
  userOnline(timestamp:number) {
    return this.date.online(timestamp);
  }

  /**
   * Convert user last seen to reable date
   */
  lastSeen() {
    return this.date.lastSeen(this.friendLastSeen);
  }

  /**
   * Unfriend modal confirmation
   */
  unfriendConfirmation() {
    this.suiModalServ
      .open(new ConfirmModal('Unfriend ' + this.friend, 'Are you sure you want to unfriend ' + this.friend.toUpperCase() + '.'))
      .onApprove(() => this.unfriend())
      .onDeny(() => {});
  }

  /**
   * Unfriend `friend`
   */
  unfriend() {
    const SUBSCRIPTION = this.friendServ.unfriend(this.friend)
      .subscribe(
        (response) => {
          if(response.status) {
            this.router.navigate(['chats']);
          } else {
            this.suiModalServ
              .open(new ConfirmModal('Failed to unfriend ' + this.friend + ' try again.', response.message))
              .onApprove(() => this.unfriend())
              .onDeny(() => {})
          }
          SUBSCRIPTION.unsubscribe();
        },
        (error) => {
          this.suiModalServ
            .open(new ConfirmModal('Something went wrong', error))
            .onApprove(() => this.unfriend())
            .onDeny(() => {})
        }
      )
  }

  /**
   * Delete all chats confirmation modal
   */
  clearChatsConfirmation() {
    this.suiModalServ
      .open(new ConfirmModal('Delete all chats', 'Are your sure you want to delete all chats with ' + this.friend + '.'))
      .onApprove(() => this.clearChats())
      .onDeny(() => {});
  }

  /**
   * Clear all chats form database
   */
  clearChats() {
    const SUBSCRIPTION = this.chatServ.clearChats(this.friend)
      .subscribe(
        (response) => {
          if(response.status) {
            this.delete.emit(true);
          } else {
            this.suiModalServ
              .open(new ConfirmModal('Failed chat all chats please try again.', response.message))
              .onApprove(() => this.clearChats())
              .onDeny(() => { });
          }
          SUBSCRIPTION.unsubscribe();
        },
        (error) => {
          this.suiModalServ
            .open(new ConfirmModal('Something went wrong try again.', error))
            .onApprove(() => this.clearChats())
            .onDeny(() => { });
        }
      )
  }

  ngOnDestroy() {
    this.friend = null;
    this.friendLastSeen = null;
    if(this.friendsDetailSubscription) this.friendsDetailSubscription.unsubscribe();
    if(this.lastSeenSubscription) this.lastSeenSubscription.unsubscribe();
  }

}
