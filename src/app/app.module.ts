import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HomeComponent } from './home/home.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { NewEmployeeComponent } from './Hr/new-employee/new-employee.component';
import { NavIconsComponent } from './nav-icons/nav-icons.component';
import { EmployeeComponent } from './Hr/employee/employee.component';
import{ HTTP_INTERCEPTORS, HttpClientModule}from'@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { arLocale } from 'ngx-bootstrap/locale';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { ControllerPageComponent } from './controller-page/controller-page.component';
import { DatePipe } from '@angular/common';
import { DelayingComponent } from './controller-page/nav-tabs/delaying/delaying.component';
import { AbsenceComponent } from './controller-page/nav-tabs/absence/absence.component';
import { NavTabsComponent } from './controller-page/nav-tabs/nav-tabs.component';
import { EmployeesDataComponent } from './controller-page/employees-data/employees-data.component';

import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { LatenessComponent } from './Hr/lateness/lateness.component';
import { AbsenceRecordsComponent } from './Hr/absence/absence.component';
import { FollowingLatenessComponent } from './following/following-lateness/following-lateness.component';
import { NgxPrintModule } from 'ngx-print';
import { FollowingAbsenceComponent } from './following/following-absence/following-absence.component';
import { PrintComponent } from './controller-page/PrintProcedures/latenessProcedures/printProcedure1/print.component';
import { PrintLayoutComponent } from './controller-page/PrintProcedures/latenessProcedures/print-layout/print-layout.component';
import { DailyLatenessProcedureComponent } from './Hr/lateness/daily-lateness-procedure/daily-lateness-procedure.component';
import { PrintProcedure5Component } from './controller-page/PrintProcedures/latenessProcedures/print-procedure5/print-procedure5.component';
import { FinalDesitionComponent } from './controller-page/PrintProcedures/latenessProcedures/final-desition/final-desition.component';
import { PrintProcedure6Component } from './controller-page/PrintProcedures/latenessProcedures/print-procedure6/print-procedure6.component';
import { OrganizationDataComponent } from './organization-data/organization-data.component';
import { Procedure1Component } from './controller-page/PrintProcedures/AbcenseProcedures/procedure1/procedure1.component';
import { TanbeehKhattyComponent } from './controller-page/PrintProcedures/AbcenseProcedures/shared/tanbeeh-khatty/tanbeeh-khatty.component';
import { DiscountDesitionComponent } from './controller-page/PrintProcedures/AbcenseProcedures/shared/discount-desition/discount-desition.component';
import { Procedure2Component } from './controller-page/PrintProcedures/AbcenseProcedures/procedure2/procedure2.component';
import { Procedure3Component } from './controller-page/PrintProcedures/AbcenseProcedures/procedure3/procedure3.component';
import { Procedure4Component } from './controller-page/PrintProcedures/AbcenseProcedures/procedure4/procedure4.component';
import { RegisterComponent } from './register/register.component';
import { LogInComponent } from './log-in/log-in.component';
import { latenessOfanEmployeeComponent } from './Reports/latenessOfanEmployee/latenessOfanEmployee';
import { AbsenceOfanEmployeeComponent } from './Reports/absence-ofan-employee/absence-ofan-employee.component';
import { AbsenceAndLatenessDataComponent } from './Reports/absence-and-lateness-data/absence-and-lateness-data.component';
import { FooterComponent } from './footer/footer.component';
import { ErrorInterceptor } from './shared/Services/errorInterceptor.Service';


// import { PrintComponent } from './controller-page/print/print.component';



defineLocale('ar', arLocale); // Define Arabic locale
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    NewEmployeeComponent,
    NavIconsComponent,
    EmployeeComponent,
    ControllerPageComponent,
    DelayingComponent,
    AbsenceComponent,
    NavTabsComponent,
    EmployeesDataComponent,
    LatenessComponent,
    AbsenceRecordsComponent,
    FollowingLatenessComponent,
    FollowingAbsenceComponent,
    PrintComponent,
    PrintLayoutComponent,
    PrintComponent,
    DailyLatenessProcedureComponent,
    PrintProcedure5Component,
    FinalDesitionComponent,
    PrintProcedure6Component,
    OrganizationDataComponent,
    Procedure1Component,
    TanbeehKhattyComponent,
    DiscountDesitionComponent,
    Procedure2Component,
    Procedure3Component,
    Procedure4Component,
    RegisterComponent,
    LogInComponent,
    latenessOfanEmployeeComponent,
    AbsenceOfanEmployeeComponent,
    AbsenceAndLatenessDataComponent,
    AbsenceAndLatenessDataComponent,
    FooterComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
     FontAwesomeModule,
     HttpClientModule,
     FormsModule,
     ReactiveFormsModule,
     BsDatepickerModule.forRoot(),
     BrowserAnimationsModule,
     TimepickerModule.forRoot(),
     TypeaheadModule.forRoot(),
     NgxPrintModule,
   
  
  ],
  providers: [DatePipe,{ 
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
