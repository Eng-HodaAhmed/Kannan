import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';

import { Employee } from '../Employee.model';

import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { EmployeesDataService } from 'src/app/shared/Services/employees-data.service';

import { Subscription, map } from 'rxjs';

@Component({
  selector: 'app-new-employee',
  templateUrl: './new-employee.component.html',
  styleUrls: ['./new-employee.component.css']
})
export class NewEmployeeComponent implements OnInit,OnDestroy {
  employeeForm: FormGroup;

  Id: number;
  datepickerModel = new Date();
  RespCode: number = 0;
  editFlag: boolean = false;
  editEmployeeData: Employee;
  length: number = 0;

  // localeService: BsLocaleService;
  locale = 'ar';

  empSub: Subscription;
  updateSub:Subscription;
  addSub:Subscription;
  

  constructor(private localeService: BsLocaleService, private empService: EmployeesDataService, private datePipe: DatePipe
    , private route: ActivatedRoute) {
    this.localeService.use(this.locale);
  }
 

  ngOnInit(): void {

    this.initializeEmployeeForm();


    this.route.params.subscribe(params => {
      if (params && params['id']) {
        this.Id = +params['id']
        this.editFlag = true;
        this.empService.getEmployees();
        this.setUpdateForm();
      }
    });

  }
  
  initializeEmployeeForm() {
    this.employeeForm = new FormGroup({
      'empName': new FormControl(null, Validators.required),
      'jobName': new FormControl(null),
      'empId': new FormControl(null, Validators.required),
      
      'jobLevel': new FormControl(null),
      'specialist': new FormControl(null, Validators.required),
      'jobType': new FormControl(null, Validators.required),
      'job': new FormControl(null, Validators.required),
      'jobNumber': new FormControl(null),
      'datepickerModel': new FormControl(this.datepickerModel)
    })
  }

  setUpdateForm() {
    this.empSub = this.empService.employedEmployees.pipe(map(emp=>emp.map(emp=>{return {...emp,
      level:emp.Level?emp.Level:"",
      JobName:emp.JobName?emp.JobName:"",
      jobNumber:emp.JobNumber?emp.JobNumber:""
    }
    }))).subscribe(emp => emp.forEach(element => {
      if (element.Id == this.Id) {
        this.editEmployeeData = element;
    
        return this.employeeForm.setValue({
          'empName': this.editEmployeeData.EmployeeName,
          'jobName': this.editEmployeeData.JobName,
          'empId': this.editEmployeeData.EmployeeIDNum,
          'jobLevel': this.editEmployeeData.Level,
          'specialist': this.editEmployeeData.Major,
          'jobType': this.editEmployeeData.JobType,
          'job': this.editEmployeeData.CurrentJob,
          'jobNumber': this.editEmployeeData.JobNumber,
          'datepickerModel': new Date(this.editEmployeeData.StartDate)
        })
      }
    }))

  }

  getDataForm() {
    const formattedDate = this.datePipe.transform(this.employeeForm.value.datepickerModel, 'yyyy-MM-dd');
    const empData = new Employee(this.employeeForm.get('empName').value,
      this.employeeForm.get('empId').value.toString()
      ,this.employeeForm.get('specialist').value,
      this.employeeForm.get('jobType').value,
      formattedDate,
      this.employeeForm.get('job').value,
      this.employeeForm.get('jobLevel').value,
      this.employeeForm.get('jobName').value,
      this.employeeForm.get('jobNumber').value.toString(),this.Id?this.Id:null)
      
    return empData;
  }

  onFormSubmit() {
    if (this.editFlag == true) {
       this.empService.updateEmployee(this.getDataForm())
        .subscribe({
          next: res => {
            if (res.RespCode == "00") {
              this.RespCode = 1;
              setTimeout(() => this.RespCode = 0, 3000)
            }
          },
          error: (error: any) => {
            alert('خطأ... لم يتم الحفظ رجاء التأكد من اتصال الانترنت وإعادة المحاولة');
          }
        })
    }

    else {
     
      this.empService.addEmployee(this.getDataForm())
        .subscribe({
          next: res => {
            if (res.RespCode == "00") {
              this.RespCode = 1;
              setTimeout(() => this.RespCode = 0, 3000)
            }
          },
          error: (error: any) => 
          {
            alert('خطأ... لم يتم الحفظ رجاء التأكد من اتصال الانترنت وإعادة المحاولة');
          }
        }
        )
    }
  }

  ngOnDestroy(): void {
    if(this.empSub){
      this.empSub.unsubscribe();
    }
    if(this.updateSub){
   this.updateSub.unsubscribe();
    }
    if(this.addSub){
   this.addSub.unsubscribe();
    }
  }


}
