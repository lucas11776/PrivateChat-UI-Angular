import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoggedoutGuard } from '../guard/loggedout.guard';

import { LoginComponent  } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [LoggedoutGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [LoggedoutGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
