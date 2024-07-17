import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Types
import { User, SignupApiResponse, LoginApiResponse, LogoutApiResponse } from '../models/user.model';



@Injectable({
  providedIn: 'root'
})
export class AuthApiService {
  private apiUrl = 'https://mock-beckend.onrender.com/auth';

  constructor(private http: HttpClient) { }

  signup(user: User): Observable<SignupApiResponse> {
    return this.http.post<SignupApiResponse>(`${this.apiUrl}/signup`, user);
  }

  login(user: Omit<User, 'name'>): Observable<LoginApiResponse> {
    return this.http.post<LoginApiResponse>(`${this.apiUrl}/login`, user);
  }

  logout(userId: string): Observable<LogoutApiResponse> {
    return this.http.post<LogoutApiResponse>(`${this.apiUrl}/logout`, userId);

  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }
}
