import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { Register, RegisterResponse } from '../model/account';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  /**
   * Send registration data to register api route
   * 
   * @param data Registration Data
   * @return An `Observable` of type `RegisterResponse`
   */
  register(data:Register) : Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>('api/register', data).pipe(
      retry(2),
      catchError((error:HttpErrorResponse) => throwError(error.message))
    );
  }
}
