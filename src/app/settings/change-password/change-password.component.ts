import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Subscription } from 'rxjs';

import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  form:FormGroup;
  subscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private userServ: UserService
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      'old_password': ['', [Validators.required]],
      'new_password': ['', [Validators.required]],
      'confirm_password': ['', [Validators.required, this.passwordMatches]]
    });
  }

  passwordMatches(control: AbstractControl) {
    
    return null;
  }

  changePassword() {

  }

}
