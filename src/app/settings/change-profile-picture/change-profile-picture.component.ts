import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Subscription } from 'rxjs';

import { UserService } from '../../shared/user.service';
import { Account } from '../../model/user';
import { AccountService } from 'src/app/shared/account.service';

@Component({
  selector: 'app-change-profile-picture',
  templateUrl: './change-profile-picture.component.html',
  styleUrls: ['./change-profile-picture.component.css']
})
export class ChangeProfilePictureComponent implements OnInit,OnDestroy {

  account:Account;
  accountSubscription:Subscription;
  loading:boolean;
  uploading:boolean;
  form:FormGroup;
  file:File = null;

  constructor(
    private userServ: UserService,
    private formBuilder: FormBuilder,
    private accountServ: AccountService
  ) { }

  ngOnInit() {
    this.loading = true;
    this.accountSubscription = this.userServ.account()
      .subscribe(
        (response) => {
          this.account = response;
          this.loading = false;
        },
        (error) => {
          this.ngOnInit()
        }
      );
    this.form = this.formBuilder.group({
      'picture': ['', [this.validPicture]]
    });
  }

  selectFile(file:File) {
    this.form.controls.picture.markAsDirty();
    this.file = file;
  }

  validPicture(control:AbstractControl) {
    // if(this.file == null) {
    //   return null;
    // }

    // check file type is allowed

    return true;
  }

  uploadProfilePicture() {
    this.uploading = true;
    const form:FormData = new FormData();
    form.append('picture', this.file)
    const SUSCRIPTION = this.accountServ.uploadProfilePicture(form)
      .subscribe(
        (response) => {
          if(response.status) {
            this.file = null;
            this.uploading = false;
            this.ngOnInit();
          }
          SUSCRIPTION.unsubscribe();
        },
        (error) => {
          this.loading = false;
          console.warn('Change Profile Picture Controller (UploadProfilePicture) : ', error);
        }
      );
  }
  
  ngOnDestroy() {
    if(this.accountSubscription) {
      this.accountSubscription.unsubscribe();
    }
  }

}
