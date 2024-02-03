import {  Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Employee } from '../Employee.model';
import { EmployeesDataService } from 'src/app/shared/Services/employees-data.service';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Release } from '../Release.modal';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit, OnDestroy {
  @ViewChild('f') form: NgForm;
  employedEmp: Employee[] = [];
  employedSub: Subscription;
  releaseSub:Subscription;
  releasedId: number;
  RespCode: number;
  locale = 'ar';
  datepickerModel = new Date();
  
  constructor(private empService: EmployeesDataService ,private localeService: BsLocaleService,private datePipe: DatePipe,private router: Router) { 
    this.localeService.use(this.locale);
  };


  ngOnInit() {
    this.empService.getEmployees();
    this.employedSub = this.empService.employedEmployees.subscribe(emp =>{ 
      
      emp.sort((a, b) => {
        
        return a.EmployeeName.localeCompare(b.EmployeeName);
    });
      
      this.employedEmp = emp})
    
  }


  onButtonClick(event: any) {
    this.releasedId = +event.target.id;
  }

  onSubmit(){
    const formattedDate = this.datePipe.transform(this.form.value.datepickerModel, 'yyyy-MM-dd');
    this.releaseSub=this.empService.releaseEmployee(new Release (this.releasedId, formattedDate, this.form.value.reason))
    .subscribe(res=>{this.empService.getEmployees();
    this.employedSub = this.empService.employedEmployees.subscribe(emp => this.employedEmp = emp)
    });

  }
  Onback(){
  this.router.navigate(['controllerPage'])
  }

  ngOnDestroy() {
    this.empService.getEmpSup.unsubscribe();
    this.employedSub.unsubscribe();
    if(this.releaseSub)this.releaseSub.unsubscribe()
  
    
  }

}
