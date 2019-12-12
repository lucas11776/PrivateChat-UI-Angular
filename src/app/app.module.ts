import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpIntercerptor } from './interceptor/index';
import { AuthenticationModule } from './authentication/authentication.module';
import { HomeComponent } from './Pages/home/home.component';
import { SidebarComponent } from './template/sidebar/sidebar.component';
import { FriendsModule } from './friends/friends.module';
import { LastSeenDirective } from './directive/last-seen.directive';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SidebarComponent,
    LastSeenDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthenticationModule,
    HttpClientModule,
    FriendsModule
  ],
  providers: [HttpIntercerptor],
  bootstrap: [AppComponent]
})
export class AppModule { }
