import { Component, OnDestroy, OnInit } from '@angular/core';
import { LatenessDetails } from '../LatenessDetailes.model';
import { Employee } from '../Employee.model';
import { EmployeesDataService } from 'src/app/shared/Services/employees-data.service';
import { Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { Router } from '@angular/router';
import { RequestesService } from 'src/app/shared/Services/requestes.service';
import { TypeaheadOrder } from 'ngx-bootstrap/typeahead';
import uq from '@umalqura/core';
@Component({
  selector: 'app-absence',
  templateUrl: './absence.component.html',
  styleUrls: ['./absence.component.css']
})
export class AbsenceRecordsComponent implements OnInit, OnDestroy {
  datepickerModel = new Date();
  locale = 'ar';
  minTime: Date = new Date();
  maxTime: Date = new Date();
  empNames: string[] = [];
  employees: Employee[];
  absenceEmployees: LatenessDetails[] = [];
  empIds: number[] = [];
  absenceEmployeesDetails: Employee[] = [];
  editMode: boolean[] = [];
  Id: number;
  employeeId: number;
  absentStatus: string;
  notes: string;
  editFlag: number = 0;
  editedIndex: number;
  hegriDate:string;
  day:string;

  employedSub: Subscription;
  absenceEmpDetailSub: Subscription;
  saveAbsenceSub: Subscription
  higriDateSub:Subscription;

  empName: string = "";
  absenceEmpId: number;
  newAbsenceFlag: number = 0;

  sortConfig: TypeaheadOrder = {
    direction: 'asc'
  };
  /**
   *
   */
  constructor(private router: Router,private dataStorage:RequestesService,private localeService: BsLocaleService, private empServices: EmployeesDataService, private datePipe: DatePipe) {
    this.localeService.use(this.locale);
    this.initializeEditMode();
    this.displayHijriDate(this.datepickerModel);

  }
  ngOnInit(): void {
    this.empServices.getEmployees();
    this.employedSub = this.empServices.employedEmployees.subscribe(emp => { this.employees = emp; this.empNames = this.employees.map((item) => item["EmployeeName"]); });
  }
  displayHijriDate(value:Date){
    const d = uq(value).format('fullDate', 'ar');
    this.day=d.split("،")[0];
    const dateh = uq(value).format('d-M-yyyy', 'ar');
    this.hegriDate=dateh;
  }
  fechAbsenceEmp(value: Date) {
    this.displayHijriDate(value);
    this.absenceEmployees=[];
    this.unsupVariable();
    this.newAbsenceFlag = 0;
    const formattedDate = this.datePipe.transform(value, 'yyyy-MM-dd');
    this.empServices.fechAbsenceDetails({ employeeId: 0, date: formattedDate });
    this.absenceEmpDetailSub = this.empServices.latenessEmployees.subscribe(emp => {
      if (emp) {
        // console.log(emp)
        this.empIds = emp.map((item) => item["EmployeeId"]);
        for (let i = 0; i < this.empIds.length; i++) {
          const data = this.employees.find(emp => emp.Id == this.empIds[i])
         
          this.absenceEmployeesDetails.push(data);
        }
        this.absenceEmployees = emp;
       
      }
    })

  }

  fetchId() {
    const emp = this.employees.find(emp => emp.EmployeeName == this.empName);
    if (emp) {
      this.Id = emp.Id;
      this.employeeId = +emp.EmployeeIDNum;
    }

  }
  unsupVariable() {
    if (this.empServices.lateSub) this.empServices.lateSub.unsubscribe();
    if (this.absenceEmpDetailSub) this.absenceEmpDetailSub.unsubscribe();

  }
  reset() {
    this.empName = "";
    this.employeeId = null;
    this.absentStatus=null;
    this.notes=null;
  }

  initializeEditMode() {
    this.editMode = new Array(this.absenceEmployees.length).fill(false);
  }

  openEditMode(index: number, emp: LatenessDetails) {
   let isOpen=false;
   this.editFlag = 1;
    this.editMode.forEach(element => {
      
      if(element==true){
       isOpen=true
        return alert("من فضلك قم بحفظ التعديلات أولا")
      }

    })
    if(isOpen==false){
      this.editMode[index] = true;
      
      this.editedIndex = index
      this.displayEditedData(emp);
    }

  }
  displayEditedData(employee: LatenessDetails) {
    this.empName = employee.EmployeeName;
    const emp = this.employees.find(emp => emp.EmployeeName == this.empName);
    if (emp) this.employeeId = +emp.EmployeeIDNum;
    this.absentStatus = employee.Status;
    this.notes = employee.Notes;
    
  }

  onSaveAbsenceData(latenessId?: number) {
    if (this.editFlag == 0) {
      const formattedDate = this.datePipe.transform(this.datepickerModel, 'yyyy-MM-dd');
      this.saveAbsenceSub = this.empServices.addLateness(new LatenessDetails(this.Id, formattedDate,this.hegriDate, true,0, this.absentStatus, this.notes))
        .subscribe({
          next: res => {

            if (res.RespCode == "00") {
              this.reset();
              this.fechAbsenceEmp(this.datepickerModel)
            }
            else if(res.RespCode=="05"){
              alert("تم اضافة هذا الموظف من قبل");
              this.reset();
            }
          },
          error: (error: any) => {
            alert('خطأ... لم يتم الحفظ رجاء التأكد من اتصال الانترنت وإعادة المحاولة');
          }
        })
    }
    else {
      this.saveAbsenceSub = this.empServices.updateAbsenceDetails({ latenessId: latenessId, status: this.absentStatus, notes: this.notes })
        .subscribe({
          next: res => {
            if (res.RespCode == "00") {
              this.reset()
              this.editFlag=0
              this.editMode[this.editedIndex] = false;
              this.fechAbsenceEmp(this.datepickerModel)
            }
          },
          error: (error: any) => {
          alert('خطأ... لم يتم الحفظ رجاء التأكد من اتصال الانترنت وإعادة المحاولة');
          }
        })
    }
  }

  Onback(){
    if(this.editFlag){
    let sureFlag=confirm("هل تريد الخروج دون حفظ التغيرات")
    if (sureFlag)this.router.navigate(['controllerPage'])
    }
  else{
    this.router.navigate(['controllerPage'])
  }
  }



  ngOnDestroy(): void {
    this.employedSub.unsubscribe();
    if (this.saveAbsenceSub) this.saveAbsenceSub.unsubscribe()
  }

}
