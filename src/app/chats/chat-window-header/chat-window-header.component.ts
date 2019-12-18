import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SuiModalService } from 'ng2-semantic-ui';

import { ConfirmModal } from '../../template/confirm-modal/confirm-modal.component';

// Jqeury Var
declare var $ : any;

@Component({
  selector: 'app-chat-window-header',
  templateUrl: './chat-window-header.component.html',
  styleUrls: ['./chat-window-header.component.css']
})
export class ChatWindowHeaderComponent implements OnInit {

  friend:string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private elemRef: ElementRef,
    private suiModalServ: SuiModalService
  ) {
    this.friend = activatedRoute.snapshot.params.username;
  }

  ngOnInit() {
    
  }

  menu() {
    $($(this.elemRef.nativeElement).find('.action_menu')).toggle();
  }

  unfriendConfirmation() {
    this.suiModalServ
      .open(new ConfirmModal('Unfriend ' + this.friend, 'Are you sure you want to unfriend ' + this.friend.toUpperCase() + '.'))
      .onApprove(() => {})
      .onDeny(() => {});
  }

  unfriend() {

  }

}
