import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';
import { CommonServiceService } from 'src/core/services/common/common-service.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
  styleUrls: ['./default-header.component.css']
})
export class DefaultHeaderComponent implements OnInit {

  isLogoutVisible: any;
  user_type: any;
  org_Id: any;
  user_id: string;
  current_route: string;
  org_type:string;

  constructor(private router: Router, private commonService: CommonServiceService, public location: Location) {
    this.commonService.currentLoginStatus.subscribe(value => {
      if (value == 0) {
        this.isLogoutVisible = localStorage.getItem('loginStatus');
      }
    });
    // keep checking route and show back button not for dashboard
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
      console.log(event.url)
      this.current_route = event.url
    });
  }

  ngOnInit(): void {
    this.user_type = localStorage.getItem("user_type")
    this.org_Id = localStorage.getItem("organisationId")
    this.org_type = localStorage.getItem("organisationType")
    this.user_id = localStorage.getItem("user_id")
    this.current_route = this.location.path()
  }

  onClickSignOut() {
    localStorage.setItem("loginStatus", '0');
    this.commonService.changeLoginStatusFunction(1);
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("user_email");
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("user_type");
    localStorage.removeItem("organisationType");
    // this.router.navigate(['/'])
    window.location.href = '/'
  }

}
