import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SuiModalService } from 'ng2-semantic-ui';

import { FriendsService } from '../shared/friends.service';
import { InfoModal } from '../template/info-modal/info-modal.component';

@Injectable({
  providedIn: 'root'
})
export class FriendShipExistGuard implements CanActivate {

  constructor(
    private friendServ: FriendsService,
    private router: Router,
    private suiModalServ: SuiModalService
  ) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.friendServ.friendsUser(next.params.username).pipe(
      map((response) => {
        if(response.status == false) {
          this.suiModalServ
            .open(new InfoModal('Can not Open Chat Window.', 'Sorry we can not open chat window because your are not friends with user.'))
            .onDeny(() => this.router.navigate(['chats']))
        }
        return response.status;
      })
    );
  }
  
}
