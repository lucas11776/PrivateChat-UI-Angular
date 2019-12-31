import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { Notification } from '../model/notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient) { }

  /**
   * Get user notification from api
   * 
   * @return An `Observable` of type `Notification`
   */
  notifications() : Observable<Notification> {
    return this.http.get<Notification>('notifications').pipe(
      retry(2),
      catchError((error:HttpErrorResponse) => throwError(error.message))
    );
  }

}
