import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AccountService } from '../shared/account.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedoutGuard implements CanActivate {

  constructor(
    private accountServ: AccountService,
    private router: Router
  ) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.accountServ.loggedout().pipe(
      map(response => {
        if(!response.status) {
          this.router.navigate(['']);
        }
        return response.status;
      })
    );
  }
  
}
