import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ProcedureDetail } from '../shared/Models/ProceduerDetail.model';
import { LatenessDetails } from '../Hr/LatenessDetailes.model';
import { Employee } from '../Hr/Employee.model';

@Injectable({
  providedIn: 'root'
})
export class ProcedureDataService {
  procrdureNumber:number;
  procedureData=new Subject<ProcedureDetail[]>();
  printedLateEmployee=new  BehaviorSubject<{details:LatenessDetails,hegriDate:{Day:string,Date:string},employeeDetail:Employee}>(null);

  printedEmployee=new BehaviorSubject<ProcedureDetail[]>(null);
  public data$ = this.printedEmployee.asObservable();
  

  constructor() { }

 
}
