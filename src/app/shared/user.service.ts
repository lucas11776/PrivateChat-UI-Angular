import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { Account } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Get user account details
   * 
   * @return An `Observable` of type `Account`
   */
  account() : Observable<Account> {
    return this.http.get<Account>('api/account/details').pipe(
      retry(2),
      catchError((error:HttpErrorResponse) => throwError(error.message))
    )
  }

}
