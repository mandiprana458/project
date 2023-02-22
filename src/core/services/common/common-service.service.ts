import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HelperService } from '../helper/helper.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};
@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {
  private loggedInSubject: BehaviorSubject<any>;
  public loggedIn: Observable<any>;
  reviewReportData = []
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  private changeLoginStatus = new BehaviorSubject(0);
  currentLoginStatus = this.changeLoginStatus.asObservable();
  tokenExpiresInSecond: BehaviorSubject<any> = new BehaviorSubject(null);

  apiURL: string = environment.apiUrl
  baseURL: string = environment.baseUrl

  constructor(private router: Router,
    private http: HttpClient, private helperService: HelperService) { }

  changeLoginStatusFunction(message: number) {
    this.changeLoginStatus.next(message);
  }

  loginWithoutToken(loginInfo: any) {
    //console.log(loginInfo);
    return this.http.post<any>(`${environment.apiUrl}/signin`, loginInfo, httpOptions)
      .pipe(map(response => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        //console.log('signin response',response);
        if (response && response.data.accessToken) {
          localStorage.setItem('user_id', response.data.userId);
          localStorage.setItem('token', response.data.accessToken);
          localStorage.setItem('user_email', response.data.email);
          this._isLoggedIn$.next(true);
          localStorage.setItem('loggedIn', JSON.stringify(response.data));
          localStorage.setItem("loginStatus", "1")
        }
        return response;
      }));
  }

  loginWithToken(token: any) {
    return this.http.post<any>(`${environment.apiUrl}/signin?token=${token}`, {}, httpOptions)
      .pipe(map(response => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        //console.log('signin response',response);
        if (response && response.data.accessToken) {
          localStorage.setItem('user_id', response.data.userId);
          localStorage.setItem('token', response.data.accessToken);
          localStorage.setItem('user_email', response.data.email);
          this._isLoggedIn$.next(true);
          localStorage.setItem('loggedIn', JSON.stringify(response.data));
          localStorage.setItem("loginStatus", "1")
        }
        return response;
      }));
  }

  // Post API Call
  postAPICall(requestData: any) {
    let headers: HttpHeaders = new HttpHeaders();
    if (requestData.contentType) {
      headers = headers.append('Accept', requestData.contentType);
    } else {
      headers = headers.append('Accept', 'application/json');
    }

    if (localStorage.getItem('token')) {
      headers = headers.append('x-access-token', localStorage.getItem('token'))
    }

    return this.http.post<any>(this.apiURL + requestData.url, requestData.data, { headers })
      .pipe(
        catchError(this.helperService.handleError('error ', []))
      );
  }

  // Get API Call
  getAPICall(requestData: any) {
    let headers: HttpHeaders = new HttpHeaders();
    if (requestData.contentType) {
      headers = headers.append('Accept', requestData.contentType);
    } else {
      headers = headers.append('Accept', 'application/json');
    }
    if (localStorage.getItem('token')) {
      headers = headers.append('x-access-token', localStorage.getItem('token'))
    }
    let params = new HttpParams();
    for (const key in requestData.data) {
      if (requestData.data.hasOwnProperty(key)) {
        params = params.append(key, requestData.data[key]);
      }
    }
    return this.http.get<any>(this.apiURL + requestData.url, { headers, params })
      .pipe(
        catchError(this.helperService.handleError('error ', []))
      );
  }

  // Patch API Call
  patchAPICall(requestData: any) {
    let headers: HttpHeaders = new HttpHeaders();
    if (requestData.contentType) {
      headers = headers.append('Accept', requestData.contentType);
    } else {
      headers = headers.append('Accept', 'application/json');
    }

    if (localStorage.getItem('token')) {
      headers = headers.append('x-access-token', localStorage.getItem('token'))
    }

    return this.http.patch<any>(this.apiURL + requestData.url, requestData.data, { headers })
      .pipe(
        catchError(this.helperService.handleError('error ', []))
      );
  }

  //patch api call image
  patchHttpCallImage(senddata: any) {

    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('enctype', 'multipart/form-data');
    if (localStorage.getItem('token')) {
      headers = headers.append('x-access-token', localStorage.getItem('token'))
    }

    return this.http.patch<any>(this.apiURL + senddata.url, senddata.data, { headers })
      .pipe(
        catchError(this.helperService.handleError('error ', []))
      );
  }

  getDataToReviewSubmission(data: any) {
    this.reviewReportData = data
  }
  sendDataToReviewSubmission() {
    return this.reviewReportData
  }

  // format time given in hours and minutes
  formatTime(hours: Number, minutes: Number) {
    let stringTime = (hours < 10) ? `0${hours}` : `${hours}`
    stringTime += (minutes < 10) ? `:0${hours}` : `:${hours}`
    return stringTime
  }
}
