import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SuiModalService } from 'ng2-semantic-ui';

import { UserService } from '../../shared/user.service';
import { InfoModal } from '../../template/info-modal/info-modal.component';
import { ResetPassword } from '../../model/user';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit,OnDestroy {

  form:FormGroup;
  subscription: Subscription;
  loading:boolean;
  error:ResetPassword;

  constructor(
    private formBuilder: FormBuilder,
    private userServ: UserService,
    private suiModalServ: SuiModalService
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
    this.error = null;
    this.loading = true;
    this.subscription = this.userServ.changePassword(this.form.value)
      .subscribe(
        (response) => {
          this.loading = false;
          if(response.status) {
            this.suiModalServ
              .open(new InfoModal('Password Change Successfully.', response.message))
              .onDeny(() => {});
            this.form.reset();
          } else {
            this.suiModalServ
              .open(new InfoModal('Something Went Wrong.', response.message))
              .onDeny(() => {});
            this.error = response.data;
          }
        },
        (error) => {
          this.loading = false;
          this.suiModalServ
            .open(new InfoModal('Something Went Wrong.', error))
        }
      )
  }

  ngOnDestroy() {

  }

}
