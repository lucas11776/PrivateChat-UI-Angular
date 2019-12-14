import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, timer } from 'rxjs';
import { expand, concatMap } from 'rxjs/operators';
import { SuiModalService } from 'ng2-semantic-ui';

import { FriendsService } from '../../shared/friends.service';
import { FriendRequest } from '../../model/friends';
import { ConfirmModal } from '../../template/confirm-modal/confirm-modal.component';
import { InfoModal, InfoModalComponent } from '../../template/info-modal/info-modal.component';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {

  friendsRequests:Observable<FriendRequest[]>;
  requestTime = 10000;

  constructor(
    private friendsServ: FriendsService,
    private router: Router,
    private suiModalServ: SuiModalService
  ) { }

  ngOnInit() {
    this.friendsRequests = this.friendsServ.friendsRequests().pipe(
      expand((_) => timer(this.requestTime).pipe(
        concatMap((_) => this.friendsServ.friendsRequests())
      ))
    );
  }

  /**
   * Confirm friend request modal
   */
  confirmAccept($event:string) {
    this.suiModalServ
      .open(new ConfirmModal("Accept Friend Request?", "Are you sure you want to accept " + $event + " friend request?", "small"))
      .onApprove(() => this.accept($event))
      .onDeny(() => { });
  }

  /**
   * Decline friend request modal
   */
  confirmDecline($event:string) {
    this.suiModalServ
      .open(new ConfirmModal("Decline Friend Request?", "Are you sure you want to decline " + $event + " friend request?", "small"))
      .onApprove(() => this.decline($event))
      .onDeny(() => { });
  }

  /**
   * Decline friend request
   * 
   * @param username friend username
   */
  accept(username:string) {
    const SUBSCRIPTION = this.friendsServ.acceptFriendRequest(username).subscribe(
      response => {
        if(response.status) {
          this.suiModalServ
            .open(new InfoModal('Friend Request Accepted...', response.message))
            .onDeny(() => this.router.navigate(['chats', username]))
        } else {
          this.suiModalServ
            .open(new ConfirmModal('Something went wrong...', response.message))
            .onApprove(() => this.accept(username))
            .onDeny(() => {})
        }
      },
      error => {

      }
    )
  }

  /**
   * Decline friend request
   * 
   * @param username friend username
   */
  decline(username:string) {

  }

}
