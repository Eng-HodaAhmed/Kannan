import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, filter } from 'rxjs';
import { ProcedureDetail } from 'src/app/shared/Models/ProceduerDetail.model';
import { AbsenceAndLatenessDataService } from 'src/app/shared/Services/procedures.service';
import { ProcedureDataService } from '../../procedure-data.service';

@Component({
  selector: 'app-delaying',
  templateUrl: './delaying.component.html',
  styleUrls: ['./delaying.component.css']
})
export class DelayingComponent implements OnInit,OnDestroy {

  firstLatenessSum: number;
  secondLatenessSum: number;
  thirdLatenessSum: number;
  fourthLatenessSum: number;
  fifthLatenessSum: number;
  sixthLatenessSum: number;
  seventhLatenessSum: number;
  eighthLatenessSum: number;

  firstLateness: number;
  secondLateness: number;
  thirdLateness: number;
  fourthLateness: number;
  fifthLateness: number;
  sixthLateness: number;
  seventhLateness: number;
  eighthLateness: number;

  firstLatenessDetails:ProcedureDetail[];
  secondLatenessDetails:ProcedureDetail[]
  thirdLatenessDetails:ProcedureDetail[]
  fourthLatenessDetails:ProcedureDetail[]
  fifthLatenessDetails:ProcedureDetail[]
  sixthLatenessDetails:ProcedureDetail[]
  seventhLatenessDetails:ProcedureDetail[]
  eighthLatenessDetails:ProcedureDetail[]

  firstSub: Subscription;
  secondSub: Subscription;
  thirdSub: Subscription;
  fourthSub: Subscription;
  fifthSub: Subscription;
  sixthSub: Subscription;
  seventhSub: Subscription;
  eighthSub: Subscription;

  /**
   *
   */
  constructor(private procedure: AbsenceAndLatenessDataService,private procedureDetail:ProcedureDataService) {
  }

  ngOnInit(): void {
    this.firstSub = this.procedure.FindProceduer(1).subscribe(pro =>{this.firstLatenessSum=pro.Procedures?pro.Procedures.length:0;this.firstLatenessDetails = pro.Procedures?.filter(ele => ele.IsSigned == false);this.firstLateness=this.firstLatenessDetails?this.firstLatenessDetails.length:0})
    this.secondSub = this.procedure.FindProceduer(2).subscribe(pro => {this.secondLatenessSum=pro.Procedures?pro.Procedures.length:0;this.secondLatenessDetails = pro.Procedures?.filter(ele => ele.IsSigned == false);this.secondLateness=this.secondLatenessDetails?this.secondLatenessDetails.length:0})
    this.thirdSub = this.procedure.FindProceduer(3).subscribe(pro => {this.thirdLatenessSum=pro.Procedures?pro.Procedures.length:0;this.thirdLatenessDetails = pro.Procedures?.filter(ele => ele.IsSigned == false);this.thirdLateness=this.thirdLatenessDetails?this.thirdLatenessDetails.length:0})
    this.fourthSub = this.procedure.FindProceduer(4).subscribe(pro => {this.fourthLatenessSum=pro.Procedures?pro.Procedures.length:0;this.fourthLatenessDetails = pro.Procedures?.filter(ele => ele.IsSigned == false);this.fourthLateness=this.fourthLatenessDetails?this.fourthLatenessDetails.length:0})
    this.fifthSub = this.procedure.FindProceduer(5).subscribe(pro => {this.fifthLatenessSum=pro.Procedures?pro.Procedures.length:0;this.fifthLatenessDetails = pro.Procedures?.filter(ele => ele.IsSigned == false);this.fifthLateness=this.fifthLatenessDetails?this.fifthLatenessDetails.length:0})
    this.sixthSub = this.procedure.FindProceduer(6).subscribe(pro => {this.sixthLatenessSum=pro.Procedures?pro.Procedures.length:0;this.sixthLatenessDetails= pro.Procedures?.filter(ele => ele.IsSigned == false);this.sixthLateness=this.sixthLatenessDetails?this.sixthLatenessDetails.length:0})
    this.seventhSub = this.procedure.FindProceduer(7).subscribe(pro =>{this.seventhLatenessSum=pro.Procedures?pro.Procedures.length:0; this.seventhLatenessDetails = pro.Procedures?.filter(ele => ele.IsSigned == false);this.seventhLateness=this.seventhLatenessDetails?this.fifthLatenessDetails.length:0})
    this.eighthSub = this.procedure.FindProceduer(8).subscribe(pro => {this.eighthLatenessSum=pro.Procedures?pro.Procedures.length:0;this.eighthLatenessDetails= pro.Procedures?.filter(ele => ele.IsSigned == false);this.eighthLateness=this.eighthLatenessDetails?this.sixthLatenessDetails.length:0})

  }
OnFirstProcedure(){
 if(this.firstLatenessDetails) 
this.procedureDetail.procedureData.next(this.firstLatenessDetails);
else
this.procedureDetail.procedureData.next(null);
}
OnSecondProcedure(){
  if(this.secondLatenessDetails)
  this.procedureDetail.procedureData.next(this.secondLatenessDetails);

  else
  this.procedureDetail.procedureData.next(null);
  
}
OnThirdProcedure(){
  if(this.thirdLatenessDetails)
  this.procedureDetail.procedureData.next(this.thirdLatenessDetails);
  else
  this.procedureDetail.procedureData.next(null);
  
}
OnFourthProcedure(){
  if(this.fourthLatenessDetails)
  this.procedureDetail.procedureData.next(this.fourthLatenessDetails);
  else
  this.procedureDetail.procedureData.next(null);
  
}
OnFifthProcedure(){
  if(this.fifthLatenessDetails)
  this.procedureDetail.procedureData.next(this.fifthLatenessDetails);
  else
  this.procedureDetail.procedureData.next(null);
  
}
OnSixthProcedure(){
  if(this.sixthLatenessDetails)
  this.procedureDetail.procedureData.next(this.sixthLatenessDetails);
  else
  this.procedureDetail.procedureData.next(null);
  
}
OnSeventhProcedure(){
  if(this.seventhLatenessDetails)
  this.procedureDetail.procedureData.next(this.seventhLatenessDetails);
  else
  this.procedureDetail.procedureData.next(null);
  
}
OnEighthProcedure(){
  if(this.eighthLatenessDetails)
  this.procedureDetail.procedureData.next(this.eighthLatenessDetails);
  else
  this.procedureDetail.procedureData.next(null);

  
}

  ngOnDestroy(): void {
    this.firstSub.unsubscribe();
    this.secondSub.unsubscribe();
    this.thirdSub.unsubscribe();
    this.fourthSub.unsubscribe();
    this.fifthSub.unsubscribe();
    this.sixthSub.unsubscribe();
    this.seventhSub.unsubscribe();
    this.eighthSub.unsubscribe();
  }
}
