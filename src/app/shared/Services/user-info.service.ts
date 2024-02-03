import { Injectable } from '@angular/core';
import { ResponseData } from '../Models/ResponseData.model';
import { HttpClient } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
  baseUrl = "http://innovitix.com:8001/kannan/";

  // token = new BehaviorSubject<string>(null);

  constructor(private http: HttpClient, private router:Router) { }

  userLogIn(data: { UserName: string, Password: string }) {
   return this.http.post<ResponseData>(this.baseUrl + "user/login", data)
   .pipe(catchError(err => {
    this.router.navigate(['logIn']);
      alert(err.message)
    return throwError(() => new Error(err));
 }))
  }
  
}
