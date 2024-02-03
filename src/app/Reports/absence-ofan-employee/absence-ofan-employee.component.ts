import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Employee } from 'src/app/Hr/Employee.model';
import { LatenessDetails } from 'src/app/Hr/LatenessDetailes.model';
import { OrgDetails } from 'src/app/shared/Models/OrgDetails.model';
import { EmployeesDataService } from 'src/app/shared/Services/employees-data.service';
import { OrganizationService } from 'src/app/shared/Services/organization.service';
import { RequestesService } from 'src/app/shared/Services/requestes.service';

@Component({
  selector: 'app-abcense-ofan-employee',
  templateUrl: './absence-ofan-employee.component.html',
  styleUrls: ['./absence-ofan-employee.component.css']
})
export class AbsenceOfanEmployeeComponent implements OnInit, OnDestroy {
  orgDetails: OrgDetails;

  employedEmp: Employee[] = [];
  empName: string = ""

  hegriDate: string;
  day: string;
  latenessDetails: LatenessDetails[] = [];
  abcensetypDetails: LatenessDetails[] = [];
  empFlag: boolean = false;
  orgSub: Subscription;
  employedSub: Subscription;
  latenessSub: Subscription;
  hegriSub: Subscription;



  constructor(private empService: EmployeesDataService, private dataStorage: RequestesService,
    private datePipe: DatePipe, private empServices: EmployeesDataService, private router: Router,
    private cdRef: ChangeDetectorRef, private orgServices: OrganizationService) {
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

  fechAbcenseDetails(id: number) {
    let options = { weekday: 'long', hour12: false } as Intl.DateTimeFormatOptions;
    this.empFlag = true;
    this.latenessDetails = [];
    if (this.empService.lateSub) this.empService.lateSub.unsubscribe();
    if (this.latenessSub) this.latenessSub.unsubscribe();
  
    this.empServices.fechAbsenceDetails({ employeeId: +id });
    this.latenessSub = this.empService.latenessDetailsWithId.subscribe(res => {
     
      res.forEach(async (element, index) => {
        let date = new Date(element.ArrivingTime)
        let arabicDay = new Intl.DateTimeFormat('ar', options).format(date);
        element['HegriDate'] = this.hegriDate;
        element['Day'] = arabicDay;
        this.latenessDetails.push(element)

      })
     this.abcensetypDetails=this.latenessDetails;
    })
  }
  Onback() {
    this.router.navigate(['controllerPage'])
  }
  fechAbcenseType(type: string) {

    this.latenessDetails = this.abcensetypDetails;
    this.latenessDetails = this.latenessDetails.filter(res => { return res.Status == type })
  }

  ngOnDestroy(): void {
    this.orgSub.unsubscribe();
    this.employedSub.unsubscribe();
    this.empService.getEmpSup.unsubscribe();
  }
}
