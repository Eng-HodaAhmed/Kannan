import { Component, OnDestroy, OnInit } from '@angular/core';

import { ProcedureDataService } from '../procedure-data.service';
import { ProcedureDetail } from 'src/app/shared/Models/ProceduerDetail.model';
import { AbsenceAndLatenessDataService } from 'src/app/shared/Services/procedures.service';
import { Subscription } from 'rxjs';

import { Router } from '@angular/router';
import { RequestesService } from 'src/app/shared/Services/requestes.service';

@Component({
  selector: 'app-employees-data',
  templateUrl: './employees-data.component.html',
  styleUrls: ['./employees-data.component.css']
})
export class EmployeesDataComponent implements OnInit, OnDestroy {
  employees: ProcedureDetail[] = [];
  lateNum: number;
  updateSub: Subscription;
  procedureId: number = 0;

  unprintedEmployees: ProcedureDetail[]
  constructor(private procedureData: ProcedureDataService
    , private procedure: AbsenceAndLatenessDataService,private request:AbsenceAndLatenessDataService,
    private route: Router) { }
  ngOnInit() {

    this.procedureData.procedureData.subscribe(data => { this.employees = data; this.procedureId = data[0].ProcedureId;console.log(this.procedureId) })
  }

  toggleIsPrinted(index: number) {
    this.employees[index].IsPrinted = !this.employees[index].IsPrinted;
    
  }


  changeIsprintedValue() {
    this.unprintedEmployees = this.employees.filter(ele => ele.IsPrinted == false)
    if(this.unprintedEmployees.length>0){
     
    this.procedureData.printedEmployee.next(this.unprintedEmployees);
    this.route.navigate(['/print', this.procedureId])
    }
    this.employees.forEach(emp => {
      if (emp.IsPrinted == false) {

       this.request.updateProcedure({ isPrinted: !emp.IsPrinted, isSigned: emp.IsSigned, employeeId: emp.EmployeeId, procedureId: emp.ProcedureId })
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
    });
  
  }


  ngOnDestroy(): void {
    // if(this.updateSub)this.updateSub.unsubscribe();
  }
}