import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { OrgDetails } from 'src/app/shared/Models/OrgDetails.model';
import { EmployeesDataService } from 'src/app/shared/Services/employees-data.service';
import { OrganizationService } from 'src/app/shared/Services/organization.service';

@Component({
  selector: 'app-abcense-and-lateness-data',
  templateUrl: './absence-and-lateness-data.component.html',
  styleUrls: ['./absence-and-lateness-data.component.css']
})
export class AbsenceAndLatenessDataComponent implements OnInit, OnDestroy {
  empData:[  {
    EmployeeName: string,
    LateMins:number,
    AbsenceWithExecuse: number,
    AbsenceWithoutExecuse: number
}];
  orgDetails: OrgDetails;
  orgSub: Subscription;
  /**
   *
   */
  constructor(private orgServices: OrganizationService,private empService:EmployeesDataService,private router:Router) {}
  
  ngOnInit(): void {

    this.orgSub = this.orgServices.getOrgDetails(+localStorage.getItem('orgId')).subscribe(res => {
      this.orgDetails = res;
      console.log(this.orgDetails)
    })
    this.empService.employeesReport(localStorage.getItem("token")).subscribe(res=>{
      if(res.RespCode=="00"){
        console.log(res)
        let dateObject = new Date();
        res.Details.sort((a, b) => {
        
          return a.EmployeeName.localeCompare(b.EmployeeName);
      });
        this.empData=res.Details
        console.log(this.empData)
      
      }
    }
    )
  }
  Onback(){
    this.router.navigate(['controllerPage'])
  }
  ngOnDestroy(): void {
    this.orgSub.unsubscribe();
  }

}
