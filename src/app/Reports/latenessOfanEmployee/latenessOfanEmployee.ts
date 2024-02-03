import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { EmployeesDataService } from '../../shared/Services/employees-data.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Employee } from '../../Hr/Employee.model';
import { RequestesService } from '../../shared/Services/requestes.service';
import { DatePipe } from '@angular/common';
import { LatenessDetails } from '../../Hr/LatenessDetailes.model';
import { OrgDetails } from '../../shared/Models/OrgDetails.model';
import { OrganizationService } from '../../shared/Services/organization.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lateness-employees',
  templateUrl: './latenessOfanEmployee.component.html',
  styleUrls: ['./latenessOfanEmployee.component.css']
})
export class latenessOfanEmployeeComponent implements OnInit, OnDestroy {
  orgDetails: OrgDetails;
  @ViewChild('f') form: NgForm;
  employedEmp: Employee[] = [];
  empName: string = ""
  hegriDate: string;
  day: string;
  latenessDetails: LatenessDetails[] = [];
  lateMinSum: number = 0;
  orgSub: Subscription;
  employedSub: Subscription;
  latenessSub: Subscription;
  hegriSub: Subscription;
  /**
   *
   */

  constructor(private empService: EmployeesDataService, private dataStorage: RequestesService,
    private datePipe: DatePipe, private empServices: EmployeesDataService,
    private cdRef: ChangeDetectorRef, private orgServices: OrganizationService, private router: Router) {


  }
  ngOnInit(): void {
    this.orgSub = this.orgServices.getOrgDetails(+localStorage.getItem('orgId')).subscribe(res => {
      this.orgDetails = res;
    })
    this.empService.getEmployees();
    this.employedSub = this.empService.employedEmployees.subscribe(emp => {
      emp.sort((a, b) => {

        return a.EmployeeName.localeCompare(b.EmployeeName);
      });
      this.employedEmp = emp;
    })
  }

  // async displayHijriDate(value: string) {
  // }

  fechLatenessDetails(id: number) {
    let options = { weekday: 'long', hour12: false } as Intl.DateTimeFormatOptions;
    this.latenessDetails = [];
    if (this.empService.lateSub) this.empService.lateSub.unsubscribe();
    if (this.latenessSub) this.latenessSub.unsubscribe();

    this.empServices.fechLatenessDetails({ employeeId: +id });
    this.latenessSub = this.empService.latenessDetailsWithId.subscribe(res => {
      
      this.lateMinSum = 0;
  
       res.forEach(async (element, index) => {
        this.lateMinSum += element.LateMins
        let date = new Date(element.ArrivingTime)
        let arabicDay = new Intl.DateTimeFormat('ar', options).format(date);
        element['Day'] = arabicDay;
        this.latenessDetails.push(element)
        console.log(this.latenessDetails)
      })
      
    }
    )

  }
  convertToTimeFormat(timeString: string): string {
    const [hours, minutes] = timeString.split(':');
    return `${hours}:${minutes}`;
  }
  onSubmit() {

  }
  Onback() {
    this.router.navigate(['controllerPage'])
  }

  ngOnDestroy(): void {
    this.employedSub.unsubscribe();
    this.empService.getEmpSup.unsubscribe();
  }
}
