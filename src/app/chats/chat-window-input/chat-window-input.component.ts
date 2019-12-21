import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SuiModalService } from 'ng2-semantic-ui';

import { ChatsService } from '../../shared/chats.service';
import { InfoModal } from '../../template/info-modal/info-modal.component';

@Component({
  selector: 'app-chat-window-input',
  templateUrl: './chat-window-input.component.html',
  styleUrls: ['./chat-window-input.component.css']
})
export class ChatWindowInputComponent implements OnInit {

  form:FormGroup;
  routeChangeSubscription:Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private chatServ: ChatsService,
    private suiModalServ: SuiModalService
  ) { }

  ngOnInit() {
    this.loadForm();
    this.routeChangeSubscription = this.router.events
      .subscribe((event: NavigationEnd) => {
        if(event instanceof NavigationEnd) {
          this.loadForm();
        }
      });
  }

  /**
   * Load form
   */
  loadForm() {
    this.form = this.formBuilder.group({
      'username': [this.activatedRoute.snapshot.params.username, [Validators.required]],
      'text': ['', [Validators.required]]
    })
  }

  /**
   * Send text to database
   * 
   */
  send() {
    const SUBSCRIPTION = this.chatServ.sendText(this.form.value).subscribe(
      (response) => {
        if(response.status) {
          this.form.reset();
          this.form.controls.username.setValue(this.activatedRoute.snapshot.params.username);
        } else {
          this.suiModalServ
            .open(new InfoModal('Failed To Send Text.', response.message))
            .onDeny(() => {})
        }
      },
      (error) => {
        this.suiModalServ
            .open(new InfoModal('Something went wrong.', error))
            .onDeny(() => {})
      }
    )
  }

}
