import { NgModule } from '@angular/core';
import {  RouterModule, Routes } from '@angular/router';
import { NewEmployeeComponent } from './Hr/new-employee/new-employee.component';
import { EmployeeComponent } from './Hr/employee/employee.component';
import { ControllerPageComponent } from './controller-page/controller-page.component';
import { DelayingComponent } from './controller-page/nav-tabs/delaying/delaying.component';
import { AbsenceComponent } from './controller-page/nav-tabs/absence/absence.component';
import { LatenessComponent } from './Hr/lateness/lateness.component';
import { AbsenceRecordsComponent } from './Hr/absence/absence.component';
import { FollowingLatenessComponent } from './following/following-lateness/following-lateness.component';
import { FollowingAbsenceComponent } from './following/following-absence/following-absence.component';
import { PrintComponent } from './controller-page/PrintProcedures/latenessProcedures/printProcedure1/print.component';
import { PrintLayoutComponent } from './controller-page/PrintProcedures/latenessProcedures/print-layout/print-layout.component';
import { PrintProcedure5Component } from './controller-page/PrintProcedures/latenessProcedures/print-procedure5/print-procedure5.component';
import { FinalDesitionComponent } from './controller-page/PrintProcedures/latenessProcedures/final-desition/final-desition.component';
import { PrintProcedure6Component } from './controller-page/PrintProcedures/latenessProcedures/print-procedure6/print-procedure6.component';
import { OrganizationDataComponent } from './organization-data/organization-data.component';
import { DailyLatenessProcedureComponent } from './Hr/lateness/daily-lateness-procedure/daily-lateness-procedure.component';
import { Procedure1Component } from './controller-page/PrintProcedures/AbcenseProcedures/procedure1/procedure1.component';
import { Procedure2Component } from './controller-page/PrintProcedures/AbcenseProcedures/procedure2/procedure2.component';
import { Procedure3Component } from './controller-page/PrintProcedures/AbcenseProcedures/procedure3/procedure3.component';
import { Procedure4Component } from './controller-page/PrintProcedures/AbcenseProcedures/procedure4/procedure4.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LogInComponent } from './log-in/log-in.component';
import { latenessOfanEmployeeComponent } from './Reports/latenessOfanEmployee/latenessOfanEmployee';
import { AbsenceOfanEmployeeComponent } from './Reports/absence-ofan-employee/absence-ofan-employee.component';
import { AbsenceAndLatenessDataComponent } from './Reports/absence-and-lateness-data/absence-and-lateness-data.component';




const routes: Routes = [
  {path:'',component:HomeComponent},
 
  {path:'controllerPage',component:ControllerPageComponent,
  children:[{path:'',component:DelayingComponent},
  {path:"absence",component:AbsenceComponent},
  ]},
  {path:'employee',component:EmployeeComponent},
  {path:'newEmployee',component:NewEmployeeComponent},
  {path:'newEmployee/:id',component:NewEmployeeComponent},
  {path:'addLateness',component:LatenessComponent},
  {path:'addAbsence',component:AbsenceRecordsComponent},
  {path:'followingLateness',component:FollowingLatenessComponent},
  {path:'followingAbsence',component:FollowingAbsenceComponent},
  { path: 'print',component: PrintLayoutComponent,
  children: [
    { path: '1', component: PrintComponent },
    { path: 'dailyLateness', component: DailyLatenessProcedureComponent },
    { path: '5', component: PrintProcedure5Component },
    { path: '6', component: PrintProcedure6Component },
    { path: '7', component: FinalDesitionComponent },
    { path: '8', component: FinalDesitionComponent },
    { path: '11', component: Procedure1Component },
    { path: '12', component: Procedure2Component },
    { path: '13', component: Procedure3Component },
    { path: '14', component: Procedure4Component }
  ]
},
{path:'org',component:OrganizationDataComponent},
{path:'register',component:RegisterComponent},
{path:'logIn',component:LogInComponent},
{path:'latenessReport',component:latenessOfanEmployeeComponent},
{path:'absenceReport',component:AbsenceOfanEmployeeComponent},
{path:"yearReport",component:AbsenceAndLatenessDataComponent},
{path:'register',component:RegisterComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
