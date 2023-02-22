import { Injectable } from '@angular/core';
import { CustomDatePipe } from 'src/pipes/date/custom-date.pipe';
import { CommonServiceService } from './common/common-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  timerInterval: any;

  constructor(private commonService: CommonServiceService,
    private datePipe: CustomDatePipe) { }

  /**
   * @description regenerating token
   */
  renewAuthToken() {
    try {
      clearInterval(this.timerInterval);
      this.commonService.getAPICall({ url: "/refresh_token" }).subscribe(
        (res) => renrewAuthTokenDone(res),
      );
      const renrewAuthTokenDone = (res: any) => {
        if (res.data && res.data.accessToken != null) {
          //localStorage.setItem('isLogin', 'f');

          localStorage.setItem("token", res.data.accessToken);
          localStorage.setItem("user_id", res.data.accessToken);
          localStorage.setItem("user_email", res.data.email);
          localStorage.setItem('loggedIn', JSON.stringify(res));
          localStorage.setItem("loginStatus", "1")
          // init timer again
          this.initTimer();
        }
        else {
          localStorage.setItem('isLogin', 't');
        }
      };
    } catch (err) {
      console.error(err);
    }
  }
  initTimer() {
    try {
      // get token from localStorage
      const accessToken = localStorage.getItem("token");
      // console.log('accessToken', accessToken);
      // token consists in 3 parts and we need the middle one.
      // split the token with '.'
      if (typeof accessToken != 'undefined' && accessToken) {
        const accessTokenSplit = accessToken.split('.');
        const accessPayloadPart = accessTokenSplit[1];
        // base64 decode the payload part to get the stored info
        //console.log(JSON.parse(window.atob(accessPayloadPart)));
        const decodedPayload = JSON.parse(window.atob(accessPayloadPart));
        const tokenExpiryTimestamp = decodedPayload.exp;
        //console.log('tokenExpiryTimestamp',tokenExpiryTimestamp);
        const timeRemainingInSeconds = this.datePipe.compareTime(new Date(), new Date(tokenExpiryTimestamp * 1000));
        // TODO: time remaining must not be below refresh interval value
        //console.log('timeRemainingInSeconds',timeRemainingInSeconds);
        this.commonService.tokenExpiresInSecond.next(timeRemainingInSeconds * 1000);
        // console.log('initTimer start');
        this.timerInterval = setInterval(() => {
          this.commonService.tokenExpiresInSecond.next(this.commonService.tokenExpiresInSecond.getValue() - 1);
          // console.log('timer->', this.commonService.tokenExpiresInSecond.getValue());
        }, 1000);
      }
    } catch (e) {
      console.error('initTimer:Err->', e);
    }
  }
}
