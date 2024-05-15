import {
  HttpErrorResponse,
  HttpEvent,
  HttpInterceptorFn,
  HttpResponse,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, of, tap } from 'rxjs';
import { LocalStorageService } from '../services/local-storage.service';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const localStorageService = inject(LocalStorageService)

  return next(req).pipe(
    tap((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        localStorageService.setItem('token', event.body.accessToken);
      }
      return event;
    }))
};
