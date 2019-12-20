import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { ChatsResponse } from '../model/chats';

@Injectable({
  providedIn: 'root'
})
export class ChatsService {

  constructor(private http: HttpClient) { }

  /**
   * Get lastest user chats
   * 
   * @param username Friend Username
   * @param limit Limit number of chats
   * @param offset offset number chats
   * @return An `Observable` of type `ChatsResponse`
   */
  chats(username:string, limit:number, offset:number) : Observable<ChatsResponse> {
    return this.http.get<ChatsResponse>('api/chats/' + username + '?limit='+ limit + '&offset=' + offset).pipe(
      retry(2),
      catchError((error:HttpErrorResponse) => throwError(error.message))
    );
  }

  /**
   * Get lastest chat starting from timestamp
   * 
   * @param timestamp Chat created timestamp
   */
  newChats(timestamp:string) {

  }
  
}
