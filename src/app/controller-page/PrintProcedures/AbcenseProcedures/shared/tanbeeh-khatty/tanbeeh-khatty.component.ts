import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProcedureDataService } from 'src/app/controller-page/procedure-data.service';
import { OrgDetails } from 'src/app/shared/Models/OrgDetails.model';
import { ProcedureDetail } from 'src/app/shared/Models/ProceduerDetail.model';
import { OrganizationService } from 'src/app/shared/Services/organization.service';

@Component({
  selector: 'app-tanbeeh-khatty',
  templateUrl: './tanbeeh-khatty.component.html',
  styleUrls: ['./tanbeeh-khatty.component.css']
})
export class TanbeehKhattyComponent implements OnInit, OnDestroy{
  @Input('daysNum')daysNum:string;
  @Input('procedureName')procedureName:string;
  @Input('text')text:string;
  employees: ProcedureDetail[];
  orgDetails: OrgDetails;
  procedureSub: Subscription;
  orgSub: Subscription;
 

  constructor(private router: Router, private procedure: ProcedureDataService,
    private orgServices: OrganizationService) {

  }
  ngOnInit(){
    this.orgSub = this.orgServices.getOrgDetails(+localStorage.getItem('orgId')).subscribe(res => {
      this.orgDetails = res;

      this.procedureSub = this.procedure.data$.subscribe(res => {
        this.employees = res;
        // setTimeout(() => {
          // window.print();
          // this.router.navigate([''])
        // }, 20);
      })
    }
    )
  }
  ngOnDestroy(): void {
    this.procedureSub.unsubscribe();
    this.orgSub.unsubscribe();
  } 


}
