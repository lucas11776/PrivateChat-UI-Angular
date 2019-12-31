import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, delay } from 'rxjs/operators';

import { Register, RegisterResponse, Login, LoginResponse, Authorization, Response } from '../model/account';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  /**
   * Time taken to deley http request
   * 
   * @var integer
   */
  private requestDelayTime = 2000;

  constructor(private http: HttpClient) { }

  /**
   * Send registration data to register api
   * 
   * @param data Registration Data
   * @return An `Observable` of type `RegisterResponse`
   */
  register(data:Register) : Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>('register', data).pipe(
      retry(2),
      delay(this.requestDelayTime),
      catchError((error:HttpErrorResponse) => throwError(error.message))
    );
  }

  /**
   * Send login credentails to login api
   * 
   * @param data Login Data
   * @rerturn An `Observable` of type `ApiResponse`
   */
  login(data:Login) : Observable<LoginResponse> {
    return this.http.post<LoginResponse>('login', data).pipe(
      retry(2),
      delay(this.requestDelayTime),
      catchError((error:HttpErrorResponse) => throwError(error.message))
    )
  }

  /**
   * Check if user is logged in
   * 
   * @return An `Observable` of type `Authorization`
   */
  loggedin() : Observable<Authorization> {
    return this.http.get<Authorization>('loggedin').pipe(
      retry(2),
      catchError((error:HttpErrorResponse) => throwError(error.message))
    );
  }

  /**
   * Check if user is logged out
   * 
   * @return An `Observable` of type `Authorization`
   */
  loggedout() : Observable<Authorization> {
    return this.http.get<Authorization>('loggedout').pipe(
      retry(2),
      catchError((error:HttpErrorResponse) => throwError(error.message))
    );
  }

  /**
   * Updated user last seen
   * 
   * @return An `Observable` of type `Any`
   */
  updateLastSeen() : Observable<any> {
    return this.http.get<any>('update/last/seen').pipe(
      retry(2),
      catchError((error:HttpErrorResponse) => throwError(error.message))
    )
  }

  /**
   * Upload user profile picture
   * 
   * @param form `FormDate`
   * @return An  `Observable` of type `Response`
   */
  uploadProfilePicture(form: FormData) : Observable<Response> {
    return this.http.post<Response>('upload/profile/picture', form).pipe(
      retry(2),
      catchError((error:HttpErrorResponse) => throwError(error.message))
    )
  }

  /**
   * Get token from browser session window
   * 
   * @return `string`
   */
  getToken() {
    return window.sessionStorage.getItem('token') ? window.sessionStorage.getItem('token') : false;
  }

  /**
   * Set token in browser session window
   * 
   * @return `boolean`
   */
  setToken(token:string) {
    return window.sessionStorage.setItem('token', token);
  }

  /**
   * Remove user token from browser session data
   * 
   * @return `NULL`
   */
  clearToken() {
    window.sessionStorage.removeItem('token');
  }

}
