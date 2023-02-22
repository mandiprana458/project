import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonServiceService } from 'src/core/services/common/common-service.service';
import { HelperService } from 'src/core/services/helper/helper.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  user_id: any;
  userDetailsArr: any;
  logged_in_user: string;
  logged_in_user_type: string;

  constructor(private route: ActivatedRoute, public commonService: CommonServiceService,
    public spinner: NgxSpinnerService,
    public helperService: HelperService,
    public _location: Location) {
    this.user_id = atob(this.route.snapshot.paramMap.get('id'))
  }

  ngOnInit(): void {
    this.logged_in_user_type = localStorage.getItem("user_type")
    this.logged_in_user = localStorage.getItem("user_id")
    this.getUserDetails()
  }

  getUserDetails() {
    this.spinner.show()
    this.commonService.getAPICall({ url: `/users/${this.user_id}` }).subscribe(
      (res) => {
        this.spinner.hide()
        this.userDetailsArr = res.data[0]
      },
      (err) => {
        this.spinner.hide()
        this.helperService.showError(err.message)
      }
    )
  }

  goBack() {
    this._location.back()
  }
}
