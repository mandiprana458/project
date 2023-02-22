import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Location } from '@angular/common';
import { CommonServiceService } from 'src/core/services/common/common-service.service';
import { HelperService } from 'src/core/services/helper/helper.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  signinForm: FormGroup;
  submitted = false;
  token: any;
  user_type: any;
  org_type: any;
  current_route: string;

  constructor(
    public fb: FormBuilder,
    public service: CommonServiceService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public helperService: HelperService,
    public spinner: NgxSpinnerService,
    public location: Location
  ) {
    this.signinForm = new FormGroup({
      loginemail: new FormControl('', [
        Validators.required,
        Validators.pattern('^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$'),
      ]),
      loginpassword: new FormControl('', [Validators.required]),
    });
  }

  get f() {
    return this.signinForm.controls;
  }

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.paramMap.get('token')) {
      this.token = this.activatedRoute.snapshot.paramMap.get('token');
      this.service.loginWithToken(this.token).subscribe(
        (res) => {
          if (res.data.passwordReset == false) {
            this.router.navigate(['/reset-token-password'])
          }
          else if (res.data.passwordReset == true) {
            this.router.navigate(['/signin'])
          }
        }
      )
    }
    this.current_route = this.location.path()
  }

  onSubmit() {
    this.submitted = true;
    if (this.signinForm.valid) {
      try {
        const loginData = {
          email: this.signinForm.get('loginemail')?.value,
          password: this.signinForm.get('loginpassword')?.value,
          referrer: window.location.origin
        };
        this.spinner.show()
        this.service.loginWithoutToken(JSON.stringify(loginData)).subscribe(
          (res) => {
            this.spinner.hide()
            if (res.data.role == "APPLICATION SUPER ADMIN") {
              localStorage.setItem("user_type", "1")
            } else if (res.data.role == "ORGANISATION SUPER ADMIN") {
              localStorage.setItem("user_type", "2")
              localStorage.setItem("organisationId", res.data.organisationId)
              localStorage.setItem("organisationType", res.data.organisationType)
            } else if (res.data.role == "USER") {
              localStorage.setItem("user_type", "3")
              localStorage.setItem("organisationType", res.data.organisationType)
            } else if (res.data.role == "ADMIN") {
              localStorage.setItem("user_type", "4")
              localStorage.setItem("organisationType", res.data.organisationType)
            }
            this.helperService.showSuccess(res.message);
            this.handelNavigation();
          },
          (err) => {
            this.spinner.hide()
            this.helperService.showError(err.error.message);
            // this.router.navigate(['/signin'])
          }
        );

      } catch (err) {
        console.log(err);
      }
    } else {
    }
  }
  handelNavigation() {
    // this.router.navigate(['/users/dashboard']);
    this.user_type = localStorage.getItem("user_type")
    this.org_type = localStorage.getItem("organisationType")
    if (this.user_type != "3") {
      window.location.href = this.service.baseURL + 'users/dashboard'
    } else {
      if (this.org_type == 'K12') {
        window.location.href = this.service.baseURL + 'users/submit-new-report-k12'
      } else {
        window.location.href = this.service.baseURL + 'users/submit-new-report'
      }

    }
  }
}
