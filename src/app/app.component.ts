import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { expand, concatMap, subscribeOn } from 'rxjs/operators';
import PushNotification from 'push-js';

import { AccountService } from './shared/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,OnDestroy {

  lastSeenSubscription:Subscription;
  lastSeenUpdateTime = 5000;
  count = 1;

  constructor(
    private accountServ: AccountService
  ) { }

  ngOnInit() {
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

  @HostListener('window:focus', ['$event'])
  onFocas(event: FocusEvent) : void {
    this.ngOnInit();
  }

  @HostListener('window:blur', ['$event'])
  onBlur(event: FocusEvent) : void {
    //this.ngOnDestroy();
  }

  ngOnDestroy() {
    this.lastSeenSubscription.unsubscribe();
  }

}
