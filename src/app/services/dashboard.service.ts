import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, BehaviorSubject} from 'rxjs';
import { AuthServices } from './auth.services';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  protected basePath_v1 = environment.API_URL_v1;
  protected basePath_v2 = environment.API_URL_v2;
  protected token:any = '';
  public defaultHeaders = new HttpHeaders();

  BuildingId = new BehaviorSubject<any>(null);
  currentBuildingId = this.BuildingId.asObservable();
  constructor(protected httpClient: HttpClient, protected authService: AuthServices) {
    this.token = this.authService.getTokenFromCookie();
  }

  updateBuildingId(ID:any) {
    this.BuildingId.next(ID);
  }

  public apiGetActivityFeed(id: number, observe: any = 'body', reportProgress: boolean = false): Observable<any> {
    if (id === null || id === undefined) {
      throw new Error('Required parameter id was null or undefined when calling apiGetActivityFeed.');
    }
    let headers = this.defaultHeaders;
    headers = headers.set('mba', this.token);
    return this.httpClient.get(`${this.basePath_v2}/building/${encodeURIComponent(String(id))}/info/activity?p=1`, { headers: headers });
  }

  public apiGetCaseGraph(body: any, id: number, observe: any = 'body', reportProgress: boolean = false): Observable<any> {
    if (id === null || id === undefined) {
      throw new Error('Required parameter id was null or undefined when calling apiGetActivityFeed.');
    }
    let headers = this.defaultHeaders;
    headers = headers.set('mba', this.token);
    return this.httpClient.post(`${this.basePath_v1}/building/${encodeURIComponent(String(id))}/report/case-type`, body, { headers: headers });
  }


  public apiGetBuildingSummary(id: number, observe: any = 'body', reportProgress: boolean = false): Observable<any> {
    if (id === null || id === undefined) {
      throw new Error('Required parameter id was null or undefined when calling apiGetBuildingSummary.');
    }

    let headers = this.defaultHeaders;
    headers = headers.set('mba', this.token);
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get(`${this.basePath_v1}/building/${encodeURIComponent(String(id))}/report/summary`, { headers: headers });
  }

  public apiGetBuildings(observe: any = 'body', reportProgress: boolean = false): Observable<any> {
    let headers = this.defaultHeaders;
    headers = headers.set('mba', this.token);
    return this.httpClient.get(`${this.basePath_v1}/building`, { headers: headers });
  }

  public apiGetManagementReport(id: number, observe: any = 'body', reportProgress: boolean = false): Observable<any> {
    if (id === null || id === undefined) {
      throw new Error('Required parameter id was null or undefined when calling apiGetManagementReport.');
    }

    let headers = this.defaultHeaders;
    headers = headers.set('mba', this.token);
    return this.httpClient.get(`${this.basePath_v1}/building/${encodeURIComponent(String(id))}/report/management?limit=10`, { headers: headers });
  }

  public apiGetNote(id: number, observe: any = 'body', reportProgress: boolean = false): Observable<any> {
    if (id === null || id === undefined) {
      throw new Error('Required parameter id was null or undefined when calling apiGetNote.');
    }

    let headers = this.defaultHeaders;
    headers = headers.set('mba', this.token);
    return this.httpClient.get(`${this.basePath_v1}/building/${encodeURIComponent(String(id))}/note?p=1`, { headers: headers });
  }

  public apiAddNote(body: any, id: number, observe: any = 'body', reportProgress: boolean = false): Observable<any> {
    if (id === null || id === undefined) {
      throw new Error('Required parameter id was null or undefined when calling apiAddNote.');
    }
    let headers = this.defaultHeaders;
    headers = headers.set('mba', this.token);
    return this.httpClient.post<any>(`${this.basePath_v1}/building/${encodeURIComponent(String(id))}/note`,  body,{ headers: headers });
  }

  public apiDeleteNote(body: any, id: number, NoteId: number,   observe: any = 'body', reportProgress: boolean = false): Observable<any> {
    if (id === null || id === undefined) {
      throw new Error('Required parameter id was null or undefined when calling apiAddNote.');
    }
    let headers = this.defaultHeaders;
    headers = headers.set('mba', this.token);
    return this.httpClient.delete<any>(`${this.basePath_v1}/building/${encodeURIComponent(String(id))}/note/${String(NoteId)}`,  { headers: headers });
  }

  public apiGetNumber(id: number, observe: any = 'body', reportProgress: boolean = false): Observable<any> {
    if (id === null || id === undefined) {
      throw new Error('Required parameter id was null or undefined when calling apiGetNumber.');
    }
    let headers = this.defaultHeaders;
    headers = headers.set('mba', this.token);
    return this.httpClient.get(`${this.basePath_v1}/building/${encodeURIComponent(String(id))}/important-number`, { headers: headers });
  }

  public apiAddNumber(body: any, id: number, observe: any = 'body', reportProgress: boolean = false): Observable<any> {
    if (id === null || id === undefined) {
      throw new Error('Required parameter id was null or undefined when calling apiAddNumber.');
    }
    let headers = this.defaultHeaders;
    headers = headers.set('mba', this.token);
    return this.httpClient.post<any>(`${this.basePath_v1}/building/${encodeURIComponent(String(id))}/important-number`,  body,{ headers: headers });
  }

  public apiDeleteNumbers(id: number,  body: any,   observe: any = 'body', reportProgress: boolean = false): Observable<any> {
    if (id === null || id === undefined) {
      throw new Error('Required parameter id was null or undefined when calling apiAddNote.');
    }
    let headers = this.defaultHeaders;
    headers = headers.set('mba', this.token);
    return this.httpClient.delete<any>(`${this.basePath_v1}/building/${encodeURIComponent(String(id))}/important-number`,   { headers: headers, body: body  });
  }

  public apiGetRequireAction(id: number, observe: any = 'body', reportProgress: boolean = false): Observable<any> {
    if (id === null || id === undefined) {
      throw new Error('Required parameter id was null or undefined when calling apiGetRequireAction.');
    }

    let headers = this.defaultHeaders;
    headers = headers.set('mba', this.token);
    return this.httpClient.get(`${this.basePath_v1}/building/${encodeURIComponent(String(id))}/report/require-action`, { headers: headers });
  }

  public apiGetSentOrder(id: number, observe: any = 'body', reportProgress: boolean = false): Observable<any> {
    if (id === null || id === undefined) {
      throw new Error('Required parameter id was null or undefined when calling apiGetSentOrder.');
    }

    let headers = this.defaultHeaders;
    headers = headers.set('mba', this.token);
    return this.httpClient.get(`${this.basePath_v1}/building/${encodeURIComponent(String(id))}/case/work-order?limit=10`, { headers: headers });
  }

}
