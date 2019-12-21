import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, timer } from 'rxjs';
import { expand, concatMap } from 'rxjs/operators';

import { AccountService } from '../../shared/account.service';

declare var $ : any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {

  loggedin: boolean;
  notification: object;
  loggedinSubscription: Subscription;
  requestTime = 10000; // miliseconds

  constructor(
    private accountServ: AccountService,
    private router: Router
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
        concatMap((_) => this.accountServ.loggedin())
      ))
    ).subscribe(
      response => {
        this.loggedin = response.status;
      },
      error => {
        this.loggedIn();
      }
    )
  }

  getNotification() {

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
    this.loggedinSubscription.unsubscribe();
  }

}
