import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { Subscription, timer } from 'rxjs';
import { expand, concatMap } from 'rxjs/operators';

import { AccountService } from './shared/account.service';

declare var $ : any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,OnDestroy {

  lastSeenSubscription:Subscription;
  routerSubscription:Subscription;
  lastSeenUpdateTime = 5000;
  routeChange:boolean = false;
  count = 1;

  constructor(
    private accountServ: AccountService,
    private router: Router
  ) {
    this.routerSubscription = router.events.subscribe(
      (event) => {
        if(event instanceof NavigationStart) {
          this.routeChange = true;
        }
        if(event instanceof NavigationEnd) {
          this.routeChange = false;
        }
      }
    )
  }

  ngOnInit() {
    this.replaceDimmerSpace();
    this.lastSeenSubscription = this.accountServ.updateLastSeen().pipe(
      expand((_) => timer(this.lastSeenUpdateTime).pipe(
        concatMap((_) => 
        this.accountServ.updateLastSeen()
        )
      ))
    ).subscribe(
      (response) => { },
      (error) => {
        const TIME_OUT = setTimeout(() => {
          this.ngOnInit();
          clearTimeout(TIME_OUT);
        }, 3500);
      }
    )
  }

  replaceDimmerSpace() {
    const HTML_WIDTH = $("html").width();
    $(".route-change").css({"width": HTML_WIDTH});
  }

  @HostListener('window:resize', ['$event'])
  windowEvent(event: FocusEvent) : void {
    this.replaceDimmerSpace();
  }

  @HostListener('window:focus', ['$event'])
  onFocas(event: FocusEvent) : void {
    //this.ngOnInit();
  }

  @HostListener('window:blur', ['$event'])
  onBlur(event: FocusEvent) : void {
    //this.ngOnDestroy();
  }

  ngOnDestroy() {
    this.lastSeenSubscription.unsubscribe();
    this.routerSubscription.unsubscribe();
  }

}
