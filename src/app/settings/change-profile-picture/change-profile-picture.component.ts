import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { UserService } from '../../shared/user.service';
import { Account } from '../../model/user';

@Component({
  selector: 'app-change-profile-picture',
  templateUrl: './change-profile-picture.component.html',
  styleUrls: ['./change-profile-picture.component.css']
})
export class ChangeProfilePictureComponent implements OnInit,OnDestroy {

  account:Account;
  accountSubscription:Subscription;

  constructor(
    private userServ: UserService
  ) { }

  ngOnInit() {
    const SUBSCRIPTION = this.userServ.account()
      .subscribe(
        (response) => this.account = response,
        (error) => this.ngOnInit()
      );
  }
  
  ngOnDestroy() {
    if(this.accountSubscription) {
      this.accountSubscription.unsubscribe();
    }
  }

}
