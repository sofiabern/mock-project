import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { AuthApiService } from './auth.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

export const AuthInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const authService = inject(AuthApiService);
  const router = inject(Router);

  const authToken = authService.getToken();

  // Перевірка, чи запит є запитом на реєстрацію або вхід
  if (authToken && !req.url.includes('/auth/signup') && !req.url.includes('/auth/login')) {
    // Додаємо токен до заголовків, якщо запит не на реєстрацію чи вхід
    const authReq = req.clone({
      setHeaders: { Authorization: `Bearer ${authToken}` }
    });

    return next(authReq).pipe(
      catchError((error) => {

        if (error.status === 401) {
          authService.handleUnauthorized();
        }

        return throwError(() => error);
      })
    );
  } else {
    // Пропускаємо додавання токена для запитів на реєстрацію чи вхід
    return next(req);
  }
};
