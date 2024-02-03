import { Component, OnInit } from '@angular/core';
import { OrganizationService } from '../shared/Services/organization.service';
import { OrgDetails } from '../shared/Models/OrgDetails.model';

@Component({
  selector: 'app-organization-data',
  templateUrl: './organization-data.component.html',
  styleUrls: ['./organization-data.component.css']
})
export class OrganizationDataComponent implements OnInit{
  orgName:string;
  orgType:string;
  orgRegion:string;
  bossName:string;
  startTime:string;
  bossId:string;
  editFlag:boolean=false;
  orgId:number=1;

  /**
   *
   */
  constructor(private orgService:OrganizationService) {
   
  }

  ngOnInit(): void {
    this.orgId=+localStorage.getItem('orgId')
      this.orgService.getOrgDetails(this.orgId).subscribe(res=>{
      this.orgName=res.OrgName;
      this.orgType=res.OrgType;
      this.bossName=res.ManagerName;
      this.bossId=res.NationalId;
      this.orgRegion=res.Region;
      this.startTime=res.StartTime;

  })
  }
  onSubmit(){
    
    if(this.editFlag==true){
      const orgDetails=new OrgDetails(this.orgId,this.orgName,this.orgType,this.bossName,this.bossId,this.orgRegion,this.startTime)
      
      this.orgService.updateOrgDetails(orgDetails).subscribe({
        
        next:res=>{
          if(res.RespCode!="00")alert(res.RespMsg);
        },
       error: (error: any) => {
        alert('خطأ... لم يتم الحفظ رجاء التأكد من اتصال الانترنت وإعادة المحاولة');
      }
      })
    }
    this.editFlag=!this.editFlag;
  }

}
