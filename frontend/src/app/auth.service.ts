import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000'; // Update with your Express.js server URL

  constructor(private http: HttpClient) { }

  // User registration
  registerUser(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, userData);
  }

  // User sign-in
  signInUser(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/signin`, credentials);
  }
}
