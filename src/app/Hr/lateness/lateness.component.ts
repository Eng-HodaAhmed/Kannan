import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import {  Subscription } from 'rxjs';
import { EmployeesDataService } from 'src/app/shared/Services/employees-data.service';
import { Employee } from '../Employee.model';
import { LatenessDetails } from '../LatenessDetailes.model';
import { ProcedureDataService } from 'src/app/controller-page/procedure-data.service';
import {  Router } from '@angular/router';
import { OrganizationService } from 'src/app/shared/Services/organization.service';
import { TypeaheadOrder } from 'ngx-bootstrap/typeahead';
import uq from '@umalqura/core';
@Component({
  selector: 'app-lateness',
  templateUrl: './lateness.component.html',
  styleUrls: ['./lateness.component.css']
})
export class LatenessComponent implements OnInit, OnDestroy {
  datepickerModel = new Date();
  locale = 'ar';
  minTime: Date = new Date();
  maxTime: Date = new Date();
  empNames: string[] = [];
  employees: Employee[];
  lateEmployees: LatenessDetails[];
  hegriDate: string;
  day: string;

  arrivingDateTime: string;
  RespCode: number = 0;
  Id: number;
lateMin:string[]=[]


  empName: string = "";
  newLatnessFlag: number = 0;

  arrivingTime: Date = new Date();
  myTime: Date = new Date();

  minLate: string;
  startTime: Date;
  totalMinLate: number = 0;
  employedSub: Subscription;
  submitSub: Subscription
  latenessEmpDetailSub: Subscription;
  orgSub: Subscription;

  sortConfig: TypeaheadOrder = {
    direction: 'asc'
  };
  constructor(private localeService: BsLocaleService, private procedureData: ProcedureDataService,
    private empServices: EmployeesDataService, private orgService: OrganizationService,
    private datePipe: DatePipe, private rout: Router) {
    this.localeService.use(this.locale);
    this.minTime.setHours(6);
    this.minTime.setMinutes(0);
    this.maxTime.setHours(23);
    this.maxTime.setMinutes(55);

    //  this.displayHijriDate(this.datepickerModel);

  }

  ngOnInit(): void {


    this.empServices.getEmployees();

    this.employedSub = this.empServices.employedEmployees.subscribe(emp => { this.employees = emp; this.empNames = this.employees.map((item) => item["EmployeeName"]); });
    this.orgSub = this.orgService.getOrgDetails(+localStorage.getItem('orgId')).subscribe(res => {

      const [hours, minutes, seconds] = res.StartTime.split(':').map(Number);
      this.startTime = new Date();
      this.startTime.setHours(hours);
      this.startTime.setMinutes(minutes);
      this.startTime.setSeconds(seconds);
      // this.startTime.setMilliseconds(0);


    })

  }


displayHijriDate(value: Date) {
  const d = uq(value).format('fullDate', 'ar');
  this.day=d.split("،")[0];
  const dateh = uq(value).format('d-M-yyyy', 'ar');
  this.hegriDate=dateh;
 
}

  calculateMinLate(value: string, lateMin?: number) {
    this.totalMinLate = 0;
    const dateObject = new Date(value);
    this.totalMinLate = lateMin
    const hours = Math.floor(this.totalMinLate / 60);
    const minutes = this.totalMinLate % 60;
    return `${hours}ساعة ` + minutes + "دقيقة";

  }

  calculateNewMinLate() {
    
    this.totalMinLate = Math.floor((this.myTime.getTime() - this.startTime.getTime()) / (1000 * 60));
    const hours = Math.floor(this.totalMinLate / 60);
    const minutes = Math.floor(this.totalMinLate % 60);
    this.minLate = `${hours}ساعة ` + minutes + "دقيقة";

  }

  fechLatenessEmp(value: Date) {
    this.lateMin=[];
    this.displayHijriDate(value);
    this.unsupVariable();

    this.newLatnessFlag = 0;
    const formattedDate = this.datePipe.transform(value, 'yyyy-MM-dd');
    this.empServices.fechLatenessDetails({ employeeId: 0, date: formattedDate });

    this.latenessEmpDetailSub = this.empServices.latenessEmployees.subscribe(emp => { this.lateEmployees = emp;
      emp.forEach(element => {
      const mins=this.calculateMinLate(element.ArrivingTime.split(" ")[1],element.LateMins);
      this.lateMin.push(mins)
      
      
    });
    
    })

  }
  unsupVariable() {
    if (this.empServices.lateSub) this.empServices.lateSub.unsubscribe();
    if (this.latenessEmpDetailSub) this.latenessEmpDetailSub.unsubscribe();

  }

  formateDateTime(datepickerModel: Date) {
    const formattedDate = this.datePipe.transform(datepickerModel, 'yyyy-MM-dd');
    const formatedTime = this.datePipe.transform(this.myTime, 'HH:mm');
    this.arrivingDateTime = formattedDate + " " + formatedTime;
  }


  reset() {
   
    //  this.myTime=null;
    this.empName = ""
    this.minLate = null
  }

  onSaveLatenessData() {
    this.formateDateTime(this.datepickerModel);
    const emp = this.employees.find(emp => emp.EmployeeName == this.empName);
    if (emp) {
      // this.empId = +emp.EmployeeIDNum;
      this.Id = emp.Id;
      this.submitSub = this.empServices.addLateness(new LatenessDetails(this.Id, this.arrivingDateTime, this.hegriDate, false, this.totalMinLate)).subscribe({
        next: res => {
          if (res.RespCode == "00") {
            this.reset();
            this.newLatnessFlag = 0;
            this.fechLatenessEmp(this.datepickerModel)
            // setTimeout(() => this.RespCode = 0, 3000)
          }
          else if (res.RespCode == "05") {
            alert("تم اضافة هذا الموظف من قبل");
            this.reset();
          }
        },
        error: (error: any) => {
          alert('خطأ... لم يتم الحفظ رجاء التأكد من اتصال الانترنت وإعادة المحاولة');
        }
      })

    }
    else {
      alert("من فضلك أدخل اسم صحيح")
    }

  }
  onDeleteLateness(LatenessId: number) {
    if (window.confirm("هل تريد حذف هذا التأخير")) {

      this.submitSub = this.empServices.deleteLatenessDetail({ latenessId: LatenessId }).subscribe({
        next: res => {

          if (res.RespCode == "00") {
            this.fechLatenessEmp(this.datepickerModel);
            // this.RespCode = 1;
            // setTimeout(() => this.RespCode = 0, 3000)
          }
        },
        error: (error: any) => {
          alert('خطأ... لم يتم الحذف رجاء التأكد من اتصال الانترنت وإعادة المحاولة');
        }

      }

      )
    }
  }

  onPrint(id: number, empName: string) {
    const emp = this.employees.find(emp => emp.EmployeeName == empName);
    this.procedureData.printedLateEmployee.next({ details: this.lateEmployees[id], hegriDate: { Day: this.day, Date: this.hegriDate }, employeeDetail: emp });

    this.rout.navigate(['/print/dailyLateness'])
  }

  ngOnDestroy(): void {
    this.empServices.lateSub.unsubscribe();
    if (this.submitSub) this.submitSub.unsubscribe();
  }



}
