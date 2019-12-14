import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Login, LoginResponse } from '../../model/account';
import { AccountService } from 'src/app/shared/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  subscription:Subscription;
  response:LoginResponse;
  loader:boolean;
  form:FormGroup;
  error:string;

  constructor(
    private accountServ: AccountService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      'username': ['', [Validators.required]],
      'password': ['', [Validators.required]]
    });
  }

  login() {
    this.response = null;
    this.error = null;
    this.loader = true;
    this.subscription = this.accountServ.login(this.form.value)
      .subscribe(
        (response) => {
          if(response.status) {
            window.sessionStorage.setItem('token', response.data.token);
            location.replace('');
          }
          this.response = response;
          this.loader = false;
        },
        (error) => {
          this.error = error;
          this.loader = false;
        }
      );
  }

}
