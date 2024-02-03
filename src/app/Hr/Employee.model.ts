export class Employee{
    public Id?: number;
    public EmployeeName:string; 
    public EmployeeIDNum: string;
    public Major: string;
    public Level?: string;
    public CurrentJob: string;
    public JobType: string;
    public StartDate: string;
    public JobNumber?: string;
    public Status?:string;
    public JobName?:string;
    
    constructor(name:string,idNum:string,major:string,
        jobType:string,startDate:string,currentJob:string,level?:string,jobName?:string,jobNumber?:string,id?:number) {
        
        this.EmployeeName=name;
        this.EmployeeIDNum=idNum;
        this.Major=major;
        this.JobType=jobType;
        this.StartDate=startDate;
        this.CurrentJob=currentJob;
        this.Level=level;
        this.JobName=jobName;
        this.JobNumber=jobNumber;
        this.Id=id
       
    }

}