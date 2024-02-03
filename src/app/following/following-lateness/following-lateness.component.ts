import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AbsenceAndLatenessDataService } from 'src/app/shared/Services/procedures.service';
import { EmployeeProcedure } from '../Employeeprocedure.model';

@Component({
  selector: 'app-following-lateness',
  templateUrl: './following-lateness.component.html',
  styleUrls: ['./following-lateness.component.css']
})
export class FollowingLatenessComponent implements OnInit,OnDestroy {

  // procedures: ProcedureDetail[];
  // groupedEmployees: { [key: string]: ProcedureDetail[] };
  followingSub: Subscription;
  updateSub:Subscription;
  employeeProcedure:EmployeeProcedure;
  map=new Map<number,EmployeeProcedure>();
   employeeProcedures: EmployeeProcedure[] = [];
   



  /**
   *
   */
  constructor(private procedure: AbsenceAndLatenessDataService) {
  }

  ngOnInit(): void {
     
    this.followingSub = this.procedure.FindProceduer(0).subscribe(res =>{
      
      const sortedProcedures = res.Procedures.filter(ele=>ele.ProcedureId<11).slice().sort((a, b) => {
       
      return a.EmployeeName.localeCompare(b.EmployeeName);
    })
   
      sortedProcedures.forEach(element => {
        let employeeProcedure = this.employeeProcedures.find(
          emp => emp.EmployeeId == element.EmployeeId
        );
        if (!employeeProcedure) {
          employeeProcedure = new EmployeeProcedure();
          
          employeeProcedure.EmployeeName = element.EmployeeName;
          employeeProcedure.EmployeeId = element.EmployeeId;
          
          this.employeeProcedures.push(employeeProcedure);
        }
        const procedureKey = 'procedure' + element.ProcedureId;
        employeeProcedure[procedureKey] = element.IsSigned ? 2 : 1;

      //   this.followingSub = this.procedure.FindProceduer(0).subscribe(res =>{
      //     const sortedProcedures = res.Procedures.slice().sort((a, b) => {
      //     return a.EmployeeName.localeCompare(b.EmployeeName);})
      //     sortedProcedures.forEach(element => {
      //       this.employeeProcedure=new EmployeeProcedure();
      //       if(this.map.get(element.EmployeeId)!=null){
      //         this.employeeProcedure=this.map.get(element.EmployeeId);
      //       }
      //   else{
      //     this.employeeProcedure.EmployeeName=element.EmployeeName;
      //   }
      //   switch(element.ProcedureId){
      //     case(1):
      //     if(element.IsSigned)this.employeeProcedure.procedure1=2;
      //     else this.employeeProcedure.procedure1=1;
      //     break;
      //     case(2):
      //     if(element.IsSigned)this.employeeProcedure.procedure2=2;
      //     else this.employeeProcedure.procedure2=1;
      //     break;

      //     case(3):
      //     if(element.IsSigned)this.employeeProcedure.procedure3=2;
      //     else this.employeeProcedure.procedure3=1;
      //     break;
      //     case(4):
      //     if(element.IsSigned)this. employeeProcedure.procedure4=2;
      //     else this.employeeProcedure.procedure4=1;
      //     break;
      //     case(5):
      //     if(element.IsSigned)this.employeeProcedure.procedure5=2;
      //     else this.employeeProcedure.procedure5=1;
      //     break;
      //     case(6):
      //     if(element.IsSigned)this.employeeProcedure.procedure6=2;
      //     else this.employeeProcedure.procedure6=1;
      //     break;
      //     case(7):
      //     if(element.IsSigned)this.employeeProcedure.procedure7=2;
      //     else this.employeeProcedure.procedure7=1;
      //     break;
      //     case(8):
      //     if(element.IsSigned)this.employeeProcedure.procedure8=2;
      //     else this.employeeProcedure.procedure8=1;
      //     break;
      //   }
      //   this.map.set(element.EmployeeId,this.employeeProcedure);
      }
      );
      console.log(this.employeeProcedures);
    });

   
  }

toggleIsSigned(empId:number,procedureNum:number,event:any){
  const isSigned=event.target.checked;
  console.log({isSigned:isSigned,employeeId:+empId,procedureId:procedureNum})
    this.updateSub=this.procedure.updateProcedure({isSigned,employeeId:+empId,procedureId:procedureNum})
    .subscribe({ next: res => {
      if (res.RespCode == "00") {
        console.log(res.RespMsg)
      }
    },
    error: (error: any) => {
      alert('خطأ... لم يتم الحفظ رجاء التأكد من اتصال الانترنت وإعادة المحاولة');
    }
  }
  )
}
  
  ngOnDestroy(): void {
    this.followingSub.unsubscribe();
    if(this.updateSub)this.updateSub.unsubscribe();
  }

}
