import { Component, OnInit, Input } from '@angular/core';

import { Chat } from '../../model/chats';

@Component({
  selector: 'app-friend-text',
  templateUrl: './friend-text.component.html',
  styleUrls: ['./friend-text.component.css']
})
export class FriendTextComponent implements OnInit {

  @Input('chat') chat:Chat;

  constructor() { }

  ngOnInit() {
  }

}
