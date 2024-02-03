import { Injectable } from '@angular/core';
import { RequestesService } from './requestes.service';
import { Subject, Subscription, catchError, throwError } from 'rxjs';
import { ProcedureDetail } from '../Models/ProceduerDetail.model';
import { HttpClient } from '@angular/common/http';
import { ResponseData } from '../Models/ResponseData.model';
import { UserInfoService } from './user-info.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AbsenceAndLatenessDataService {
  baseUrl = "http://innovitix.com:8001/kannan/";
  hegriApi = "http://api.aladhan.com/v1/gToH/"
  token: string;
  tokenSub: Subscription;
  procedureDetails = new Subject<ProcedureDetail[]>();



  constructor(private requests: RequestesService, private http: HttpClient
    , private userInfo: UserInfoService,private router:Router) { }

  FindProceduer(id: number) {
    this.token=localStorage.getItem('token')
    return this.http.post<{ Procedures: ProcedureDetail[] }>(this.baseUrl + "procedures/find", { procedureId: id, Token: this.token })
    .pipe(catchError(err => {
      alert(err.message)
    return throwError(() => new Error(err));
   }))
  }

  updateProcedure(params: { isPrinted?, isSigned, employeeId, procedureId }) {
    return this.http.post<ResponseData>(this.baseUrl + "procedures/update", {
      isPrinted: params.isPrinted,
      isSigned: params.isSigned, employeeId: params.employeeId,
      procedureId: params.procedureId, Token: this.token
    }) .pipe(catchError(err => {
      alert(err.message)
    return throwError(() => new Error(err));
   }))

  }
}
