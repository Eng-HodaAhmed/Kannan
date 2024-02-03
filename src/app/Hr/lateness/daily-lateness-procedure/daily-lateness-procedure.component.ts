import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProcedureDetail } from 'src/app/shared/Models/ProceduerDetail.model';
import { ProcedureDataService } from '../../../controller-page/procedure-data.service';
import { Subscription } from 'rxjs';
import { OrganizationService } from 'src/app/shared/Services/organization.service';
import { OrgDetails } from 'src/app/shared/Models/OrgDetails.model';
import { LatenessDetails } from 'src/app/Hr/LatenessDetailes.model';
import { Employee } from 'src/app/Hr/Employee.model';
import uq from '@umalqura/core';

@Component({
  selector: 'app-daily-lateness-procedure',
  templateUrl: './daily-lateness-procedure.component.html',
  styleUrls: ['./daily-lateness-procedure.component.css']
})
export class DailyLatenessProcedureComponent implements OnInit,OnDestroy {
  employeeLateDetails:LatenessDetails;
  employeeDetails:Employee;
  hegriDate:string;
  day:string;
  orgDetails:OrgDetails;
  procedureSub:Subscription;
  orgSub:Subscription;
  date:string;
  constructor(private router: Router, private procedure: ProcedureDataService,
     private route: ActivatedRoute,private orgServices:OrganizationService) {

  }

  ngOnInit() {
    this.displayHijriDate(new Date());
    this.orgSub=this.orgServices.getOrgDetails(+localStorage.getItem('orgId')).subscribe(res=>{this.orgDetails=res;
    this.procedureSub=this.procedure.printedLateEmployee.subscribe(res => { this.employeeLateDetails= res.details;
    this.employeeDetails=res.employeeDetail;this.hegriDate=res.hegriDate.Date;this.day=res.hegriDate.Day })
    setTimeout(() => {
      window.print();
      this.router.navigate(['addLateness'])
    }, 20);  
  })

}

displayHijriDate(value: Date) {
  const d = uq(value).format('fullDate', 'ar');
  this.day=d.split("،")[0];
  const dateh = uq(value).format('d-M-yyyy', 'ar');
  this.date=dateh;
 
}
ngOnDestroy(): void {
    this.procedureSub.unsubscribe();
}
  
}
