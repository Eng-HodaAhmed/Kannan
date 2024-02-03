import { Component, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RegistrationService } from '../shared/Services/registration.service';
import { Registeration } from './registeration.model';
import { Subscription } from 'rxjs';
import { SubscriptionModel } from './subscribe.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnDestroy {
  step1: boolean = true;
  step2: boolean = false;
  step3: boolean = false;
  clickFlag:boolean=false;
  orgType: string;

  @ViewChild('form2') form2: NgForm;
  @ViewChild('form3') form3: NgForm;
  fullName: string;
  idNum: string;
  mobileNum: string;
  email: string;
  orgName: string;
  orgNationalId: string;
  region: string;
  managerName: string;

  amount: number;
  year: string;
  selectedFile: File | null = null;
  formData: string

  token: string;

  registerSub: Subscription;
  subscribeSub: Subscription;
  /**
   *
   */
  constructor(private registerService: RegistrationService, private router: Router) {


  }
  onSubmit1() {
    this.step1 = false;
    this.step2 = true;
  }

  goStep1(event:Event) {
    event.preventDefault();
    this.step1 = true;
    this.step2 = false;
    this.step3 = false;
  }
  onSubmit2() {
    if (this.form2.valid) {
      this.step1 = false
      this.step2 = false;
      this.step3 = true;
    }
  }
  goStep2(event:Event) {
    event.preventDefault();
    this.step1 = false;
    this.step2 = true;
    this.step3 = false
  }

  handleUpload(event) {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];

      const formData = new FormData();
      formData.append('filename', this.selectedFile);
      console.log(formData)
      this.registerService.uploadPhoto(formData).subscribe(res=>{
        console.log(res)
        this.formData=res.Filename;
      })

    }
    else {
      this.selectedFile = null;
    }

  }

  onRegister() {
   this,this.clickFlag=true;
    if (this.form3.valid) {
      // let imgString = this.base64Data.substring(this.base64Data.indexOf(",") + 1)

      const data = new Registeration(this.fullName, this.idNum, this.mobileNum, this.email, 
      this.orgName,this.orgType, this.orgNationalId, this.region, this.managerName)

      
      this.registerSub = this.registerService.registration(data).subscribe({
        next:res=>{
          this.clickFlag=false;
        
          if (res.RespCode == "00") {
          this.token = res.Token;
         
          this.subscribeSub = this.registerService.subscribtion(new SubscriptionModel(
            res.OrgId, res.Token, +this.amount, this.formData, this.year, this.orgType)).subscribe(res => {
              this.clickFlag=false;
          
               if (res.RespCode == "00") { 
              alert("تم الاشتراك بنجاح سيتم ارسال اسم المستخدم وكلمة المرور الى بريدك الالكترونى بعد مراجعة بياناتك")
              this.router.navigate([''])
            } else { alert(res) } })
            
          }
          else if(res.RespCode == "01"){
            alert("خطأ ... رقم الهاتف أو الايميل مسجل بالفعل")
          }
        },
        error: (error: any) => {
          this.clickFlag=false;
          // alert('خطأ... لم يتم الاشتراك رجاء التأكد من اتصال الانترنت وإعادة المحاولة');
        }
      })
    }
  }

  ngOnDestroy(): void {
    if (this.registerSub) this.registerSub.unsubscribe();
    if (this.subscribeSub) this.subscribeSub.unsubscribe();
  }
}
