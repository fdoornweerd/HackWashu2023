import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { tap } from 'rxjs/operators';

interface SignInResponse {
  message: string;
  token: string;
  // Add other properties if they exist in the response
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api';
  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();
  private tokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  token$: Observable<string | null> = this.tokenSubject.asObservable();




  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {
    const isLoggedIn = !!localStorage.getItem('authToken');
    this.isLoggedInSubject.next(isLoggedIn);

    const token = this.getToken();
    this.tokenSubject.next(token);
  }

  // User registration
  registerUser(userData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/signup`, userData).pipe(
        tap(response => {
            const token = response.token;
            localStorage.setItem('authToken', token);
            this.isLoggedInSubject.next(true);
            this.tokenSubject.next(token); // Set the token in the tokenSubject
        })
    );
}

  // User sign-in
  signInUser(credentials: any): Observable<SignInResponse> {
    return this.http.post<SignInResponse>(`${this.apiUrl}/signin`, credentials).pipe(
      tap(response => {
        const token = response.token;
        localStorage.setItem('authToken', token);
        this.isLoggedInSubject.next(true);
        this.tokenSubject.next(token); // Set the token in the tokenSubject
      })
    );
  }

  profileSetup(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/profilesetup`, userData);
  }



  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  getDecodedToken(token: string): any {
    return this.jwtHelper.decodeToken(token);
  }

  getUserIdFromToken(): number {
    const token = localStorage.getItem('authToken');
    if (token) {
      
      const decodedToken: any = this.jwtHelper.decodeToken(token);
      console.log(decodedToken.userId)
      return decodedToken.userId;
    } 
    throw new Error("no user id")
  }
}
