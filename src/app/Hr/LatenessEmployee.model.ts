export class LatenessEmployee{
    EmployeeId:number;
    ArrivingTime:string;
    IsAbsent:boolean;
    Notes?:string;
    Status?:string;
    

    /**
     *
     */
    constructor(employeeId:number,arrivingTime:string,isAbsent:boolean,notes:string) {
        this.EmployeeId=employeeId;
        this.ArrivingTime=arrivingTime;
        this.IsAbsent=isAbsent;
        this.Notes=notes;
        
    }
}