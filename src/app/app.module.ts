import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SuiModule } from 'ng2-semantic-ui';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpIntercerptor } from './interceptor/index';
import { AuthenticationModule } from './authentication/authentication.module';
import { HomeComponent } from './Pages/home/home.component';
import { SidebarComponent } from './template/sidebar/sidebar.component';
import { FriendsModule } from './friends/friends.module';
import { LastSeenDirective } from './directive/last-seen.directive';
import { ChatsModule } from './chats/chats.module';
import { ConfirmModalComponent } from './template/confirm-modal/confirm-modal.component';
import { InfoModalComponent } from './template/info-modal/info-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SidebarComponent,
    LastSeenDirective,
    ConfirmModalComponent,
    InfoModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AuthenticationModule,
    HttpClientModule,
    FriendsModule,
    ChatsModule,
    SuiModule
  ],
  entryComponents: [
      ConfirmModalComponent,
      InfoModalComponent
  ],
  providers: [HttpIntercerptor],
  bootstrap: [AppComponent]
})
export class AppModule { }
