import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Types
import { User, SignupResponseApi, LoginResponseApi, LogoutResponseApi } from '../models/user.model';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://mock-beckend.onrender.com/auth';

  constructor(private http: HttpClient) { }

  signup(user: User): Observable<SignupResponseApi> {
    return this.http.post<SignupResponseApi>(`${this.apiUrl}/signup`, user);
  }

  login(user: Omit<User, 'name'>): Observable<LoginResponseApi> {
    return this.http.post<LoginResponseApi>(`${this.apiUrl}/login`, user);
  }

  logout(userId: string): Observable<LogoutResponseApi> {
    return this.http.post<LogoutResponseApi>(`${this.apiUrl}/logout`, userId);

  }
}
