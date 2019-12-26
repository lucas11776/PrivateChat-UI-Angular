import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Subscription } from 'rxjs';

import { UserService } from 'src/app/shared/user.service';
import { ResetPasswordResponse } from 'src/app/model/user';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit,OnDestroy {

  form:FormGroup;
  subscription: Subscription;
  loading:boolean;
  response:ResetPasswordResponse;

  constructor(
    private formBuilder: FormBuilder,
    private userServ: UserService
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      'old_password': ['', [Validators.required]],
      'new_password': ['', [Validators.required]],
      'confirm_password': ['', [Validators.required]]
    });
  }

  passwordMatches(control: AbstractControl) {
    
    return null;
  }

  changePassword() {
    this.response = null;
    this.loading = true;
    this.subscription = this.userServ.changePassword(this.form.value)
      .subscribe(
        (response) => {
          this.response = response;
          this.loading = false;
        },
        (error) => {

          this.loading = false;
        }
      )
  }

  ngOnDestroy() {

  }

}
