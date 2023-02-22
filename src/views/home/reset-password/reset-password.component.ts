import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonServiceService } from 'src/core/services/common/common-service.service';
import { HelperService } from 'src/core/services/helper/helper.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  resetForm: FormGroup

  constructor(public commonService: CommonServiceService, 
    public router: Router, public spinner: NgxSpinnerService, 
    public helperService: HelperService,
    private fb: FormBuilder) { 
      this.resetForm = this.fb.group({
        otp: new FormControl("",[Validators.required]),
        newPassword: new FormControl("",[Validators.required]),
        confirmPassword: new FormControl("",[Validators.required])
      }, { 
        validator: this.ConfirmedValidator('newPassword', 'confirmPassword')
      }) 
    }

    get f(){
      return this.resetForm.controls
    }

  ngOnInit(): void {
  }

  onSubmit(){
    let postdata = {}
    if(this.resetForm.valid){
      postdata = {
        email: localStorage.getItem("reset-email"),
        verificationCode: this.resetForm.value.otp,
        newPassword: this.resetForm.value.newPassword,
        confirmPassword: this.resetForm.value.confirmPassword
      }
      this.spinner.show();
      this.commonService.postAPICall({url: "/verify_reset_password", data: postdata}).subscribe(res => {
        this.spinner.hide()
      if (res.status == '200'){
        this.helperService.showSuccess(res.message);
        localStorage.removeItem("reset-email");
      }
    },(err)=>{
      this.spinner.hide();
      this.helperService.showError(err.error.message)
    })
    }
  }

  ConfirmedValidator(controlName: string, matchingControlName: string){
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];
        if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
            return;
        }
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ confirmedValidator: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
  }
}
