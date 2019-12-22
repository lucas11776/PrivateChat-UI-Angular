import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Chat } from '../../model/chats';

@Component({
  selector: 'app-user-text',
  templateUrl: './user-text.component.html',
  styleUrls: ['./user-text.component.css']
})
export class UserTextComponent implements OnInit {

  @Input('chat') chat:Chat;
  @Output('delete') delete = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  deleteText() {
    this.delete.emit(this.chat.chat_id);
  }

}
