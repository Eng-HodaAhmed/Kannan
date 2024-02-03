import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription} from 'rxjs';
import { EmployeeProcedure } from '../Employeeprocedure.model';
import { AbsenceAndLatenessDataService } from 'src/app/shared/Services/procedures.service';
import { ProcedureDetail } from 'src/app/shared/Models/ProceduerDetail.model';

@Component({
  selector: 'app-following-absence',
  templateUrl: './following-absence.component.html',
  styleUrls: ['./following-absence.component.css']
})
export class FollowingAbsenceComponent implements OnInit, OnDestroy {
  followingSub: Subscription;
  updateSub: Subscription;
  employeeProcedure: EmployeeProcedure;
  absenseProcedure: ProcedureDetail[]
  map = new Map<number, EmployeeProcedure>();
  constructor(private procedure: AbsenceAndLatenessDataService) {
  }
  ngOnInit(): void {

    this.followingSub = this.procedure.FindProceduer(0).subscribe(res => {
     this.absenseProcedure=res.Procedures.filter(ele=>ele.ProcedureId>=11)
      this.absenseProcedure.forEach(element => {
        this.employeeProcedure = new EmployeeProcedure();
        if (this.map.get(element.EmployeeId) != null) {

          this.employeeProcedure = this.map.get(element.EmployeeId);
        }
        else {
          this.employeeProcedure.EmployeeName = element.EmployeeName;
        }
        switch (element.ProcedureId) {
          case (11):
            if (element.IsSigned) this.employeeProcedure.procedure1 = 2;
            else this.employeeProcedure.procedure1 = 1;
            break;
          case (12):
            if (element.IsSigned) this.employeeProcedure.procedure2 = 2;
            else this.employeeProcedure.procedure2 = 1;
            break;

          case (13):
            if (element.IsSigned) this.employeeProcedure.procedure3 = 2;
            else this.employeeProcedure.procedure3 = 1;
            break;
          case (14):
            if (element.IsSigned) this.employeeProcedure.procedure4 = 2;
            else this.employeeProcedure.procedure4 = 1;
            break;
          case (15):
            if (element.IsSigned) this.employeeProcedure.procedure5 = 2;
            else this.employeeProcedure.procedure5 = 1;
            break;

        }
        this.map.set(element.EmployeeId, this.employeeProcedure);
      })
    }
    );
  }


toggleIsSigned(empId: number, procedureNum: number, event: any) {
  const isSigned = event.target.checked;
  console.log({ isSigned, employeeId: empId, procedureId: procedureNum })
  this.updateSub = this.procedure.updateProcedure({ isSigned, employeeId: empId, procedureId: procedureNum })
    .subscribe({
      next: res => {
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
  if(this.updateSub) this.updateSub.unsubscribe();
}


}
