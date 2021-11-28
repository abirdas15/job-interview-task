import { Injectable } from '@angular/core';
import {CanActivate, Route, Router} from '@angular/router';
import {AuthServices} from "../../services/auth.services";

@Injectable()

export class AuthGuard implements CanActivate {
  constructor( private router: Router, protected authServices: AuthServices) {}

  canActivate(): boolean {
    const Auth = this.authServices.getAuthFromCookie();
    console.log(Auth)
    if (Auth !== null) {
      return true;
    }else{
      this.router.navigate(['/']);
      return false;
    }
  }

}
