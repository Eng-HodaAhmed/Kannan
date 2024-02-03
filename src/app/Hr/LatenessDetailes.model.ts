export class LatenessDetails {
    
    LatenessId: number
    EmployeeId: number
    EmployeeName: string
    ArrivingTime: string
    IsAbsent: boolean
    Status: string
    Notes: string
    LateMins: number
    CanBeDeleted:number
    HijriDate:string;
    // Day:string;
    StartTime:string;
  

    /**
     *
     */
    constructor(empId:number,arrivingTime:string,hegriDate:string,isAbsent:boolean,minLate:number,status?:string,notes?:string)
     {
            // this.LatenessId=lateId;
            this.EmployeeId=empId;
            // this. EmployeeName=empName;
            this.ArrivingTime=arrivingTime; 
            this.HijriDate=hegriDate;
            this.LateMins=minLate;
            this.IsAbsent=isAbsent;
            this.Status=status;
            this.Notes=notes;
            
        
        }
}