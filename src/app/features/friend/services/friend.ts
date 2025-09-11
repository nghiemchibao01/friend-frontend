import { Injectable } from '@angular/core';
import { Friend as FriendModel } from '../../friend/models/Friend';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FriendService {
  private apiUrl = 'http://localhost:8080/api/friends';

  constructor(private http: HttpClient) { }


  getFriends(): Observable<FriendModel[]> {
    var friends = this.http.get<FriendModel[]>(this.apiUrl);
    console.log(friends);
    return friends;
  }

  getFriendById(id: number): Observable<FriendModel> {
    return this.http.get<FriendModel>(`${this.apiUrl}/${id}`);
  }

  createFriend(friend: FriendModel): Observable<FriendModel> {
    return this.http.post<FriendModel>(this.apiUrl, friend);
  }

  updateFriend(id: number, friend: FriendModel): Observable<FriendModel> {
    return this.http.put<FriendModel>(`${this.apiUrl}/${id}`, friend);
  }

  deleteFriend(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
