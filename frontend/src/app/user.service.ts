import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


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
}
