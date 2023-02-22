import { Component } from '@angular/core';
import { AuthService } from 'src/core/services/auth.service';
import { CommonServiceService } from 'src/core/services/common/common-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'csa-UI';

  constructor(public commonService: CommonServiceService,
    public authService: AuthService){}

  ngOnInit(): void {
    // Checking session exp time
    this.commonService.tokenExpiresInSecond.subscribe((value: number) => {
      if (value && value <= 1000) {
        this.authService.renewAuthToken();
      }
      // else if (!value && localStorage.getItem(this.authService.TOKEN_NAME)) {
      //   this.authService.renewAuthToken();
      // }
    });
    this.authService.initTimer();
  }
}
