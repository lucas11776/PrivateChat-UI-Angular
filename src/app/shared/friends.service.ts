import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { SearchFriends, FriendsChatPreview } from '../model/friends';

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
   * Get user friends chats preview from api
   * 
   * @return An `Observable` of type `Friend[]`
   */
  friendsChatPreview() : Observable<FriendsChatPreview[]> {
    return this.http.get<FriendsChatPreview[]>('api/friends').pipe(
      retry(2),
      catchError((error:HttpErrorResponse) => throwError(error.message))
    );
  }

  /**
   * Get user friends request
   * 
   * @return An `Observable` of type `FriendRequest[]`
   */
  friendsRequests() {
    return this.http.get<any>('api/friends/requests').pipe(
      retry(2),
      catchError((error:HttpErrorResponse) => throwError(error.message)
      )
    );
  }

  /**
   * Accept friends requests
   * 
   * @return AN `Observable` of type ``
   */
  acceptFriendRequest(username:string) {
    return this.http.post('api/friends/requests/accept', {'username': username}).pipe(
      retry(2),
      catchError((error:HttpErrorResponse) => throwError(error.message))
    );
  }

}
