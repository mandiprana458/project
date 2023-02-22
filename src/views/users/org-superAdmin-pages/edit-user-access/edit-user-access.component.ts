import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonServiceService } from 'src/core/services/common/common-service.service';
import { HelperService } from 'src/core/services/helper/helper.service';
import { Location } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-user-access',
  templateUrl: './edit-user-access.component.html',
  styleUrls: ['./edit-user-access.component.css']
})
export class EditUserAccessComponent implements OnInit {
  user_id: any;
  userDetailsArr: any;
  roleForm: FormGroup;
  selectedRole: any;
  org_type: any;

  constructor(private route: ActivatedRoute, public commonService: CommonServiceService, public fb: FormBuilder, public router: Router,
    public spinner: NgxSpinnerService,
    public helperService: HelperService,
    public _location: Location) {
    this.user_id = atob(this.route.snapshot.paramMap.get('user_id'))
    this.org_type = localStorage.getItem("organisationType")
    this.roleForm = this.fb.group({
      role: new FormControl("", [Validators.required])
    })
  }

  ngOnInit(): void {
    document.getElementById("terminate-popup").style.display = 'none';
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

  setRole(role: any) {
    this.roleForm.patchValue({
      role: role
    })
  }

  onSubmit() {
    this.selectedRole = this.roleForm.value.role
    document.getElementById("terminate-popup").style.display = 'flex';
  }

  close() {
    document.getElementById("terminate-popup").style.display = 'none';
    this.roleForm.patchValue({
      role: ''
    })
  }

  clickConfirm() {
    if (this.roleForm.valid) {
      this.spinner.show()
      this.commonService.patchAPICall({ url: '/users/' + this.user_id, data: this.roleForm.value }).subscribe(
        (res) => {
          this.spinner.hide()
          this.helperService.showSuccess(res.message)
          this.close()
          this.getUserDetails()
        }, (err) => {
          this.spinner.hide()
          this.helperService.showError(err.error.message)
        }
      )
    } else {
      this.helperService.showError("Please select a valid role")
      this.close()
    }

  }


  goBack() {
    this._location.back()
  }

}
