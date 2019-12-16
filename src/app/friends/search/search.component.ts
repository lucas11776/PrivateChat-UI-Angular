import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { SuiModalService } from 'ng2-semantic-ui';

import { FriendsService } from '../../shared/friends.service';
import { Friend } from '../../model/friends';
import { ConfirmModal } from '../../template/confirm-modal/confirm-modal.component';
import { InfoModal } from '../../template/info-modal/info-modal.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  search:FormControl = new FormControl;
  searchResults:Friend[];

  constructor(
    private friendServ: FriendsService,
    private suiModalServ: SuiModalService
  ) { }

  ngOnInit() {
    this.search.valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap((search:string) => this.friendServ.search(search))
    ).subscribe(
      (response) => {
        this.searchResults = response.results;
      }
    )
  }

  confirmRequest(username:string) {
    this.suiModalServ
      .open(new ConfirmModal('Send Friend Request?', 'Are your sure your want send a friend request to '+username+'.', 'small'))
      .onApprove(() => this.sendRequest(username))
      .onDeny(() => {});
  }

  sendRequest(username:string) {
    const SUBSCRIPTION = this.friendServ.sendFriendRequest(username).subscribe(
      (response) => {
        if(response.status) {
          this.suiModalServ
            .open(new InfoModal('Friend Request Sent.', response.message))
            .onDeny(() => {});
          const SEARCH = this.search.value;
          this.ngOnInit();
          this.search.setValue(SEARCH);
        } else {
          this.suiModalServ
            .open(new ConfirmModal('Something Went Wrong Please Try Again...', response.message))
            .onApprove(() => this.sendRequest(username))
            .onDeny(() => {});
        }
        SUBSCRIPTION.unsubscribe();
      },
      (error) => {
        this.suiModalServ
          .open(new ConfirmModal('Something went wrong try again...', error))
          .onApprove(() => this.sendRequest(username))
          .onDeny(() => {});
      }
    )
  }

}
