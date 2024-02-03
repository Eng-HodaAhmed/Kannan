export class OrgDetails{
    OrgId:number
    RespCode: string
    RespMsg: string
    OrgName: string
    OrgType: string
    ManagerName:string
    NationalId: string
    Region: string
    StartTime:string

    /**
     *
     */
    constructor(orgId:number,orgName:string,orgType:string,managerName:string,nationalId:string,region:string,startTime:string) {
       this.OrgId=orgId;
        this.OrgName=orgName;
       this.OrgType=orgType;
       this.ManagerName=managerName;
       this.NationalId=nationalId;
       this.Region=region;
       this.StartTime=startTime
        
    }
}