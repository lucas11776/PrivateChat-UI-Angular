import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { SuiModalService } from 'ng2-semantic-ui';

import { ChatsService } from '../../shared/chats.service';
import { Chat } from '../../model/chats';
import { ConfirmModal } from '../../template/confirm-modal/confirm-modal.component';
import { InfoModal } from '../info-modal/info-modal.component';

@Component({
  selector: 'app-user-text',
  templateUrl: './user-text.component.html',
  styleUrls: ['./user-text.component.css']
})
export class UserTextComponent implements OnInit, OnDestroy {

  @Input('chat') chat:Chat;
  @Output('delete') delete = new EventEmitter();

  subscription:Subscription;

  constructor(
    private chatServ: ChatsService,
    public suiModalServ: SuiModalService
  ) { }

  ngOnInit() {
  }

  deleteText() {
    this.subscription = this.chatServ.deleteText(this.chat.chat_id).subscribe(
      (response) => {
        if(response.status == false) {
          this.suiModalServ
            .open(new InfoModal('Something went wrong try again.', response.message))
            .onDeny(() => {})
          return;
        }
        this.delete.emit(this.chat.chat_id);
      },
      (error) => {
        this.suiModalServ
          .open(new ConfirmModal('Something when wrong tring again', error))
          .onApprove(() => this.deleteText())
          .onDeny(() => {})
      }
    );
  }
  

  ngOnDestroy() {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
