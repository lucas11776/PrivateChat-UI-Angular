import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';

import { AccountService } from '../../shared/account.service';

import { RegisterResponse } from 'src/app/model/account';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  subscription:Subscription;
  response:RegisterResponse;
  form:FormGroup;
  loader:boolean;
  error:string;
 

  constructor(
    private formBuilder: FormBuilder,
    private accountServ: AccountService,
    private router: Router
  ) { }

  /**
   * Init registration form
   */
  ngOnInit() {
    this.form = this.formBuilder.group({
      'username': ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      'confirm_password': ['', [Validators.required]]
    });
  }

  /**
   * Send registration form data to api
   */
  register() {
    this.response = null;
    this.error = null;
    this.loader = true;
    this.subscription = this.accountServ.register(this.form.value)
      .subscribe(
        (response) => {
          if(response.status) {
            this.form.reset();
            const timeOut = setTimeout(() => {
              clearTimeout(timeOut);
              this.router.navigate(['login']);
            }, 4000);
          }
          this.response = response;
          this.loader = false;
        },
        (error) => {
          this.error = error;
          this.loader = false;
        }
      )
  }

  /**
   * Controller CleanUp
   */
  ngOnDestroy() {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
