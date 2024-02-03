import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProcedureDataService } from 'src/app/controller-page/procedure-data.service';
import { OrgDetails } from 'src/app/shared/Models/OrgDetails.model';
import { ProcedureDetail } from 'src/app/shared/Models/ProceduerDetail.model';
import { OrganizationService } from 'src/app/shared/Services/organization.service';

@Component({
  selector: 'app-procedure3',
  templateUrl: './procedure3.component.html',
  styleUrls: ['./procedure3.component.css']
})
export class Procedure3Component implements OnInit, OnDestroy{
  
  employees: ProcedureDetail[];
  orgDetails: OrgDetails;
  procedureSub: Subscription;
  orgSub: Subscription;
  days:string="ستة أيام";
  proName:string="لفت نظر لغياب أيام بدون عذر"
  text:string="نظراً لتكرار غيابك ستة أيام وقد سبق تنبيهك شفوياً وخطياً ،وأخذ تعهد خطي عليك،لذا وجب لفت نظرك"

  constructor(private router: Router, private procedure: ProcedureDataService,
    private orgServices: OrganizationService) {

  }
  ngOnInit(){
    this.orgSub = this.orgServices.getOrgDetails(+localStorage.getItem('orgId')).subscribe(res => {
      this.orgDetails = res;

      this.procedureSub = this.procedure.data$.subscribe(res => {
        this.employees = res;
        setTimeout(() => {
          window.print();
          this.router.navigate(['controllerPage'])
        }, 20);
      })
    }
    )
  }
  ngOnDestroy(): void {
    this.procedureSub.unsubscribe();
    this.orgSub.unsubscribe();
  }

}
