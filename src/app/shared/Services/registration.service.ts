import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseData } from '../Models/ResponseData.model';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  baseUrl = "http://innovitix.com:8001/kannan/";
  constructor(private http: HttpClient) { }
  uploadPhoto(form){
    return this.http.post<{RespCode: string,RespMsg: string,Filename:string}>(this.baseUrl+"files/upload",form)
    .pipe(catchError(err => {
      alert(err.message)
    return throwError(() => new Error(err));
   }))
  }
registration(data){
  return this.http.post<{RespCode: string,RespMsg: string,UserName:string,Password:string,
  OrgId: number,Token:string}>(this.baseUrl + "user/registration", data)
  .pipe(catchError(err => {
    alert(err.message)
  return throwError(() => new Error(err));
 }))
}
subscribtion(data){
  return this.http.post<ResponseData>(this.baseUrl+"user/subscribe",data).pipe(catchError(err => {
    alert(err.message)
  return throwError(() => new Error(err));
 }))
}
}
