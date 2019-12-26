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
  loading:boolean;

  constructor(
    private userServ: UserService
  ) { }

  ngOnInit() {
    this.loading = true;
    this.accountSubscription = this.userServ.account()
      .subscribe(
        (response) => {
          this.account = response;
          this.loading = false;
        },
        (error) => {
          this.ngOnInit()
        }
      );
  }
  
  ngOnDestroy() {
    if(this.accountSubscription) {
      this.accountSubscription.unsubscribe();
    }
  }

}
