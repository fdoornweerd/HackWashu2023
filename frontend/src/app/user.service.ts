import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from './user';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getUserInfo(userId: number): Observable<any> {
    // Adjust the URL and request method as needed
    return this.http.get(`${this.apiUrl}/user/${userId}`).pipe(
      tap(response => {
        // You can perform additional actions here based on the response
        console.log('User info retrieved:', response);
      })
    );
  }

  getRecommendations(userId: number): Observable<User[]> {
    const url = `${this.apiUrl}/get-recommendations/${userId}`;
  
    return this.http.get<{ recommendations: User[] }>(url).pipe(
      map(response => response.recommendations), // Extract the 'recommendations' array
      tap(recommendations => {
        console.log('Recommendations retrieved successfully', recommendations);
      })
    );
  }

  likeUser(userId: number, likedUserId: number): Observable<any> {
    const url = `${this.apiUrl}/like-user/${userId}/${likedUserId}`;

    return this.http.post(url, null).pipe(
      tap(response => {
        // You can perform additional actions here based on the response
        console.log('User liked successfully', response);
      })
    );
  }

  checkForAllMatches(userId: number): Observable<any> {
    const url = `${this.apiUrl}/check-all-matches/${userId}`;
  
    return this.http.post(url, null).pipe(
      tap((response) => {
        // You can perform additional actions here based on the response
        console.log('Check for all matches result:', response);
      })
    );
  }
  
  

  // getRecommendations(userId: number): Observable<User[]> {
  //   // Adjust the URL as needed
  //   const url = `${this.apiUrl}/get-recommendations/${userId}`;

  //   return this.http.get<User[]>(url).pipe(
  //     tap(response => {
  //       // You can perform additional actions here based on the response
  //       //console.log('Recommendations retrieved:', response);
  //     })
  //   );
  // }
}
