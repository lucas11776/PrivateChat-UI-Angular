import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, timer } from 'rxjs';
import { expand, concatMap } from 'rxjs/operators';

import { AccountService } from '../../shared/account.service';
import { NotificationService } from '../../shared/notification.service';
import { Notification } from '../../model/notification';
import { SoundService } from '../../shared/sound.service';

declare var $ : any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {

  public loggedin:boolean;
  public notification:Notification;
  loggedinSubscription:Subscription;
  notificationSubscription:Subscription;
  requestTime = 2500; // miliseconds

  constructor(
    private accountServ: AccountService,
    private router: Router,
    public notificationServ: NotificationService,
    private soundServ: SoundService
  ) { }

  @HostListener('window:resize', ['$event'])
  windowEvent(event: FocusEvent) : void {
    this.replaceSidebarSpace();
  }

  /**
   * Initialize an `Observable` that get data from the api every
   * `requestTime` repeatly.
   */
  ngOnInit() {
    this.loggedIn();
    this.replaceSidebarSpace();
    this.getNotification();
  }

  /**
   * Apply padding with body with size of sidebar
   */
  replaceSidebarSpace() {
    const SIDEBAR_WIDTH = $("#sidebar").width();
    $("body").css({"paddingLeft": 0});
    $("body").css({"paddingLeft": SIDEBAR_WIDTH});
  }

  /**
   * Check if user logged in
   */
  loggedIn() {
    this.loggedinSubscription = this.accountServ.loggedin().pipe(
      expand((_) => timer(this.requestTime).pipe(
        concatMap((_) => {
          var req = null;
          return this.accountServ.loggedin()
        })
      ))
    ).subscribe(
      response => {
        this.loggedin = response.status;
      },
      error => {
        // recall loggedin if error occurs after 10s
        const TIMEOUT = setTimeout(() => {
          // check if user token is stored
          if(this.accountServ.getToken()) {
            this.ngOnInit();
          }
          clearTimeout(TIMEOUT);
        }, 10000);
        console.warn('Sidebar Componet (Loggedin) : ', error);
      }
    )
  }

  getNotification() {
    this.notificationSubscription = this.notificationServ.notifications().pipe(
      expand((_) => timer(this.requestTime).pipe(
        concatMap((_) => this.notificationServ.notifications())
      ))
    ).subscribe(
      (response) => {
        if(this.notification) {
          if(response.chats > this.notification.chats) {
            this.soundServ.notification();
          }
        }
        this.notification = response;
      },
      (error) => {
        // recall getNotification if error occurs after 10s
        const TIMEOUT = setTimeout(() => {
          // check if token is stored
          if(this.accountServ.getToken()) {
            this.getNotification();
          }
          clearTimeout(TIMEOUT);
        }, 10000);
        console.log('Sidebar Component (getNotifications) : ', error);
      }
    )
  }

  /**
   * Clear token from session window and redirect to home `Route`.
   */
  logout() {
    this.accountServ.clearToken();
    this.loggedin = false;
    this.router.navigate(['']);
  }

  /**
   * `Unsubscribe` to loggedin `Observable`
   */
  ngOnDestroy() {
    if(this.loggedinSubscription) {
      this.loggedinSubscription.unsubscribe();
    }
    if(this.notificationSubscription) {
      this.loggedinSubscription.unsubscribe();
    }
  }

}
