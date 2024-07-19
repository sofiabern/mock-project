import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap, switchMap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

// Types
import { User, SignupApiResponse, LoginApiResponse, LogoutApiResponse } from './user.types';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {
  private apiUrl = 'https://mock-beckend.onrender.com/auth';

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient, private toastr: ToastrService) {
    this.checkInitialAuthentication();
  }

  private checkInitialAuthentication(): void {
    const token = localStorage.getItem('token');
    this.isAuthenticatedSubject.next(!!token);
  }

  signup(user: User): Observable<SignupApiResponse> {
    return this.http.post<SignupApiResponse>(`${this.apiUrl}/signup`, user).pipe(
      tap(() => this.toastr.success('Signup successful!')),
      catchError((error: HttpErrorResponse) => this.handleError(error))
    );
  }

  signupAndLogin(userData: User): Observable<LoginApiResponse> {
    return this.signup(userData).pipe(
      switchMap(() => this.login({ email: userData.email, password: userData.password }))
    );
  }

  login(user: Omit<User, 'name'>): Observable<LoginApiResponse> {
    return this.http.post<LoginApiResponse>(`${this.apiUrl}/login`, user).pipe(
      tap((response: LoginApiResponse) => {
        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
          this.isAuthenticatedSubject.next(true);
          this.toastr.success('Login successful!');
        }
      }),
      catchError((error: HttpErrorResponse) => this.handleError(error))
    );
  }

  getCurrentUser(): Observable<Omit<User, 'name'>> {
    return this.http.get<Omit<User, 'name'>>(`${this.apiUrl}/current`);
  }
  
  logout(): Observable<LogoutApiResponse> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post<LogoutApiResponse>(`${this.apiUrl}/logout`, {}, { headers }).pipe(
      tap(() => {
        localStorage.removeItem('token');
        this.isAuthenticatedSubject.next(false);
        this.toastr.success('Logout successful!');
      }),
      catchError((error: HttpErrorResponse) => this.handleError(error))
    );
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unexpected error occurred. Please try again later.';
  if (error.status === 409) {
    errorMessage = 'The email address you provided is already registered. Please use a different email or log in.';
  } else if (error.status === 401) {
    errorMessage = 'The credentials you entered are incorrect. Please double-check and try again.';
  } else if (error.status === 404) {
    errorMessage = 'We couldn’t find an account with that email address. Please check and try again.';
  }


    this.toastr.error(errorMessage);

    return throwError(() => new Error(errorMessage));
  }
}
