

import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private router:Router){}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'خطأ غير معروف';
    
        if (error.status === 0) {
            errorMessage = 'خطأ... يرجى التأكد من اتصال الإنترنت وإعادة المحاولة'
        }
        // Customize error message based on the error status or other conditions
       else if (error.status === 401) {
          errorMessage = 'خطأ... يرجى تسجيل الدخول وإعادة المحاولة';
          this.router.navigate(['logIn'])
        } else if (error.status === 403) {
          errorMessage = 'Forbidden';
        } else if (error.status === 404) {
          errorMessage = 'خطأ... لا توجد بيانات';
        }
        else{
            errorMessage = `خطأ  ... رقم الكود: ${error.status}`;
        }
        

        // Return a new observable with an error message
        return throwError(() => new Error(errorMessage));
      })
    );
  }
}
