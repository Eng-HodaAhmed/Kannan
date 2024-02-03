import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserInfoService } from '../shared/Services/user-info.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {
  @ViewChild('f')signUpForm:NgForm;
userName:string=''
password:string=''

/**
 *
 */
constructor(private userInfo:UserInfoService,private router:Router) {
  
}
onSumbite(){
  this.userName=this.signUpForm.value.userName;
  this.password=this.signUpForm.value.password;
  this.userInfo.userLogIn({UserName:this.userName,Password:this.password}).subscribe({
    
    next: res => {
    if(res.RespCode=="00"){
      localStorage.setItem('token',res.Token)
      localStorage.setItem('orgId',res.OrgId.toString())
      // this.userInfo.token.next(res.Token)
      this.router.navigate(['/controllerPage'])
    }
    else{
      alert('خطأ... يرجى التأكد من اسم المستخدم وكلمة المرور وإعادة المحاولة');
    }
  },
    error: (error: any) => {
      alert('خطأ... رجاء التأكد من اتصال الانترنت وإعادة المحاولة');
    }
  })
}
}
