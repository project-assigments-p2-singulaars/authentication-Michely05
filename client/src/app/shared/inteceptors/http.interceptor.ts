import {
  HttpErrorResponse,
  HttpEvent,
  HttpInterceptorFn,
  HttpResponse,
} from '@angular/common/http';
import { catchError, of, tap } from 'rxjs';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    tap((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        // console.log(event.body)
        localStorage.setItem('token', event.body.accessToken);
        return event;
      }
      return event;
    })
    // ,catchError(error=>{
    //   if(error instanceof HttpErrorResponse){
    //   console.error('error',error.message)
    //   }
    //   return of(error);
    // }
  );
};
