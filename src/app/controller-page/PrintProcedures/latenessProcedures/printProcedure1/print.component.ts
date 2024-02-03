import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProcedureDataService } from '../../../procedure-data.service';
import { ProcedureDetail } from 'src/app/shared/Models/ProceduerDetail.model';
import { Subscription } from 'rxjs/internal/Subscription';
import { OrganizationService } from 'src/app/shared/Services/organization.service';
import { OrgDetails } from 'src/app/shared/Models/OrgDetails.model';


@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.css']
})
export class PrintComponent implements OnInit,OnDestroy {
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
