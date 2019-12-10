import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, timer } from 'rxjs';
import { expand, concatMap } from 'rxjs/operators';

import { AccountService } from '../../shared/account.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {

  loggedin:boolean;
  notification:object;
  loggedinSubscription:Subscription;
  requestTime = 1000; // 1s

  constructor(
    private accountServ: AccountService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loggedinSubscription = this.accountServ.loggedin().pipe(
      expand((_) => timer(this.requestTime).pipe(
        concatMap((_) => this.accountServ.loggedin())
      ))
    ).subscribe((response) => {
      this.loggedin = response.status;
    })
  }

  logout() {
    this.accountServ.clearToken();
    this.router.navigate(['']);
  }

  ngOnDestroy() {
    this.loggedinSubscription.unsubscribe();
  }

}
