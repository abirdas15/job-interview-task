import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthServices} from "../../../services/auth.services";

declare let $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: []
})

export class LoginComponent  implements OnInit {
  signInForm = {
    username: '',
    password: '',
    remember: false,
  };

  msg:any = null;
  loadingbtn = false;

  constructor( private router: Router, protected authServices: AuthServices) {

  }

  signIn = () => {
    $('.form-control').removeClass('is-invalid');
    $('.invalid-feedback').html('');
    this.loadingbtn = true;
    this.msg = null;
    let formData = {
      token : btoa(this.signInForm.username) + '.' + btoa(this.signInForm.password),
      remember: this.signInForm.remember
    }
    this.authServices.apiLogin(formData).subscribe(res => {
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
          this.loadingbtn = false;
        }else{
          this.ErrorHandaler(res.code)
          this.loadingbtn = false;
        }
      }
    );
  };
  ErrorHandaler(error:any) {
    let e = error;
    if (e === 788520){
      this.msg = 'The username and password field cannot be empty'
    }else if(e === 788518){
      this.msg = 'The username and password tou entered do not match'
    }else if(e === 788524){
      this.msg = 'The username and password tou entered do not match'
    }else if(e === 788522){
      this.msg = 'Your entered incorrect details too many times Please contact MYBOS support'
    }else if(e === 788525){
      this.msg = 'This portal is disable<br>Please contact your Building Manager'
    }else if(e === 788526){
      this.msg = 'This portal is disable<br>Please contact your Building Manager'
    }else if(e === 788523){
      this.msg = 'Account Suspended <br>Please contact MYBOS support'
    }
  }

  ngOnInit(): void {

  }

}
