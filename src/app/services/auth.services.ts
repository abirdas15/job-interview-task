import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

declare const $: any;

@Injectable({
  providedIn: 'root'
})

export class AuthServices {
  protected basePath = environment.API_URL;
  protected token = '';


  constructor( protected httpClient: HttpClient) {}

  public defaultHeaders = new HttpHeaders();

  getToken(): any {
    let userData:any = localStorage.getItem('userData');
    let token = localStorage.getItem('token');
    if (token != null) {
      this.token = token;
      let data = {
        token: token,
        user: JSON.parse(userData)
      };
    }
  }
  getAuthFromCookie() {
    let AuthData = null;
    const cookie = document.cookie;
    const cookies = cookie.split(';');
    cookies.forEach(v => {
      const cookieData = v.split('=');
      if (cookieData[0].trim() === 'MyBOSUser') {
        if (cookieData[1] !== '') {
          AuthData = JSON.parse(cookieData[1]);
        }
      }
    });
    return AuthData;
  }
  getTokenFromCookie() {
    let Token = null;
    const cookie = document.cookie;
    const cookies = cookie.split(';');
    cookies.forEach(v => {
      const cookieData = v.split('=');
      if (cookieData[0].trim() === 'MyBOSAuth1.0') {
        if (cookieData[1] !== '') {
          Token = cookieData[1];
        }
      }
    });
    return Token;
  }
  logout() {
    const token = 'MyBOSAuth1.0=';
    const auth = 'MyBOSUser=';
    const expire = 'expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    const cookieUser = auth + ';' + expire;
    const cookieToken = token + ';' + expire;
    document.cookie = cookieUser;
    document.cookie = cookieToken;
    this.apiLogout({}).subscribe();
    return true;
  }

  public apiLogin(body: any, observe: any = 'body', reportProgress: boolean = false): Observable<any> {
    let headers = this.defaultHeaders;
    headers = headers.set('Accept', 'application/json');
    return this.httpClient.post(`${this.basePath}/v1/auth/login`,
      body, {headers}
    );
  }

  public apiLogout(body: any, observe: any = 'body', reportProgress: boolean = false): Observable<any> {
    let headers = this.defaultHeaders;
    headers = headers.set('Accept', 'application/json');
    return this.httpClient.post(`${this.basePath}/v1/auth/logout`,
      body, {headers}
    );
  }

  public apiForgotPassword(body: any, observe: any = 'body', reportProgress: boolean = false): Observable<any> {
    let headers = this.defaultHeaders;
    headers = headers.set('Accept', 'application/json');
    return this.httpClient.post(`${this.basePath}/v1/auth/forgot`,
      body, {headers}
    );
  }

  public apiForgotPasswordValidate(body: any, observe: any = 'body', reportProgress: boolean = false): Observable<any> {
    let headers = this.defaultHeaders;
    headers = headers.set('Accept', 'application/json');
    return this.httpClient.post(`${this.basePath}/v1/auth/forgot/validate`, body, {headers});
  }

  public apiResetPassword(body: any, observe: any = 'body', reportProgress: boolean = false): Observable<any> {
    let headers = this.defaultHeaders;
    headers = headers.set('Accept', 'application/json');
    return this.httpClient.post(`${this.basePath}/v1/auth/forgot/change`,
      body, {headers}
    );
  }
}
