import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthServices} from "../../../services/auth.services";

declare let $: any;
@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: []
})
export class ResetComponent  implements OnInit {
  step:number = 1
  ResetForm = {
    email: '',
    code: ''
  };
  PasswordForm = {
    password: '',
    confirm_password: '',
    key: '',
  };
  loadingBtn = false;
  msg:any = null;

  constructor( private router: Router, protected authServices: AuthServices) {

  }

  SendRequest = () => {
    this.msg = null;
    if(this.ResetForm.email == ''){
      this.msg = 'Email Field is required!'
      return;
    }
    this.loadingBtn = true;
    let formData = {
      email : this.ResetForm.email,
    }
    this.authServices.apiForgotPassword(formData).subscribe(res => {
        console.log(res)
        if (res.state === 200) {
          this.loadingBtn = false;
          this.step = 2;
        }else{
          this.msg = 'Invalid Request, Please Check!'
          this.loadingBtn = false;
        }
      }
    );
  };
  ValidateCode = () => {
    this.msg = null;
    if(this.ResetForm.code == ''){
      this.msg = 'Reset password code required!'
      return;
    }
    this.loadingBtn = true;
    let formData = {
      email : this.ResetForm.email,
      code : this.ResetForm.code,
    }
    this.authServices.apiForgotPasswordValidate(formData).subscribe(res => {
        if (res.state === 200) {
          this.loadingBtn = false;
          this.PasswordForm.key = res.key;
          this.step = 3;
        }else{
          this.msg = 'Reset password code is invalid'
          this.loadingBtn = false;
        }
      }
    );
  };
  ChangePassword = () => {
    this.msg = null;
    if(this.PasswordForm.password == '' || this.PasswordForm.confirm_password == ''){
      this.msg = 'Password & Confirm Password is required!'
      return;
    }
    if(this.PasswordForm.password != this.PasswordForm.confirm_password){
      this.msg = 'Password & Confirm Password doesn\'t match'
      return;
    }
    this.loadingBtn = true;
    let formData = {
      code : this.ResetForm.code,
      email : this.ResetForm.email,
      key : this.PasswordForm.key,
      password : this.PasswordForm.password,
      re_password : this.PasswordForm.confirm_password,
    }
    this.authServices.apiResetPassword(formData).subscribe(res => {
      if (res.state === 200) {
        const now = new Date();
        now.setDate(now.getDate() + res.expire);
        const token = 'MyBOSAuth1.0=' + res.accessToken;
        const auth = 'MyBOSUser=' + JSON.stringify(res.user);
        const expire = 'expires=' + now;
        const cookieUser = auth + ';' + expire;
        const cookieToken = token + ';' + expire;
        document.cookie = cookieUser;
        document.cookie = cookieToken;
        this.router.navigate(['/bm/dashboard']);
        this.loadingBtn = false;
      }else{
        this.msg = 'Invalid Request, Please Check';
        this.loadingBtn = false;
      }
      }
    );
  };

  ngOnInit(): void {

  }
}
