import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { ProcedureDetail } from 'src/app/shared/Models/ProceduerDetail.model';
import { ProcedureDataService } from '../../procedure-data.service';
import { AbsenceAndLatenessDataService } from 'src/app/shared/Services/procedures.service';

@Component({
  selector: 'app-absence',
  templateUrl: './absence.component.html',
  styleUrls: ['./absence.component.css']
})
export class AbsenceComponent implements OnInit,OnDestroy {
  firstLatenessSum: number
  secondLatenessSum: number
  thirdLatenessSum: number
  fourthLatenessSum: number
  fifthLatenessSum: number

  firstLateness: number
  secondLateness: number
  thirdLateness: number
  fourthLateness: number
  fifthLateness: number

  firstLatenessDetails:ProcedureDetail[];
  secondLatenessDetails:ProcedureDetail[]
  thirdLatenessDetails:ProcedureDetail[]
  fourthLatenessDetails:ProcedureDetail[]
  fifthLatenessDetails:ProcedureDetail[]

  firstSub: Subscription;
  secondSub: Subscription;
  thirdSub: Subscription;
  fourthSub: Subscription;
  fifthSub: Subscription;

  /**
   *
   */
  constructor(private procedure: AbsenceAndLatenessDataService,private procedureDetail:ProcedureDataService) {
    
    
  }

  ngOnInit(): void {
    this.firstSub = this.procedure.FindProceduer(11).subscribe(pro =>{this.firstLatenessSum=pro.Procedures?pro.Procedures.length:0;this.firstLatenessDetails = pro.Procedures?.filter(ele => ele.IsSigned == false);this.firstLateness=this.firstLatenessDetails?this.firstLatenessDetails.length:0})
    this.secondSub = this.procedure.FindProceduer(12).subscribe(pro => {this.secondLatenessSum=pro.Procedures?pro.Procedures.length:0;this.secondLatenessDetails = pro.Procedures?.filter(ele => ele.IsSigned == false);this.secondLateness=this.secondLatenessDetails?this.secondLatenessDetails.length:0})
    this.thirdSub = this.procedure.FindProceduer(13).subscribe(pro => {this.thirdLatenessSum=pro.Procedures?pro.Procedures.length:0;this.thirdLatenessDetails = pro.Procedures?.filter(ele => ele.IsSigned == false);this.thirdLateness=this.thirdLatenessDetails?this.thirdLatenessDetails.length:0})
    this.fourthSub = this.procedure.FindProceduer(14).subscribe(pro => {this.fourthLatenessSum=pro.Procedures?pro.Procedures.length:0;this.fourthLatenessDetails = pro.Procedures?.filter(ele => ele.IsSigned == false);this.fourthLateness=this.fourthLatenessDetails?this.fourthLatenessDetails.length:0})
    this.fifthSub = this.procedure.FindProceduer(15).subscribe(pro => {this.fifthLatenessSum=pro.Procedures?pro.Procedures.length:0;this.fifthLatenessDetails = pro.Procedures?.filter(ele => ele.IsSigned == false);this.fifthLateness=this.fifthLatenessDetails?this.fifthLatenessDetails.length:0})
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

  ngOnDestroy(): void {
    this.firstSub.unsubscribe();
    this.secondSub.unsubscribe();
    this.thirdSub.unsubscribe();
    this.fourthSub.unsubscribe();
    this.fifthSub.unsubscribe();
  }


}
