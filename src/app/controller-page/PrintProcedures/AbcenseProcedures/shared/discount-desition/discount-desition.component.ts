import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProcedureDataService } from 'src/app/controller-page/procedure-data.service';
import { OrgDetails } from 'src/app/shared/Models/OrgDetails.model';
import { ProcedureDetail } from 'src/app/shared/Models/ProceduerDetail.model';
import { OrganizationService } from 'src/app/shared/Services/organization.service';

@Component({
  selector: 'app-discount-desition',
  templateUrl: './discount-desition.component.html',
  styleUrls: ['./discount-desition.component.css']
})
export class DiscountDesitionComponent implements OnInit,OnDestroy {
  @Input('daysNum')daysNum:string;
  employees:ProcedureDetail[];
 orgDetails:OrgDetails;
 procedureSub:Subscription;
 orgSub:Subscription;
 constructor(private router: Router, private procedure: ProcedureDataService,
    private route: ActivatedRoute,private orgServices:OrganizationService) {
 }

 ngOnInit() {
   this.orgSub=this.orgServices.getOrgDetails(+localStorage.getItem('orgId')).subscribe(res=>{this.orgDetails=res;
   this.procedureSub=this.procedure.data$.subscribe(res => { this.employees = res;})
  //  const id = +this.route.snapshot.routeConfig.path
   
  //  if (id ==7||id==8) {
  //      setTimeout(() => {
  //      window.print();
  //      this.router.navigate([''])
  //    }, 20);
  //  }
  
 })}
 ngOnDestroy(): void {
   this.procedureSub.unsubscribe();
   this.orgSub.unsubscribe();
} 

}
