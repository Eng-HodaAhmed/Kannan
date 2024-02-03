export class Registeration{
    FullName: string
    IdNum: string
    MobileNum: string
    Email: string
    OrgName?: string
    OrgType?: string
    OrgNationalId?: string
    OrgRegion?: string
    OrgManagerName?: string

    /**
     *
     */
    constructor(fullName,idNum,mobile,email,orgName?,orgType?,orgId?,orgRegion?,orgManager?) {
        this.FullName=fullName;
        this.IdNum=idNum;
        this.MobileNum=mobile;
        this.Email=email;
        this.OrgName=orgName;
        this.OrgType=orgType;
        this.OrgNationalId=orgId;
        this.OrgRegion=orgRegion;
        this.OrgManagerName=orgManager
        
    }
}