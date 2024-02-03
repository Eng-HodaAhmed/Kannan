import { Injectable} from '@angular/core';
import { RequestesService } from './requestes.service'
import { Employee } from '../../Hr/Employee.model';
import { Subject, Subscription, catchError, throwError } from 'rxjs';
import { Release } from '../../Hr/Release.modal';
import { LatenessDetails } from '../../Hr/LatenessDetailes.model';
import { HttpClient } from '@angular/common/http';
import { ResponseData } from '../Models/ResponseData.model';
import { UserInfoService } from './user-info.service';
import { ReportsResponse } from '../Models/reportsResponse.model';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class EmployeesDataService {
  baseUrl = "http://innovitix.com:8001/kannan/";
  hegriApi = "http://api.aladhan.com/v1/gToH/"


  employees = new Subject<Employee[]>();
  employedEmployees = new Subject<Employee[]>();
  // latenessDetails = new Subject<LatenessDetails[]>();
  latenessDetailsWithId = new Subject<LatenessDetails[]>();
  absenceDetailsWithId = new Subject<LatenessDetails[]>();
  latenessEmployees = new Subject<LatenessDetails[]>();
  getEmpSup: Subscription;
  lateSub: Subscription;
  tokenSub: Subscription;
  token: string

  constructor(private dataServices: RequestesService, private http: HttpClient,
    private userInfo: UserInfoService,private router:Router) {


  }

  getEmployees() {
    this.token = localStorage.getItem('token')
    this.getEmpSup = this.http.post<{ Employees: Employee[] }>(this.baseUrl + "employees", { Token: this.token })
      .pipe(catchError(err =>{
        alert(err.message)
      return throwError(() => new Error(err));
      } ))
      .subscribe(res => {
        this.employees.next(res.Employees);
        this.employedEmployees.next(res.Employees.filter((emp => emp.Status == "employed")))

      });


  }

  addEmployee(employee: Employee) {
    return this.http.post<{ "RespCode": string, "RespMsg": string, "EmployeeId": number }>
      (this.baseUrl + 'employees/add', { ...employee, Token: this.token })
      .pipe(catchError(err => {
        alert(err.message)
      return throwError(() => new Error(err));
     }))
  }

  getEmployee(id: number) {
    var editEmp: Employee;
    this.employedEmployees.forEach(emp => {
      emp.forEach(element => {
        if (element.Id == id) return editEmp = element
      });
    })
    return editEmp;
  }

  updateEmployee(employee: Employee) {
    return this.http.post<ResponseData>(this.baseUrl + "employees/update", { ...employee, Token: this.token })
    .pipe(catchError(err =>{
      alert(err.message)
    return throwError(() => new Error(err));
    } ))
  }

  releaseEmployee(releasedEmp: Release) {

    return this.http.post<ResponseData>(this.baseUrl + "employees/release", { ...releasedEmp, Token: this.token })
    .pipe(catchError(err =>{
      alert(err.message)
    return throwError(() => new Error(err));
    } ))
  }

  /*********************************************** */

  addLateness(latenessData: LatenessDetails) {

    return this.http.post<ResponseData>(this.baseUrl + "lateness/add", { ...latenessData, Token: this.token })
    .pipe(catchError(err => {
      alert(err.message)
    return throwError(() => new Error(err));
   }))
  }

  fechLatenessDetails(lateness: { employeeId: number, date?: string }) {
    this.lateSub = this.http.post<{ LatenessDetails: LatenessDetails[] }>(this.baseUrl + "lateness/find", { ...lateness, Token: this.token })
    .pipe(catchError(err => {
      alert(err.message)
    return throwError(() => new Error(err));
   }))
    .subscribe(res => {
      if (lateness.employeeId != 0) {

        this.latenessDetailsWithId.next(res.LatenessDetails?.filter(emp => emp.IsAbsent === false));

      } else {
        let result = res.LatenessDetails?.filter(emp => emp.IsAbsent === false)

        this.latenessEmployees.next(res.LatenessDetails?.filter(emp => emp.IsAbsent === false));
        // this.latenessDetails.next(res.LatenessDetails);
      }
    })

  }



  fechAbsenceDetails(lateness: { employeeId: number, date?: string }) {

    this.lateSub = this.http.post<{ LatenessDetails: LatenessDetails[] }>(this.baseUrl + "lateness/find", { ...lateness, Token: this.token })
    .pipe(catchError(err => {
      alert(err.message)
    return throwError(() => new Error(err));
   }))
    .subscribe(res => {

      if (lateness.employeeId != 0) {

        this.latenessDetailsWithId.next(res.LatenessDetails?.filter(emp => emp.IsAbsent === true));

      }
      else {

        console.log(res.LatenessDetails?.filter(emp => emp.IsAbsent === true))
        this.latenessEmployees.next(res.LatenessDetails?.filter(emp => emp.IsAbsent === true))

      }
    })
  }
  deleteLatenessDetail({ latenessId: number }) {

    return this.http.post<ResponseData>(this.baseUrl + "lateness/delete", { latenessId: number, Token: this.token })
    .pipe(catchError(err => {
      alert(err.message)
    return throwError(() => new Error(err));
   }));
  }

  updateAbsenceDetails(abcenseDetails) {

    return this.http.post<ResponseData>(this.baseUrl + "lateness/update", { ...abcenseDetails, Token: this.token })
    .pipe(catchError(err => {
      alert(err.message)
    return throwError(() => new Error(err));
   }))
  }

  employeesReport(token: string) {
    return this.http.post<ReportsResponse>(this.baseUrl + "reports/employee_lateness", { token }).
    pipe(catchError(err => {
      alert(err.message)
      return throwError(() => new Error(err));
    }))
  }



}
