import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProcedureDetail } from 'src/app/shared/Models/ProceduerDetail.model';
import { ProcedureDataService } from '../../../procedure-data.service';
import { Subscription } from 'rxjs';
import { OrgDetails } from 'src/app/shared/Models/OrgDetails.model';
import { OrganizationService } from 'src/app/shared/Services/organization.service';

@Component({
  selector: 'app-print-procedure5',
  templateUrl: './print-procedure5.component.html',
  styleUrls: ['./print-procedure5.component.css']
})
export class PrintProcedure5Component implements OnInit,OnDestroy {
  employees:ProcedureDetail[];
  orgDetails:OrgDetails;
  procedureSub:Subscription;
  orgSub:Subscription;
  /**
   *
   */
  constructor(private router:Router,private procedure:ProcedureDataService,
    private orgServices:OrganizationService) {
  
  }
  ngOnInit(){
    this.orgSub=this.orgServices.getOrgDetails(+localStorage.getItem('orgId')).subscribe(res=>{this.orgDetails=res;

      this.procedureSub=this.procedure.data$.subscribe(res=>{
        this.employees=res;
        setTimeout(() => {
          window.print();
          this.router.navigate(['controllerPage'])
        }, 20); 
        } )
      }
      )
  }
  ngOnDestroy(): void {
    this.procedureSub.unsubscribe();
    this.orgSub.unsubscribe();
}
}
