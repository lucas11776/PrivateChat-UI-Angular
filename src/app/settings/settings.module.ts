import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { ChangeProfilePictureComponent } from './change-profile-picture/change-profile-picture.component';


@NgModule({
  declarations: [
    SettingsComponent,
    ChangeProfilePictureComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule
  ]
})
export class SettingsModule { }
