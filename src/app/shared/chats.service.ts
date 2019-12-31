import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { ChatsResponse, SendText, SendTextResponse, Response } from '../model/chats';

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
    return this.http.get<ChatsResponse>('chats/' + username + '?limit='+ limit + '&offset=' + offset).pipe(
      retry(2),
      catchError((error:HttpErrorResponse) => throwError(error.message))
    );
  }

  /**
   * Get lastest chat starting from timestamp
   * 
   * @param timestamp Chat created timestamp
   * @param chat_id Latest text from chats
   */
  newChats(username:string, chat_id:number) : Observable<ChatsResponse> {
    return this.http.get<ChatsResponse>('chats/latest/'+username+'?chat_id='+chat_id).pipe(
      retry(2),
      catchError((error:HttpErrorResponse) => throwError(error.message))
    )
  }
  
  /**
   * Sent user text to api
   * 
   * @param chat 
   * @return An `Observable` of type `SendTextResponse`
   */
  sendText(chat:SendText) : Observable<SendTextResponse> {
    return this.http.post<SendTextResponse>('chats/send/text', chat).pipe(
      retry(2),
      catchError((error:HttpErrorResponse) => throwError(error.message))
    )
  }

  /**
   * Delete a text from api
   * 
   * @param chatId Chat ID
   * @returns An `Observable` of type `Response`
   */
  deleteText(chatId:number) {
    return this.http.post<Response>('chats/delete', {'chat_id': chatId}).pipe(
      retry(2),
      catchError((error:HttpErrorResponse) => throwError(error.message))
    )
  }

  /**
   * Clear all friend chats from api
   * 
   * @param username Friend Usernaem
   * @return An `Observable` of type `Response`
   */
  clearChats(username:string) : Observable<Response> {
    return this.http.post<Response>('chats/clear/all', {'username':username}).pipe(
      retry(2),
      catchError((error:HttpErrorResponse) => throwError(error.message))
    )
  }
  
}
