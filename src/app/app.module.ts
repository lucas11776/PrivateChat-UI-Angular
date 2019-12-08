import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TokenInterceptor } from './interceptor/token-interceptor';
import { AuthenticationModule } from './authentication/authentication.module';
import { HomeComponent } from './Pages/home/home.component';
import { SidebarComponent } from './template/sidebar/sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthenticationModule,
    HttpClientModule
  ],
  providers: [TokenInterceptor],
  bootstrap: [AppComponent]
})
export class AppModule { }
