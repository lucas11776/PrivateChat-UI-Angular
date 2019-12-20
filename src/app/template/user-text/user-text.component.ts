import { Component, OnInit, Input } from '@angular/core';

import { Chat } from '../../model/chats';

@Component({
  selector: 'app-user-text',
  templateUrl: './user-text.component.html',
  styleUrls: ['./user-text.component.css']
})
export class UserTextComponent implements OnInit {

  @Input('chat') chat:Chat;

  constructor() { }

  ngOnInit() {
  }

}
