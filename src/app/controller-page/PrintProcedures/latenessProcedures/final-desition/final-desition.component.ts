import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProcedureDetail } from 'src/app/shared/Models/ProceduerDetail.model';
import { ProcedureDataService } from '../../../procedure-data.service';
import { Subscription } from 'rxjs';
import { OrgDetails } from 'src/app/shared/Models/OrgDetails.model';
import { OrganizationService } from 'src/app/shared/Services/organization.service';
import { EmployeesDataService } from 'src/app/shared/Services/employees-data.service';

@Component({
  selector: 'app-final-desition',
  templateUrl: './final-desition.component.html',
  styleUrls: ['./final-desition.component.css']
})
export class FinalDesitionComponent implements OnInit, OnDestroy {
  employees: ProcedureDetail[];
  employeesLateness: number[];
  orgDetails: OrgDetails;
  procedureSub: Subscription;
  orgSub: Subscription;
  latenessDetailSub: Subscription;
  constructor(private router: Router, private procedure: ProcedureDataService,
    private route: ActivatedRoute, private orgServices: OrganizationService, private lateService: EmployeesDataService) {
  }

  ngOnInit() {
    const id = +this.route.snapshot.routeConfig.path;
    this.orgSub = this.orgServices.getOrgDetails(+localStorage.getItem('orgId')).subscribe(res => {
      this.orgDetails = res;
      this.procedureSub = this.procedure.data$.subscribe(res => {
        this.employees = res;
      });

      if (id == 7 || id == 8) {
        setTimeout(() => {
          window.print();
          this.router.navigate(['controllerPage'])
        }, 20);
      }
    })

  }

  calcHours(min:number){
   
    const hours = Math.floor(min / 60);
    const minutes = min % 60;
    return`${hours}ساعة ` +minutes+"دقيقة"; 
  }

  ngOnDestroy(): void {
    this.procedureSub.unsubscribe();
    this.orgSub.unsubscribe();

  }

}
