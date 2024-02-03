import { Injectable } from '@angular/core';
import { RequestesService } from './requestes.service';
import { OrgDetails } from '../Models/OrgDetails.model';
import { HttpClient } from '@angular/common/http';
import { ResponseData } from '../Models/ResponseData.model';
import { UserInfoService } from './user-info.service';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService  {
  baseUrl="http://innovitix.com:8001/kannan/";
  hegriApi="http://api.aladhan.com/v1/gToH/"
  token:string;

  constructor(private request:RequestesService,private http:HttpClient
    ,private userInfo:UserInfoService,private router:Router) { }

  getOrgDetails(id:number){
    // this.userInfo.token.pipe(take(1)).subscribe(res=>{this.token=res;console.log("token"+this.token)})
    this.token=localStorage.getItem('token');
    return this.http.post<OrgDetails>(this.baseUrl+"org/data",{OrgId: id,Token:this.token})
    .pipe(catchError(err => {
      alert(err.message)
    return throwError(() => new Error(err));
   }))
  }
  
  updateOrgDetails(org:OrgDetails){
    return this.http.post<ResponseData>(this.baseUrl+"org/update",{...org,Token:this.token}).pipe(catchError(err => {
      alert(err.message)
      return throwError(() => new Error(err));
    }))
  }
}
