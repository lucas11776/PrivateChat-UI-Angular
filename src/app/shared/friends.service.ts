import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { SearchFriends, FriendsChatPreview, Response, Friend, FriendRequest, FriendMessageCout} from '../model/friends';

@Injectable({
  providedIn: 'root'
})
export class FriendsService {

  constructor(private http: HttpClient) { }

  /**
   * Search from a user account in api
   * 
   * @param search Search term
   * @return An `Observable` of type `SearchFriends`
   */
  search(search:string) : Observable<SearchFriends> {
    return this.http.get<SearchFriends>('api/friends/search/'+search).pipe(
      retry(2),
      catchError((error:HttpErrorResponse) => throwError(error.message))
    );
  }

  /**
   * Get username account details
   * 
   * @param username Friend Username
   * @return An `Observable` of type `friend`
   */
  friendsDetails(username:string): Observable<Friend> {
    return this.http.get<Friend>('api/friends/details/' + username).pipe(
      retry(2),
      catchError((error:HttpErrorResponse) => throwError(error.message))
    );
  }

  /**
   * Check if user is friends with username or account
   * 
   * @param username Friend Username
   * @return An `Observable` of type `Response`
   */
  friendsUser(username:string) {
    return this.http.get<Response>('api/friends/user/' + username).pipe(
      retry(2),
      catchError((error:HttpErrorResponse) => throwError(error.message))
    )
  }

  /**
   * Get user friends chats preview from api
   * 
   * @return An `Observable` of type `FriendsChatPreview[]`
   */
  friendsChatPreview() : Observable<FriendsChatPreview[]> {
    return this.http.get<FriendsChatPreview[]>('api/friends/chat/preview').pipe(
      retry(2),
      catchError((error:HttpErrorResponse) => throwError(error.message))
    );
  }

  /**
   * Get user friends chats preview from api
   * 
   * @return An `Observable` of type `FriendMessageCout[]`
   */
  friends() : Observable<FriendMessageCout[]> {
    return this.http.get<FriendMessageCout[]>('api/friends').pipe(
      retry(2),
      catchError((error:HttpErrorResponse) => throwError(error.message))
    );
  }

  /**
   * Get user friends request
   * 
   * @return An `Observable` of type `FriendRequest[]`
   */
  friendsRequests() : Observable<FriendRequest[]> {
    return this.http.get<FriendRequest[]>('api/friends/requests').pipe(
      retry(2),
      catchError((error:HttpErrorResponse) => throwError(error.message)
      )
    );
  }

  /**
   * 
   * @param username friend username
   * @return An `Observable` of type `Response`
   */
  sendFriendRequest(username:string) : Observable<Response> {
    return this.http.post<Response>('api/friends/requests/send', {'username':username}).pipe(
      retry(2),
      catchError((error:HttpErrorResponse) => throwError(error.message)
      )
    );
  }

  /**
   * Accept friends requests
   * 
   * @param username friend username
   * @return AN `Observable` of type ``
   */
  acceptFriendRequest(username:string) : Observable<Response> {
    return this.http.post<Response>('api/friends/requests/accept', {'username':username}).pipe(
      retry(2),
      catchError((error:HttpErrorResponse) => throwError(error.message))
    );
  }

  /**
   * Accept friends requests
   * 
   * @param username friend username
   * @return AN `Observable` of type `Response`
   */
  declineFriendRequest(username:string) : Observable<Response> {
    return this.http.post<Response>('api/friends/requests/decline', {'username':username}).pipe(
      retry(2),
      catchError((error:HttpErrorResponse) => throwError(error.message))
    );
  }

  /**
   * Unfriend user friend
   *  
   * @param username friend username
   * @return An `Observable` of type `Response`
   */
  unfriend(username:string) {
    return this.http.post<Response>('api/friends/unfriend', {'username':username}).pipe(
      retry(2),
      catchError((error:HttpErrorResponse) => throwError(error.message))
    )
  }

  /**
   * Get friends last seen
   * 
   * @param username Friend Username
   */
  friendLastSeen(username:string): Observable<{'last_seen':number}> {
    return this.http.get<any>('api/friends/last/seen/' + username).pipe(
      retry(2),
      catchError((error:HttpErrorResponse) => throwError(error.message)) 
    )
  }

}
